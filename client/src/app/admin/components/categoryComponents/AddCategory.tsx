"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import InputComp from "../InputComp";
import { categoryType } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { produce } from "immer";
type propsType = {
  rerenderState: { value: number; setter: Dispatch<SetStateAction<number>> };
  categories: categoryType[];
};
export default function AddCategory({ rerenderState, categories }: propsType) {
  const [allInputs, setAllInputs] = useState<
    Record<string, { value: unknown; error: string; type: string }>
  >({
    "Category Name": { value: "", error: "", type: "text" },
  });
  const [addModalOpen, setAddModalOpen] = useState(false);
  function inputValidationAdd(): boolean {
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
    for (let i = 0; i < categories.length; i++) {
      if (allInputs["Category Name"].value == categories[i].categoryName) {
        setAllInputs((prev) =>
          produce(prev, (draft) => {
            draft[
              "Category Name"
            ].error = `Category named this way already exists!`;
          })
        );
        return false;
      }
    }
    return true;
  }
  async function addCategory(categoryName: string) {
    if (inputValidationAdd()) {
      setAddModalOpen(false);
      await fetch(`http://localhost:8000/food-category/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
  }
  useEffect(() => {
    if (!addModalOpen) {
      for (let i = 0; i < Object.keys(allInputs).length; i++) {
        setAllInputs((prev) =>
          produce(prev, (draft) => {
            draft[Object.keys(allInputs)[i] as keyof typeof allInputs].error =
              "";
            draft[Object.keys(allInputs)[i] as keyof typeof allInputs].value =
              "";
          })
        );
      }
    }
  }, [addModalOpen]);
  return (
    <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
      <DialogTrigger
        onClick={() => {
          setAddModalOpen(true);
        }}
        className="text-[#FFFFFF] text-[20px] bg-[#EF4444] rounded-[9999px] w-[36px] h-[36px] cursor-pointer"
      >
        +
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          {Object.keys(allInputs).map((input, inputIndex) => {
            return (
              <InputComp
                key={inputIndex}
                setAllInputs={setAllInputs}
                type={allInputs[input].type}
                input={allInputs[input as keyof typeof allInputs]}
                label={input}
                previewState={undefined}
              />
            );
          })}
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            onClick={() => {
              addCategory(allInputs["Category Name"].value as string);
            }}
            type="button"
            className="bg-[#000000] text-[#FFFFFF] cursor-pointer"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
