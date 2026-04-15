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
            price: true,
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

const deleteCartItem = async (cartItemId: string, user: User) => {
  const cartId = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!cartId) throw new Error("User does not have a cart");

  const isYourCartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cartId: cartId.id,
    },
  });

  if (!isYourCartItem) throw new Error("This cart item does not belong to you");

  return await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
};

export const cartService = {
  addToCart,
  getCartItems,
  deleteCartItem,
};
