import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth.js";
import { providerProfileController } from "./provider.controller.js";

const router = Router();

router.post(
  "/",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  providerProfileController.createProviderProfile,
);

router.get(
  "/",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  providerProfileController.getProviderProfile,
);

router.put(
  "/",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  providerProfileController.updateProviderProfile,
);

export const providerProfileRouter: Router = router;
