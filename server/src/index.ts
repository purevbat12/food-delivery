import express from "express";
import { connectDatabase } from "./database";
import { authRouter, foodCategoryRouter } from "./routers";
import { configDotenv } from "dotenv";

const app = express();
configDotenv();
connectDatabase();
const port = 8000;

app.use(express.json());
app.use("/food-category", foodCategoryRouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// food crud => +model, reliation to category
// category crud =>
// git push
//  issue uusged, pr uusgene
