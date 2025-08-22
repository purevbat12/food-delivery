import { Router } from "express";
import { signupController, verifyUserController, signInController, resetPasswordRequestController, resetPasswordVerifyController, resetPasswordController } from "../controllers";
export const authRouter = Router();
authRouter.route("/sign-up").post(signupController);
authRouter.route("/sign-in").post(signInController);
authRouter.route("/verify-user").get(verifyUserController);
authRouter.route("/reset-password-request").post(resetPasswordRequestController);
authRouter.route("/reset-password-verify").get(resetPasswordVerifyController);
authRouter.route("/reset-password").post(resetPasswordController);
