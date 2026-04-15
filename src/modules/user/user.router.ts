import { Router } from "express";
import { userController } from "./user.controller.js";
import auth, { UserRole } from "../../middleware/auth.js";

const router = Router();
router.get("/",auth(UserRole.ADMIN), userController.getAllUsers);

export const userRouter:Router =  router 
