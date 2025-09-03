"use client";
import { useState, useEffect } from "react";
import SideNav from "./SideNav";
import FoodMenu from "./FoodMenu";
import { Orders } from "./Orders";
export default function Contianer() {
  const labels = ["Food Menu", "Orders"];
  const [activeTab, setActiveTab] = useState(labels[0]);
  return (
    <div className="flex absolute h-[100%] w-[100%]">
      <SideNav
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        labels={labels}
      />
      {activeTab == "Food Menu" ? <FoodMenu /> : <Orders />}
    </div>
  );
}
