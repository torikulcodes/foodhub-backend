import { Request, Response } from "express";
import catchAsync from "../../helper/catchAsync";
import AppError from "../../middleware/error/app.error";
import { CreateProduct } from "../../type/product.type";
import { User } from "../../type/user.type";
import { productService } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const user: User | undefined = req.user;
  if (!user) throw new AppError("Unauthorized", 401);

  const {
    name,
    categoryId,
    price,
    image,
    description,
    isActive,
    brandId,
    discount,
    diets,
  } = req.body;

  if (!name || !categoryId || !price || !image) {
    throw new AppError("name, categoryId, price and image are required", 400);
  }

  const data: CreateProduct = {
    name,
    categoryId,
    price,
    image,
    description: description ?? null,
    brandId: brandId ?? null,
    discount: discount ?? null,
    isActive: isActive ?? true,
    diets: Array.isArray(diets) ? (diets as string[]) : undefined,
  };

  const result = await productService.createProduct(data, user);

  res.status(201).json({
    status: "success",
    data: result,
  });
});


export const productController = {
  createProduct,

};
