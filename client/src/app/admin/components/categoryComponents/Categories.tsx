"use client";
import Category from "./Category";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { foodType } from "../../types";
type propsType = {
  selectedCategory: string;
  rerenderState: {
    value: number;
    setter: Dispatch<SetStateAction<number>>;
  };
};
export default function Categories({
  selectedCategory,
  rerenderState,
}: propsType) {
  const [allCategoriesFoods, setAllCategoriesFoods] = useState<
    Record<string, foodType[]>
  >({});
  const [foods, setFoods] = useState<foodType[]>([]);
  useEffect(() => {
    async function getAllItems() {
      await fetch(
        `http://localhost:8000/food/get-all-foods-by-all-categories-object`,
        {
          method: "GET",
          headers: {
            "Content-Type": "appilcation/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error! Status " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          for (let i = 0; i < Object.keys(data).length; i++) {
            if (Object.keys(data)[i] == selectedCategory) {
              setFoods(data[Object.keys(data)[i]]);
              break;
            }
          }
          setAllCategoriesFoods(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {});
    }
    getAllItems();
  }, [rerenderState.value]);
  return (
    <div className="flex flex-col gap-[24px]">
      {selectedCategory == "All Categories" ? (
        Object.keys(allCategoriesFoods).map(
          (categoryFoods: string, categoryFoodsIndex: number) => {
            return (
              <Category
                key={categoryFoodsIndex}
                rerenderState={rerenderState}
                title={categoryFoods}
                foods={allCategoriesFoods[categoryFoods]}
              />
            );
          }
        )
      ) : (
        <Category
          title={selectedCategory}
          foods={foods}
          rerenderState={rerenderState}
        />
      )}
    </div>
  );
}
