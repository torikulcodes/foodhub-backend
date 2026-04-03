import { prisma } from "../../lib/prisma";
import { CreateProduct } from "../../type/product.type";
import { User } from "../../type/user.type";
import AppError from "../../middleware/error/app.error";

const createProduct = async (data: CreateProduct, user: User) => {
  const { diets, ...productData } = data;

  let dietIds: string[] = [];
  if (diets && diets.length > 0) {
    if (!Array.isArray(diets))
      throw new AppError("diets must be an array of ids", 400);
    const uniqueDietIds = Array.from(new Set(diets));
    const existingDiets = await prisma.diet.findMany({
      where: { id: { in: uniqueDietIds } },
      select: { id: true },
    });
    if (existingDiets.length !== uniqueDietIds.length) {
      throw new AppError("One or more diet ids are invalid", 400);
    }
    dietIds = uniqueDietIds;
  }

  const productWithDiets = await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        ...productData,
        providerId: user.id,
      },
    });

    if (dietIds.length > 0) {
      await tx.productDiet.createMany({
        data: dietIds.map((dietId) => ({
          productId: product.id,
          dietId,
        })),
        skipDuplicates: true,
      });
    }

    const p = await tx.product.findUnique({
      where: { id: product.id },
      include: {
        category: { select: { id: true, name: true } },
        provider: { select: { id: true, name: true } },
        diets: {
          include: {
            diet: { select: { id: true, name: true } },
          },
        },
      },
    });

    return p;
  });

  return productWithDiets;
};


export const productService = {
  createProduct,
};
