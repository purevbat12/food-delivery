"use client";
import { useState, useEffect } from "react";
import Categories from "./categoryComponents/Categories";
import CategoryNav from "./categoryComponents/CategoryNav";
type category = {
  categoryName?: string;
  id?: string;
};
export default function Orders() {
  const [categories, setCategories] = useState<category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getCategories() {
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
          console.log(data);
          setCategories(data.allCategories);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
    getCategories();
  }, []);
  if (loading) {
    return (
      <div>
        <h1 className="font-[700] text-[26px]">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="bg-[#F4F4F5] w-[100vh] h-[100vh] pl-[24px] pt-[84px]">
        <CategoryNav categories={categories} />
        <Categories />
      </div>
    );
  }
}
