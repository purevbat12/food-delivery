import { Model, Schema, model, models } from "mongoose";
type cartItemsType = {food: Schema.Types.ObjectId, quantity: number};
type foodCartSchemaType = {
    user: Schema.Types.ObjectId;
    cartItems: cartItemsType[];
}
const foodCartSchema = new Schema<foodCartSchemaType>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        cartItems: {
            type: [
                {
                    food: {
                        type: Schema.Types.ObjectId,
                        ref: "Food",
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                        min: 1,
                    }, 
                }
            ]
        },
    }
);
export const FoodCartModel: Model<foodCartSchemaType> = models["FoodCart"] || model("FoodCart", foodCartSchema);