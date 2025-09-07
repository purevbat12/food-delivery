"use client";
import { foodType } from "../../types";
type propsType = {
  food: foodType;
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { produce, current } from "immer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function CategoryCard({ food }: propsType) {
  const [allInputs, setAllInputs] = useState<
    Record<string, { value: unknown; type: string; error: string }>
  >({
    foodName: { value: "", error: "", type: "text" },
    foodCategory: { value: "", error: "", type: "radio" },
    foodIngredients: { value: "", error: "", type: "text" },
    foodPrice: { value: "", error: "", type: "number" },
    foodImage: { value: null, error: "", type: "image" },
  });
  return (
    <div className="w-[270px] h-[241px] rounded-[20px] border border-[#E4E4E7] p-[16px]">
      <div className="relative w-[238px] h-[129px]">
        <img
          //src={food.image}
          src={"images/food.png"}
          className="absolute rounded-[12px] w-[238px] h-[129px]"
          alt={food.foodName + " image"}
        ></img>
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute cursor-pointer w-[44px] p-[16px] h-[44px] rounded-[100%] bg-[#FFFFFF] bottom-[20px] right-[20px]">
              <img
                src="images/icons/edit2.png"
                className="w-[16px] h-[16px]"
              ></img>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <h1>Dish Info</h1>
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-between">
              <Label
                htmlFor="foodName"
                className="text-[#71717A] text-[12px] font-[400]"
              >
                Dish name
              </Label>
              <Input id="foodName" type="text" />
            </div>
            <div className="flex justify-between">
              <Label
                htmlFor="foodCategory"
                className="text-[#71717A] text-[12px] font-[400]"
              >
                Dish category
              </Label>
              <Input id="foodCategory" type="text" />
            </div>
            <div className="flex justify-between">
              <Label
                htmlFor="foodIngredients"
                className="text-[#71717A] text-[12px] font-[400]"
              >
                Ingredients
              </Label>
              <Input id="foodIngredients" type="text" />
            </div>
            <div className="flex justify-between">
              <Label
                htmlFor="foodPrice"
                className="text-[#71717A] text-[12px] font-[400]"
              >
                Price
              </Label>
              <Input id="foodPrice" type="text" onChange={(event) => {}} />
            </div>
            <div className="flex justify-between">
              <Label className="text-[#71717A] text-[12px] font-[400]">
                Image
              </Label>
            </div>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button onClick={() => {}}>Delete</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={() => {}}>Save Changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
