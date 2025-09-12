import express from "express";
import { connectDatabase } from "./database";
import {
  authRouter,
  foodCategoryRouter,
  foodRouter,
  foodOrderRouter,
} from "./routers";
import { configDotenv } from "dotenv";
import cors from "cors";

const app = express();
configDotenv();
connectDatabase();
const port = 8000;

app.use(express.json({ limit: "10mb" })); // allow up to 10 MB JSON payloads
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({ origin: "*" }));
//app.options("*", cors());
app.use("/auth", authRouter);
app.use("/food-category", foodCategoryRouter);
app.use("/food-order", foodOrderRouter);
app.use("/food", foodRouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// food crud => +model, reliation to category
// category crud =>
// git push
//  issue uusged, pr uusgene
