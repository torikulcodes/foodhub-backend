import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { productController } from "./product.controller";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.PROVIDER),
  productController.createProduct,
);

router.get("/", productController.getAllProducts);

router.get(
  "/my-products",
  auth(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CUSTOMER),
  productController.getOwnProduct,
);

router.get(
  "/:id",

  productController.getProductById,
);

export const productRouter = router;
