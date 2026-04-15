import { Request, Response } from "express";
import catchAsync from "../../helper/catchAsync";
import AppError from "../../middleware/error/app.error";
import { cartService } from "./cart.service";
import { User } from "better-auth";
import { sendResponse } from "../../helper/sendResponse";
import { StatusCodes } from "http-status-codes";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  const data = req.body;
  const result = await cartService.addToCart(data, user as unknown as User);

  console.log(data);
  res.status(201).json({
    success: true,
    message: "Product added to cart successfully",
    data: result,
  });
});

const getCartItems = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
  const result = await cartService.getCartItems(user as unknown as User);
  res.status(200).json({
    success: true,
    message: "Cart items fetched successfully",
    data: result,
  });
});

const deleteCartItem = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  const result = await cartService.deleteCartItem(
    req.params.cartItemId as string,
    user as unknown as User,
  );

  sendResponse(res, {
    httpStatusCode: StatusCodes.OK,
    data: result,
    success: true,
    message: "Cart item deleted successfully",
  })
});

export const cartController = {
  addToCart,
  getCartItems,
  deleteCartItem,
};
