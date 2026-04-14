import { User } from "better-auth";
import { cartData } from "./cart.interface";
import { prisma } from "../../lib/prisma";
import AppError from "../../middleware/error/app.error";

const addToCart = async (payload: cartData[], user: any) => {
  const userId = user.id || user._id;

  if (!userId) throw new Error("User ID is missing");

  const validUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!validUser) throw new Error("User not found");

  return await prisma.$transaction(async (tx) => {
    let cart = await tx.cart.findFirst({
      where: { userId: userId },
    });

    if (!cart) {
      cart = await tx.cart.create({
        data: { userId: userId },
      });
    }

    const productIds = payload.map((item) => {
      if (!item.productId) {
        throw new AppError("Each item must have a valid productId");
      }
      return item.productId;
    });

    const existingItems = await tx.cartItem.findMany({
      where: {
        cartId: cart.id,
        productId: { in: productIds },
      },
    });

    if (existingItems.length > 0) {
      throw new AppError("One or more products already exist in your cart");
    }

    return await tx.cartItem.createMany({
      data: payload.map((item) => ({
        cartId: cart!.id,
        productId: item.productId,
        quantity: Number(item.quantity),
      })),
    });
  });
};

const getCartItems = async (user: User) => {
  const whereCondition = {
    cart: {
      user: {
        id: user.id,
      },
    },
  };

  const [items, totalCount] = await Promise.all([
    prisma.cartItem.findMany({
      where: whereCondition,
      include: {
        product: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
    }),
    prisma.cartItem.count({
      where: whereCondition,
    }),
  ]);

  return {
    items,
    totalCount,
  };
};

export const cartService = {
  addToCart,
  getCartItems,
};
