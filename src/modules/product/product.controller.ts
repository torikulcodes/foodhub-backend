import { Request, Response } from "express";
import catchAsync from "../../helper/catchAsync.js";
import AppError from "../../middleware/error/app.error.js";
import { CreateProduct } from "../../type/product.type.js";
import { productService } from "./product.service.js";
import { IQueryParams } from "../../type/queryBuilder.js";
import { sendResponse } from "../../helper/sendResponse.js";
import { StatusCodes } from "http-status-codes";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) throw new AppError("Unauthorized", 401);

  const {
    name,
    categoryId,
    price,
    image,
    description,
    isActive,
    discount,
    stock,
    diets,
  } = req.body;

  if (!name || !categoryId || price === undefined || price === null || !image) {
    throw new AppError("name, categoryId, price and image are required", 400);
  }

  if (typeof price !== "number" || Number.isNaN(price)) {
    throw new AppError("price must be a number", 400);
  }

  if (
    discount !== undefined &&
    discount !== null &&
    typeof discount !== "number"
  ) {
    throw new AppError("discount must be a number", 400);
  }

  if (stock !== undefined && stock !== null && typeof stock !== "number") {
    throw new AppError("stock must be a number", 400);
  }

  if (
    isActive !== undefined &&
    isActive !== null &&
    typeof isActive !== "boolean"
  ) {
    throw new AppError("isActive must be a boolean", 400);
  }

  const data: CreateProduct = {
    name,
    categoryId,
    price,
    image,
    description: description ?? null,
    discount: discount ?? null,
    isActive: isActive ?? true,
    stock: stock ?? undefined,
    diets: Array.isArray(diets) ? (diets as string[]) : undefined,
  };

  const result = await productService.createProduct(data, user);

  res.status(201).json({
    status: "success",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const products = await productService.getAllProducts(query as IQueryParams);
 
  sendResponse(res, {
    httpStatusCode: StatusCodes.OK,
    data: products.data,
    meta: products.meta,
    success: true,
    message: "Product fetched successfully",
  })
});

const getOwnProduct = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const query = req.query;

  console.log("query", query);
  console.log("user", user);
  if (!user) throw new AppError("Unauthorized", 401);
  const products = await productService.getOwnProduct(
    user,
    query as IQueryParams,
  );
  sendResponse(res, {
    httpStatusCode: StatusCodes.OK,
    data: products,
    success: true,
    message: "Product fetched successfully",
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await productService.getProductById(id as string);
  sendResponse(res, {
    httpStatusCode: StatusCodes.OK,
    data: product,
    success: true,
    message: "Product fetched successfully",
    // meta:pr
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getOwnProduct,
  getProductById,
};
