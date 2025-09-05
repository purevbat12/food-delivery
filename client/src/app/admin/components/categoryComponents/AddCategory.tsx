"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type propsType = {
  rerenderState: { value: number; setter: Dispatch<SetStateAction<number>> };
};
export default function AddCategory({ rerenderState }: propsType) {
  const [newCategoryInput, setNewCategoryInput] = useState("");
  async function addCategory(categoryName: string) {
    await fetch(`http://localhost:8000/food-category/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: categoryName,
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
  return (
    <Dialog>
      <DialogTrigger className="text-[#FFFFFF] text-[20px] bg-[#EF4444] rounded-[9999px] w-[36px] h-[36px] cursor-pointer">
        +
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-[8px] w-[100%]">
            <Label htmlFor="newCategoryName">Category name</Label>
            <Input
              onChange={(event) => {
                setNewCategoryInput(event.target.value);
              }}
              id="newCategoryName"
              type="text"
              placeholder="Type category name..."
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              onClick={() => {
                setNewCategoryInput("");
                addCategory(newCategoryInput);
              }}
              type="button"
              variant="secondary"
              className="bg-[#000000] text-[#FFFFFF] cursor-pointer"
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
