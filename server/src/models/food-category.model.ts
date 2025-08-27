import { Model, Schema, model, models } from "mongoose";
type FoodCategorySchemaType = {
  categoryName: string;
};
const foodCategorySchema = new Schema<FoodCategorySchemaType>(
  {
    categoryName: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);
export const FoodCategoryModel: Model<FoodCategorySchemaType> =
  models["FoodCategory"] || model("FoodCategory", foodCategorySchema);
