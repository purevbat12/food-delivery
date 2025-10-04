"use client";
import Category from "./Category";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { foodType, categoryType } from "../../types";
type propsType = {
  selectedCategory: string;
  categories: categoryType[];
  rerenderState: {
    value: number;
    setter: Dispatch<SetStateAction<number>>;
  };
};
export default function Categories({
  selectedCategory,
  rerenderState,
  categories,
}: propsType) {
  const [allCategoriesFoods, setAllCategoriesFoods] = useState<
    Record<string, foodType[]>
  >({});
  const [foods, setFoods] = useState<foodType[]>([]);
  useEffect(() => {
    async function getAllItems() {
      await fetch(
        `https://food-delivery-nl5n.onrender.com/food/get-all-foods-by-all-categories-object`,
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
  }, [rerenderState.value, selectedCategory]);
  return (
    <div className="flex flex-col gap-[24px]">
      {selectedCategory == "All Categories" ? (
        Object.keys(allCategoriesFoods).map(
          (categoryFoods: string, categoryFoodsIndex: number) => {
            return (
              <Category
                categories={categories}
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
          categories={categories}
          title={selectedCategory}
          foods={foods}
          rerenderState={rerenderState}
        />
      )}
    </div>
  );
}
