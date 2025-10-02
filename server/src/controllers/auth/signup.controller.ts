import { Request, Response } from "express";
import { UserModel } from "../../models";
import {
  encryptHash,
  generateNewToken,
  sendUserVerificationLink,
} from "../../utils";
type UserBody = { email: string; password: string; phoneNumber: string };
export const signupController = async (req: Request, res: Response) => {
  const { email, password, phoneNumber } = req.body as UserBody;
  if (!email || !password) {
    res.status(400).send({ message: "Email or password is missing." });
    return;
  }
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    res.status(400).send({ message: "User exists." });
  }
  const hashedPassword = encryptHash(password);
  const { _id } = await UserModel.create({
    phoneNumber,
    email,
    password: hashedPassword,
  });
  const token = generateNewToken({ userId: _id });
  sendUserVerificationLink(
    `${req.protocol}://food-delivery.vercel.app/auth/verify-user?token=${token}`,
    email
  );
  res.status(201).send({ message: "Success" });
};
