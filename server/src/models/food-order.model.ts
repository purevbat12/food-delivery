import { Model, model, models, Schema } from "mongoose";
type FoodOrderSchemaType = {
  user: Schema.Types.ObjectId;
  totalPrice: number;
  foodOrderItems: Array<{
    food: Schema.Types.ObjectId;
    quantity: number;
  }>;
};
type FoodOrderItemSchemaType = {
  food: Schema.Types.ObjectId;
  quantity: number;
};
const foodOrderItemSchema = new Schema<FoodOrderItemSchemaType>(
  {
    food: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Food",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);
const foodOrder = new Schema<FoodOrderSchemaType>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  foodOrderItems: {
    type: [foodOrderItemSchema],
    required: true,
  },
});
export const FoodOrderModel: Model<FoodOrderSchemaType> =
  models["FoodOrder"] || model("FoodOrder", foodOrder);
