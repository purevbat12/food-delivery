import { useState, useEffect } from "react";
export default function AllDishes() {
  const [countOfAllItems, setCountOfAllItems] = useState(0);
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
          let totalItems = 0;
          for (let i = 0; i < data.length; i++) {
            totalItems += data[i].length;
          }
          setCountOfAllItems(totalItems);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getAllItems();
  }, []);
  return (
    <div className="rounded-[9999px] border border-[#EF4444] py-[8px] px-[16px] cursor-pointer w-[145px]">
      <p className="text-[14px] font-[500]">
        All Dishes{"  "}
        <span className="bg-[#18181B] text-[#FAFAFA] py-[2px] px-[10px] rounded-[9999px]">
          {countOfAllItems}
        </span>
      </p>
    </div>
  );
}
