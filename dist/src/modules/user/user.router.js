import { Router } from "express";
import { userController } from "./user.controller";
import auth, { UserRole } from "../../middleware/auth";
const router = Router();
router.get("/", auth(UserRole.ADMIN), userController.getAllUsers);
export const userRouter = router;
//# sourceMappingURL=user.router.js.map