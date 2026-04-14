import { User } from "better-auth";
import { cartData } from "./cart.interface";
import { prisma } from "../../lib/prisma";

const addToCart = async (payload: cartData[], user: User) => {
  const validUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!validUser) {
    throw new Error("User not found");
  }

  return await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.create({
      data: {
        userId: user.id,
      },
    });

    return await tx.cartItem.createMany({
      data: payload.map((item) => ({
        cartId: cart.id,
        productId: item.productId,
        quantity: item.quantity,
      })),
    });
  });
};

const getCartItems = async (user: User) => {
  return await prisma.cartItem.findMany({
    where: {
      cart: {
        user: {
          id: user.id,
        },
      },
    },
  });
};

export const cartService = {
  addToCart,
  getCartItems,
};
