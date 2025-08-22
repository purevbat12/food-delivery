import jwt from "jsonwebtoken";
import { Request, Response } from "express";
export const authorization = (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
};
