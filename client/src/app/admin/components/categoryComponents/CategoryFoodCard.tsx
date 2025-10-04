"use client";
import { foodType, categoryType } from "../../types";
import { Dispatch, SetStateAction } from "react";
type propsType = {
  food: foodType;
  categories: categoryType[];
  rerenderState: {
    value: number;
    setter: Dispatch<SetStateAction<number>>;
  };
  currentCategory: string;
};
import { useState, useEffect } from "react";
import InputComp from "../InputComp";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function CategoryCard({
  food,
  rerenderState,
  categories,
  currentCategory,
}: propsType) {
  const [allInputs, setAllInputs] = useState<
    Record<string, { value: unknown; type: string; error: string }>
  >({
    "Food Name": { value: food.foodName, error: "", type: "text" },
    "Food Category": { value: currentCategory, error: "", type: "select" },
    "Food Ingredients": { value: food.ingredients, error: "", type: "text" },
    "Food Price": { value: food.price, error: "", type: "number" },
    "Food Image": { value: food.image, error: "", type: "image" },
  });
  const [updateFoodModalOpen, setUpdateFoodModalOpen] = useState(false);
  const [preview, setPreview] = useState<null | string>(food.image);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
    }
  }, []);
  async function updateFood(id: string) {
    let categoryId = "";
    for (let i = 0; i < categories.length; i++) {
      if (allInputs["Food Category"].value == categories[i].categoryName) {
        categoryId = categories[i]._id;
        break;
      }
    }
    await fetch(`https://food-delivery-nl5n.onrender.com/food/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
        updates: {
          foodName: allInputs["Food Name"].value,
          price: allInputs["Food Price"].value,
          image: preview,
          ingredients: allInputs["Food Ingredients"].value,
          category: categoryId,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! Status " + response.status);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        rerenderState.setter(rerenderState.value + 1);
        setUpdateFoodModalOpen(false);
      });
    rerenderState.setter(rerenderState.value + 1);
  }
  async function deleteFood(id: string) {
    await fetch(`https://food-delivery-nl5n.onrender.com/food/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! Status " + response.status);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        rerenderState.setter(rerenderState.value + 1);
        setUpdateFoodModalOpen(false);
      });
    rerenderState.setter(rerenderState.value + 1);
  }
  return (
    <div className="w-[270px] rounded-[20px] border border-[#E4E4E7] p-[16px]">
      <div className="relative w-[238px] h-[129px]">
        <img
          src={food.image}
          className="absolute rounded-[12px] left-[50%] translate-x-[-50%] h-[129px]"
          alt={food.foodName + " image"}
        ></img>
        <Dialog
          open={updateFoodModalOpen}
          onOpenChange={setUpdateFoodModalOpen}
        >
          <DialogTrigger asChild>
            <button
              onClick={() => {
                setUpdateFoodModalOpen(true);
              }}
              className="absolute cursor-pointer w-[44px] p-[16px] h-[44px] rounded-[100%] bg-[#FFFFFF] bottom-[20px] right-[20px]"
            >
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
            <div className="flex flex-col gap-[12px] justify-between">
              {Object.keys(allInputs).map((input, inputIndex) => {
                return (
                  <InputComp
                    key={inputIndex}
                    previewState={
                      allInputs[input].type == "image"
                        ? { value: preview, setter: setPreview }
                        : undefined
                    }
                    label={input}
                    setAllInputs={setAllInputs}
                    input={allInputs[input]}
                    type={allInputs[input].type}
                    categories={categories}
                  />
                );
              })}
            </div>
            <DialogFooter className="sm:justify-between">
              <Button
                className="cursor-pointer"
                onClick={() => {
                  deleteFood(food._id);
                }}
              >
                Delete
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => {
                  updateFood(food._id);
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <br></br>
      <main className="flex flex-col gap-[8px]">
        <div className="flex justify-between">
          <h2 className="text-[#EF4444] font-[600] text-[14px]">
            {food.foodName}
          </h2>
          <p className="text-[12px] font-[500] text-[#09090B]">${food.price}</p>
        </div>
        <p className="text-[12px] font-[500] text-[#09090B]">
          {food.ingredients}
        </p>
      </main>
    </div>
  );
}
