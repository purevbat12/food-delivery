"use client";
import { useState, useEffect } from "react";
import SideNav from "./SideNav";
import FoodMenu from "./FoodMenu";
import { useRouter } from "next/navigation";
import { Orders } from "./Orders";
export default function Contianer() {
  const labels = ["Food Menu", "Orders"];
  const [activeTab, setActiveTab] = useState(labels[0]);
  const router = useRouter();
  if(!localStorage.getItem("token")){
    return (
      <div className="w-[100vw] h-[100vh] bg-[#000000] flex justify-center items-center">
        <div className="rounded-[6px] bg-[#FFFFFF] p-[16px] flex flex-col gap-[20px] items-center">
          <h1 className="text-[16px] font-[500]">You are not signed in.</h1>
          <div className="flex gap-[20px]">
            <button className="bg-[#000000] text-[#FFFFFF] py-[8px] px-[16px] rounded-[9999px] cursor-pointer" onClick={() => {
              router.push("/auth/sign-in");
            }}>Sign in</button>
            <button className="bg-[#000000] text-[#FFFFFF] py-[8px] px-[16px] rounded-[9999px] cursor-pointer" onClick={() => {
              router.push("/auth/sign-up");
            }}>Sign up</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex absolute w-[100%]">
      <SideNav
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        labels={labels}
      />
      {activeTab == "Food Menu" ? <FoodMenu /> : <Orders />}
    </div>
  );
}
