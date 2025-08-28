"use client";
import { useState, useEffect } from "react";
import { produce, current } from "immer";
import Categories from "./categoryComponents/Categories";
import CategoryNav from "./categoryComponents/CategoryNav";
type category = {
  categoryName?: string;
  _id?: string;
};
export default function Orders() {
  const [categories, setCategories] = useState<category[]>([]);
  const [countsOfItemsWithinCategory, setCountsOfItemsWithinCategory] =
    useState<number[]>([]);
  const [countOfAllItems, setCountOfAllItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categoryChoosen, setCategoryChoosen] = useState<string>("");
  useEffect(() => {
    async function getCategories() {
      await fetch("http://localhost:8000/food/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response) {
            throw new Error("HTTP error! Status: " + response);
          }
          return response.json();
        })
        .then((data) => {
          setCountOfAllItems(data.length);
        })
        .catch((err) => {
          console.error(err);
        });
      await fetch("http://localhost:8000/food-category/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response) {
            throw new Error(`HTTP error! Status: ${response}`);
          }
          return response.json();
        })
        .then((data) => {
          setCategories(data.allCategories);
        })
        .catch((err) => console.error(err));
    }
    getCategories();
  }, []);
  useEffect(() => {
    async function getCounts() {
      for (let i = 0; i < categories.length; i++) {
        await fetch(
          `http://localhost:8000/food/get-foods-by-category?categoryId=${categories[i]._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (!response) {
              throw new Error("HTTP error! Status: " + response);
            }
            return response.json();
          })
          .then((data) => {
            setCountsOfItemsWithinCategory((prevCounts) =>
              produce(prevCounts, (draft) => {
                draft[i] = data.foodsByCategory.length;
              })
            );
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
    getCounts();
  }, [categories]);
  if (loading) {
    return (
      <div>
        <h1 className="font-[700] text-[26px]">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="bg-[#F4F4F5] w-[100vh] h-[100vh] pl-[24px] pt-[84px]">
        <CategoryNav
          categories={categories}
          countOfAllItems={countOfAllItems}
          countsOfItemsWithinCategory={countsOfItemsWithinCategory}
          setCategoryChoosen={setCategoryChoosen}
          categoryChoosen={categoryChoosen}
        />
        <Categories />
      </div>
    );
  }
}
