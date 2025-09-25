export type foodType = {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    category: string;
};
export type categoryType = {
    categoryName: string;
    _id: string;
};
export type userType = {
    _id: string;
    email: string;
    password: string;
    isVerified: boolean;
    orderedFoods: foodType[];
    phoneNumber: string;
    address: string;
    role: string;
};
export type orderType = {
    _id: string;
    user: string;
    totalPrice: number;
    foodOrderItems: Array<{
      food: string;
      quantity: number;
    }>;
    status: "Pending" | "Canceled" | "Delivered"; 
};
export type cartType = {
    _id: string;
    user: string;
    cartItems: {food: string, quantity: number}[];
};