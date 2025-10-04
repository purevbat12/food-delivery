"use client";
import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import FoodMenu from "./FoodMenu";
import { useRouter } from "next/navigation";
import { Orders } from "./Orders";
import { userType } from "../types";
import jwt from "jsonwebtoken";
export default function Contianer() {
  const labels = ["Food Menu", "Orders"];
  const [activeTab, setActiveTab] = useState(labels[0]);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<userType>();
  const router = useRouter();
  useEffect(() => {
    async function getUser(id: string){
      await fetch(`https://food-delivery-nl5n.onrender.com/auth/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if(!response.ok){
          throw new Error("HTTP error! Status: " + response.status + " In getUser");
        }
        return response.json();
      }).then(data => {
        setUser(data);
      }).catch(err => {
        console.error(err);
      })
    }
    let t: string;
    if(localStorage.getItem("token")){
      t = localStorage.getItem("token") as string;
      setToken(localStorage.getItem("token") as string);
      const decoded = jwt.decode(t) as {userId: string};
      getUser(decoded.userId);
    }
  }, []);
  if(user && user?.role != "Admin"){
    console.log("Not admin");
    router.push("/");
  }
  if(!token){
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
