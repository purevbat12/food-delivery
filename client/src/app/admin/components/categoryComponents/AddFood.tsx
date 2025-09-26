"use client";
import { Button } from "@/components/ui/button";
import { categoryType } from "../../types";
import { produce } from "immer";
import InputComp from "../InputComp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
type propsType = {
  title: string;
  rerenderState: {
    value: number;
    setter: Dispatch<SetStateAction<number>>;
  };
  categories: categoryType[];
};
export default function AddFood({
  title,
  rerenderState,
  categories,
}: propsType) {
  const [addFoodModalOpen, setAddFoodModalOpen] = useState(false);
  const [preview, setPreview] = useState<null | string>("");
  const [allInputs, setAllInputs] = useState<
    Record<string, { value: unknown; error: string; type: string }>
  >({
    "Food Name": { value: "", error: "", type: "text" },
    "Food Price": { value: "", error: "", type: "number" },
    "Food Ingredients": { value: "", error: "", type: "text" },
    "Food Image": { value: "", error: "", type: "image" },
  });
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
    }
  }, []);
  function inputValidation() {
    let tempCount = 0;
    for (let i = 0; i < Object.keys(allInputs).length; i++) {
      if (
        allInputs[Object.keys(allInputs)[i] as keyof typeof allInputs].value ==
        ""
      ) {
        setAllInputs((prev) =>
          produce(prev, (draft) => {
            draft[
              Object.keys(allInputs)[i] as keyof typeof allInputs
            ].error = `Empty input!`;
          })
        );
        tempCount++;
      }
    }
    if (tempCount != 0) {
      return false;
    }
    for (let i = 0; i < (allInputs["Food Price"].value as string).length; i++) {
      if (Number.isNaN((allInputs["Food Price"].value as string)[i])) {
        allInputs["Food Price"].error = "The price should not have characters!";
        return false;
      }
    }
    return true;
  }
  async function addFood(
    foodName: string,
    foodPrice: number,
    foodIngredients: string,
    foodImage: string
  ) {
    if (inputValidation()) {
      setAddFoodModalOpen(false);
      let _id = "";
      for (let i = 0; i < categories.length; i++) {
        if (title == categories[i].categoryName) {
          _id = categories[i]._id;
          break;
        } 
      }
      await fetch(`http://localhost:8000/food/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodName: foodName,
          price: foodPrice,
          ingredients: foodIngredients,
          image: foodImage,
          category: _id,
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
        });
    }
  }
  useEffect(() => {
    if (!addFoodModalOpen) {
      setPreview(null);
      for (let i = 0; i < Object.keys(allInputs).length; i++) {
        if (allInputs[Object.keys(allInputs)[i]].value != "") {
          setAllInputs((prev) =>
            produce(prev, (draft) => {
              draft[Object.keys(allInputs)[i]].value = "";
            })
          );
        } else if (allInputs[Object.keys(allInputs)[i]] != null) {
          setAllInputs((prev) =>
            produce(prev, (draft) => {
              draft[Object.keys(allInputs)[i]].value = null;
            })
          );
        }
        if (allInputs[Object.keys(allInputs)[i]].error != "") {
          setAllInputs((prev) =>
            produce(prev, (draft) => {
              draft[Object.keys(allInputs)[i]].error = "";
            })
          );
        }
      }
    }
  }, [addFoodModalOpen]);
  return (
    <Dialog open={addFoodModalOpen} onOpenChange={setAddFoodModalOpen}>
      <DialogTrigger asChild>
        <div
          className="w-[270px] h-[241px] border border-[#EF4444] rounded-[20px] flex justify-center items-center cursor-pointer"
          style={{ borderStyle: "dashed", strokeDasharray: "12px 12px" }}
        >
          <div className="flex flex-col gap-[24px] items-center">
            <div className="w-[40px] h-[40px] rounded-[100%] bg-[#EF4444] flex justify-center items-center">
              <p className="text-[#FFFFFF] text-[20px] font-[600] text-center">
                +
              </p>
            </div>
            <small className="text-[14px] font-[600]">
              Add new Dish to {title}
            </small>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Dish to {title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-[24px]">
          {Object.keys(allInputs).map((input, inputIndex) => {
            return (
              <InputComp
                key={inputIndex}
                type={allInputs[input].type}
                label={input}
                setAllInputs={setAllInputs}
                input={allInputs[input]}
                previewState={
                  allInputs[input].type == "image"
                    ? { value: preview, setter: setPreview }
                    : undefined
                }
              />
            );
          })}
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            onClick={() => {
              addFood(
                allInputs["Food Name"].value as string,
                Number(allInputs["Food Price"].value),
                allInputs["Food Ingredients"].value as string,
                preview as string
              );
            }}
            className="cursor-pointer"
          >
            Add Dish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
