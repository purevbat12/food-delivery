import { Request, Response } from "express";
import { UserModel } from "../../models";
import { generateNewToken, sendUserVerificationLink } from "../../utils";
export const resetPasswordRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body as { email: string };
    if (!email) {
      res.status(400).send({ message: "Email is required." });
      return;
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User does not exist." });
      return;
    }
    const token = await generateNewToken({ userId: user._id, email: email });
    sendUserVerificationLink(
      `https://food-delivery-client-flame.vercel.app/auth/verify-email?emailToken=${token}`,
      email
    );
    res
      .status(200)
      .send({ message: "Password reset link sent to your email." });
    return;
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        message: "Internal server error.",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    return;
  }
};
