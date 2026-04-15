import { Router } from "express";


import auth, { UserRole } from "../../middleware/auth.js";
import { categoryController } from "./category.controller.js";

const router = Router();

router.post("/", auth(UserRole.ADMIN,UserRole.PROVIDER), categoryController.createCategory);
router.get("/", auth(UserRole.ADMIN,UserRole.PROVIDER), categoryController.getAllCategories);

export const categoryRouter: Router = router;