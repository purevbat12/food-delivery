"use client"
import { useState, useEffect } from "react";
import { categoryType } from "../types";
export default function Footer(){
    const [categories, setCategories] = useState<categoryType[]>([]);
    useEffect(() => {
        async function getCategories(){
            await fetch(`https://food-delivery-nl5n.onrender.com/food-category/get-all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status: " + response.status);
                }
                return response.json();
            }).then(data => {
                setCategories(data.allCategories);
            }).catch(err => console.error(err));
        }
        getCategories();
    }, []);
    return (
        <div className="bg-[#18181B] w-[100vw] h-[755px] pt-[60px]">
            <div></div>
            <div className="mx-[88px] flex gap-[220px]">
                <img src="/images/icons/LogoContainer.png" className="h-[44px]"></img>
                <div className="flex gap-[112px]">
                    <div>
                        <p className="text-[#71717A] text-[16px] font-[400]">NOMNOM</p>
                        <br></br>
                        <ul className="flex flex-col gap-[16px] text-[16px] text-[#FAFAFA] font-[400]">
                            <li>Home</li>
                            <li>Contant us</li>
                            <li>Delivery zone</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-[#71717A] text-[16px] font-[400]">MENU</p>
                        <br></br>
                        <ul className="flex flex-col gap-[16px] text-[16px] text-[#FAFAFA] font-[400]">
                            {
                                categories.map((category, categoryIndex) => {
                                    return (
                                        <li key={categoryIndex}>{category.categoryName}</li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div>
                        <p className="text-[#71717A] text-[16px] font-[400]">FOLLOW US</p>
                        <br></br>
                        <div className="flex gap-[16px]">
                            <img src="/images/icons/Facebook.png"></img>
                            <img src="/images/icons/Instagram.png"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}