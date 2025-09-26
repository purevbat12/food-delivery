"use client"
import { Dispatch, SetStateAction } from "react";
import { orderType } from "../../types";
type propsType = {
    pressedStatusState: {
        value: boolean;
        setter: Dispatch<SetStateAction<boolean>>;
    }
    order: orderType;
    rerenderState: {value: number, setter: Dispatch<SetStateAction<number>>};
};
export default function Statuses({pressedStatusState, order, rerenderState}: propsType){
    const statuses = ["Delivered", "Pending", "Canceled"];
    async function updateStatus(status: string){
        await fetch(`http://localhost:8000/food-order/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                id: order._id,
                updates: {
                    status: status
                }
            })
        }).then(response => {
            if(!response.ok){
                throw new Error("HTTP error! Status: " + response.status);
            }
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            rerenderState.setter(rerenderState.value + 1);
            pressedStatusState.setter(false);
        });
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