import { Router } from "express";
import { cartController } from "./cart.controller.js";
import auth, { UserRole } from "../../middleware/auth.js";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER),
  cartController.addToCart,
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER),
  cartController.getCartItems,
);

router.delete(
  "/:cartItemId",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER),
  cartController.deleteCartItem,
);

export const cartRouter: Router = router;
