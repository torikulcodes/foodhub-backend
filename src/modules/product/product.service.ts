import { prisma } from "../../lib/prisma";
import { CreateProduct } from "../../type/product.type";
import { User } from "../../type/user.type";
import AppError from "../../middleware/error/app.error";
import { QueryBuilder } from "../../helper/queryBuilder";
import { Prisma, Product } from "../../../generated/prisma/client";
import { IQueryParams } from "../../type/queryBuilder";

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

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    diets: { include: { diet: { select: { name: true; id: true } } } };
    category: { select: { name: true; id: true } };
  };
}>;

const getAllProducts = async (query: IQueryParams) => {
  const queryBuilder = new QueryBuilder<
    Product,
    Prisma.ProductWhereInput,
    Prisma.ProductInclude
  >(prisma.product, query, {
    searchableFields: ["name", "category.name"],
    filterableFields: ["categoryId"],
  });

  const result = await queryBuilder
    .filter()
    .where({ isActive: true })
    .include({
      diets: { include: { diet: { select: { name: true, id: true } } } },
      category: { select: { name: true, id: true } },
    })
    .search()
    .paginate()
    .sort()
    .execute();

  // এখানে টাইপ কাস্টিং করে দিন যাতে p.category এর সাজেশন পান
  const formattedData = (result.data as ProductWithRelations[]).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    discount: p.discount,
    image: p.image,
    description: p.description,
    stock: p.stock,
    category: p.category?.name || "Uncategorized",
    categoryId: p.categoryId,
    diets: p.diets.map((d) => ({
      id: d.diet.id,
      name: d.diet.name,
    })),
  }));

  // শুধুমাত্র formattedData না পাঠিয়ে object আকারে পাঠান
  return {
    data: formattedData,
    meta: result.meta,
  };
};

const getProductById = async (id: string) => {
  const data = await prisma.product.findUnique({
    where: { id },
    include: {
      diets: {
        include: {
          diet: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
      category: {
        select: {
          name: true,
          id: true,
        },
      },
   provider:{
    select:{
      name:true,
      
    }
   }
    },
  });

  return data;
};


const getOwnProduct = async (user: User, query: IQueryParams) => {
  const queryBuilder = new QueryBuilder<
    Product,
    Prisma.ProductWhereInput,
    Prisma.ProductInclude
  >(prisma.product, query, {
    searchableFields: ["name", "category.name"],
    filterableFields: ["categoryId"],
  });

  return await queryBuilder
    .filter()
    .where({
      isActive: true,
      providerId: user.id,
    })
    .include({
      diets: {
        include: {
          diet: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
      category: {
        select: {
          name: true,
          id: true,
        },
      },
    })
    .search()
    .paginate()
    .sort()
    .execute();
};

export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  getOwnProduct,
};
