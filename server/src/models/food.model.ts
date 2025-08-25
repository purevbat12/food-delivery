import { Model, model, models, Schema, StringSchemaDefinition } from "mongoose";

type FoodType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const foodSchema = new Schema<FoodType>({
  foodName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "FoodCategory",
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export const FoodModel: Model<FoodType> =
  models["Food"] || model("Food", foodSchema);
// id, category name= name

// id category name=> updated
