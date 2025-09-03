import { useState, useEffect } from "react";
import CategoryCards from "./CategoryCards";
export default function CategoryNav() {
  return (
    <div className="bg-[#FFFFFF] w-[1171px] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
      <h1 className="text-[20px] font-[600]">Dishes category</h1>
      <div>
        <CategoryCards />
      </div>
    </div>
  );
}
