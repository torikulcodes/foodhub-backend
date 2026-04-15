import catchAsync from "../../helper/catchAsync";
import AppError from "../../middleware/error/app.error";
import { productService } from "./product.service";
import { sendResponse } from "../../helper/sendResponse";
import { StatusCodes } from "http-status-codes";
const createProduct = catchAsync(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new AppError("Unauthorized", 401);
    const { name, categoryId, price, image, description, isActive, discount, stock, diets, } = req.body;
    if (!name || !categoryId || price === undefined || price === null || !image) {
        throw new AppError("name, categoryId, price and image are required", 400);
    }
    if (typeof price !== "number" || Number.isNaN(price)) {
        throw new AppError("price must be a number", 400);
    }
    if (discount !== undefined &&
        discount !== null &&
        typeof discount !== "number") {
        throw new AppError("discount must be a number", 400);
    }
    if (stock !== undefined && stock !== null && typeof stock !== "number") {
        throw new AppError("stock must be a number", 400);
    }
    if (isActive !== undefined &&
        isActive !== null &&
        typeof isActive !== "boolean") {
        throw new AppError("isActive must be a boolean", 400);
    }
    const data = {
        name,
        categoryId,
        price,
        image,
        description: description ?? null,
        discount: discount ?? null,
        isActive: isActive ?? true,
        stock: stock ?? undefined,
        diets: Array.isArray(diets) ? diets : undefined,
    };
    const result = await productService.createProduct(data, user);
    res.status(201).json({
        status: "success",
        data: result,
    });
});
const getAllProducts = catchAsync(async (req, res) => {
    const query = req.query;
    const products = await productService.getAllProducts(query);
    sendResponse(res, {
        httpStatusCode: StatusCodes.OK,
        data: products.data,
        meta: products.meta,
        success: true,
        message: "Product fetched successfully",
    });
});
const getOwnProduct = catchAsync(async (req, res) => {
    const user = req.user;
    const query = req.query;
    console.log("query", query);
    console.log("user", user);
    if (!user)
        throw new AppError("Unauthorized", 401);
    const products = await productService.getOwnProduct(user, query);
    sendResponse(res, {
        httpStatusCode: StatusCodes.OK,
        data: products,
        success: true,
        message: "Product fetched successfully",
    });
});
const getProductById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const product = await productService.getProductById(id);
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
//# sourceMappingURL=product.controller.js.map