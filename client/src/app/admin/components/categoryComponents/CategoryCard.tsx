"use client";
import { categoryType } from "../../types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { produce } from "immer";
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
import InputComp from "../InputComp";
import { Button } from "@/components/ui/button";
type propsType = {
  categories: categoryType[];
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
  categories,
}: propsType) {
  const [allInputs, setAllInputs] = useState<
    Record<string, { value: unknown; error: string; type: string }>
  >({ "New Category Name": { value: "", error: "", type: "text" } });
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  function inputValidationUpdate(): boolean {
    let tempCount = 0;
    for (let i = 0; i < Object.keys(allInputs).length; i++) {
      if (allInputs[Object.keys(allInputs)[i]].value == "") {
        setAllInputs((prev) =>
          produce(prev, (draft) => {
            draft[Object.keys(allInputs)[i]].error = "Empty input!";
          })
        );
        tempCount++;
      }
    }
    if (tempCount != 0) {
      return false;
    }
    for (let i = 0; i < categories.length; i++) {
      if (allInputs["New Category Name"].value == categories[i].categoryName) {
        setAllInputs((prev) =>
          produce(prev, (draft) => {
            draft[
              "New Category Name"
            ].error = `Category named this way already exists!`;
          })
        );
        return false;
      }
    }
    return true;
  }
  async function updateCategory(id: string, newCategoryName: string | unknown) {
    if (inputValidationUpdate()) {
      setUpdateModalOpen(false);
      await fetch(`http://localhost:8000/food-category/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
  }

  async function deleteCategory(id: string) {
    await fetch(`http://localhost:8000/food-category/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
  useEffect(() => {
    if (!updateModalOpen) {
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
  }, [updateModalOpen]);
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
      <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => {
              setUpdateModalOpen(true);
            }}
            className="cursor-pointer"
          >
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
          {Object.keys(allInputs).map((input, inputIndex) => {
            return (
              <InputComp
                key={inputIndex}
                label={input}
                setAllInputs={setAllInputs}
                input={allInputs[input]}
                type={allInputs[input].type}
                previewState={undefined}
              />
            );
          })}
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
                        for (
                          let i = 0;
                          i < Object.keys(allInputs).length;
                          i++
                        ) {
                          setAllInputs((prev) =>
                            produce(prev, (draft) => {
                              draft[Object.keys(allInputs)[i]].value = "";
                              draft[Object.keys(allInputs)[i]].error = "";
                            })
                          );
                        }
                        deleteCategory(category._id);
                      }}
                    >
                      Yes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              className="cursor-pointer"
              onClick={() => {
                updateCategory(
                  category._id,
                  allInputs["New Category Name"].value
                );
              }}
            >
              Update
            </Button>
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
