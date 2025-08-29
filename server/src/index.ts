import express from "express";
import { connectDatabase } from "./database";
import { authRouter, foodCategoryRouter, foodRouter } from "./routers";
import { configDotenv } from "dotenv";
import cors from "cors";

const app = express();
configDotenv();
connectDatabase();
const port = 8000;

app.use(express.json());
app.use(cors({ origin: "*" }));
//app.options("*", cors());
app.use("/auth", authRouter);
app.use("/food-category", foodCategoryRouter);
app.use("/food", foodRouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// food crud => +model, reliation to category
// category crud =>
// git push
//  issue uusged, pr uusgene
