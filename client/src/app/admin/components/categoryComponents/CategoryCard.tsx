"use client";
import { categoryType } from "../../types";
import { useState, Dispatch, SetStateAction } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type propsType = {
  countOfItems: number;
  selectedCategoryState: {
    value: string;
    setter: Dispatch<SetStateAction<string>>;
  };
  rerenderState: {
    value: number;
    setter: Dispatch<SetStateAction<number>>;
  };
  category: categoryType;
};
export default function CategoryCard({
  selectedCategoryState,
  countOfItems,
  category,
  rerenderState,
}: propsType) {
  const [newCategoryNameInput, setNewCategoryNameInput] = useState("");
  async function updateCategory(id: string, newCategoryName: string) {
    await fetch(`http://localhost:8000/food-category/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        updates: {
          categoryName: newCategoryName,
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
      });
  }
  async function deleteCategory(id: string) {
    await fetch(`http://localhost:8000/food-category/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
      });
  }
  return (
    <div
      className="rounded-[9999px] border py-[8px] px-[16px] transition-all duration-[0.2s] flex gap-[5px] justify-center items-center"
      style={{
        borderColor:
          selectedCategoryState.value == category.categoryName
            ? "#EF4444"
            : "#E4E4E7",
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <button className="cursor-pointer">
            <img
              src="/images/icons/edit.png"
              className="w-[16px] h-[16px]"
            ></img>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-[8px]">
            <Label htmlFor="newCategoryName">New category name</Label>
            <Input
              id="newCategoryName"
              type="text"
              onChange={(event) => {
                setNewCategoryNameInput(event.target.value);
              }}
            />
          </div>
          <DialogFooter className="sm:justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="cursor-pointer">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    The following action will delete this category and all the
                    items linked/within it. Click the x button to say no or
                    press the button down below to say yes.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center">
                  <DialogClose asChild>
                    <Button
                      className="cursor-pointer"
                      variant="destructive"
                      onClick={() => {
                        setNewCategoryNameInput("");
                        deleteCategory(category._id);
                      }}
                    >
                      Yes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setNewCategoryNameInput("");
                  updateCategory(category._id, newCategoryNameInput);
                }}
              >
                Update
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <button
        className="cursor-pointer"
        onClick={() => {
          selectedCategoryState.setter(category.categoryName);
        }}
      >
        <p className="text-[14px]">
          {category.categoryName}
          <span className="mx-[5px] bg-[#18181B] text-[#FAFAFA] py-[2px] px-[10px] rounded-[9999px]">
            {countOfItems}
          </span>
        </p>
      </button>
    </div>
  );
}
