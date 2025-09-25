import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const authorization = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if(!token){ 
    res.status(401).json({ message: "No token provided" });
    return;
  }
  jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    }
    next();
  });
};
