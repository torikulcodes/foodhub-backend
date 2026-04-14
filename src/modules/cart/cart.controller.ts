import { Request, Response } from "express";
import catchAsync from "../../helper/catchAsync";
import AppError from "../../middleware/error/app.error";
import { cartService } from "./cart.service";
import { User } from "better-auth";

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
