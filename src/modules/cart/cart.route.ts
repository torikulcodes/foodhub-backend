import { Router } from "express";
import { cartController } from "./cart.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER),
  cartController.addToCart,
);

router.get("/",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER),
  cartController.getCartItems,)

export const cartRouter: Router = router;
