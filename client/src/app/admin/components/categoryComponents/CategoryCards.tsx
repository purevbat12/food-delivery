"use client";
import CategoryCard from "./CategoryCard";
import AddCategory from "./AddCategory";
import AllDishes from "./AllDishes";
import { useState, useEffect } from "react";
import { foodType, categoryType } from "../../types";
export default function CategoryCards() {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [categoryItems, setCategoryItems] = useState<foodType[]>([]);
  useEffect(() => {
    async function getAllItems() {
      await fetch(
        `http://localhost:8000/food/get-all-foods-by-all-categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
          console.log("categor");
          console.log(data);
          console.log(data[0].length);
          setCategoryItems(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getAllItems();
  }, []);
  useEffect(() => {
    async function getCategories() {
      await fetch(`http://localhost:8000/food-category/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error! status " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setCategories(data.allCategories);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getCategories();
  }, []);
  return (
    <div className="flex gap-[12px]">
      <AllDishes />
      {categories.map((category, categoryIndex) => {
        console.log(categoryItems);
        console.log(categoryItems[categoryIndex]);
        return (
          <CategoryCard
            key={categoryIndex}
            countOfItems={categoryItems[categoryIndex].length}
            category={category}
          />
        );
      })}
      <AddCategory />
    </div>
  );
}
