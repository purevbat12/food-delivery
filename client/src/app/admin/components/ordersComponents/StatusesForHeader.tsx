"use client"
import { useState, useEffect, Dispatch, SetStateAction } from "react";
type propsType = {
    pressedStatusState: {
        value: boolean;
        setter: Dispatch<SetStateAction<boolean>>;
    }
    orders: string[];
    rerenderState: {value: number, setter: Dispatch<SetStateAction<number>>};
};
export default function StatusesForHeader({pressedStatusState, orders, rerenderState}: propsType){
    const statuses = ["Delivered", "Pending", "Canceled"];
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        }
    }, []);
    async function updateStatus(status: string){
        let count = 0;
        for(let i = 0; i < orders.length; i++){
            count++;
            await fetch(`https://food-delivery-nl5n.onrender.com/food-order/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: orders[i],
                    updates: {
                        status: status
                    }
                })
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status: " + response.status + " In updateStatus");
                }
            }).catch(err => {
                console.error(err);
            });
        }
        if(count == orders.length){
            rerenderState.setter(rerenderState.value + 1);
            pressedStatusState.setter(false);
        }
    }
    return (
        <div className="bg-[#FFFFFF] rounded-[6px] absolute flex-col z-[2]" style={{display: pressedStatusState.value ? "flex" : "none"}}>
            {
                statuses.map((status, statusIndex) => {
                    return (
                        <button key={statusIndex} onClick={() => {
                            updateStatus(status);
                        }} className="pl-[8px] pr-[53px] py-[8px] cursor-pointer">
                            <span key={statusIndex} className="rounded-[9999px] bg-[#F4F4F5] py-[2px] px-[10px] text-[#18181B] text-[12px] font-[500]">{status}</span>
                        </button>
                    );
                })
            }
        </div>
    );
} 