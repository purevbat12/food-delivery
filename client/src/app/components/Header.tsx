"use client"
import { useState, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { userType } from "../types";
type propsType = {
    user: userType;
    rerenderState: {
        value: number;
        setter: Dispatch<SetStateAction<number>>;
    };
    cardModalIsOpenState: {
        value: boolean;
        setter: Dispatch<SetStateAction<boolean>>;
    };
    deliveryLocationModalIsOpenState: {
        value: boolean;
        setter: Dispatch<SetStateAction<boolean>>;
    };
}
export default function Header({user, rerenderState, cardModalIsOpenState, deliveryLocationModalIsOpenState}: propsType){
    const [deliveryLocation, setDeliveryLocation] = useState("");
    const [isEmptyState, setIsEmptyState] = useState(false);
    function isEmpty(){
        if(deliveryLocation.length == 0){
            setIsEmptyState(true);
            return true;
        }
        return false;
    }
    async function updateAddress(){
        await fetch(`http://localhost:8000/auth/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                id: user._id,
                updates: {
                    address: deliveryLocation
                }
            })
        }).then(response => {
            if(!response.ok){
                throw new Error("HTTP error! Status: " + response.status + " In updateAddress");
            }
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            console.log("Deliver address updated!");
            setIsEmptyState(false);
            setDeliveryLocation("");
            deliveryLocationModalIsOpenState.setter(false);
        });
    }
    return (
        <div className="w-[100vw]">
            <div className="bg-[#18181B] h-[172px] w-[100vw] flex justify-between items-center">
                <img src="/images/icons/LogoContainer.png" className="w-[146px] h-[44px] ml-[88px]"></img>
                <div className="flex mr-[12px]">
                    <Dialog open={deliveryLocationModalIsOpenState.value} onOpenChange={deliveryLocationModalIsOpenState.setter}>
                        <DialogTrigger>
                            <button onClick={() => {
                                deliveryLocationModalIsOpenState.setter(true);
                            }} className="bg-[#FFFFFF] py-[8px] px-[12px] rounded-[9999px] flex gap-[5px] cursor-pointer h-[52px] flex justify-center items-center gap-[10px]">
                                <img src="/images/icons/LocationIcon.png" className="w-[20px] h-[20px]"></img>
                                {" "}<span className="text-[#EF4444] text-[12px fonr-[400]">Delivery address: {user?.address}</span>
                                <span className="bg-[#000000] text-[#FFFFFF] rounded-[9999px] py-[8px] px-[6px]">{user?.address == "" ? "Add" : "Change"} Location &gt;</span>
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Please write your delivery address!</DialogTitle>
                            </DialogHeader>
                            <Input type="text" onChange={(event) => {
                                setDeliveryLocation(event.target.value);
                            }} placeholder="Please share your complete address..."/>
                            <p className="text-[#FF0000]" style={{display: isEmptyState ? "block" : "none"}}>Field is empty!</p>
                            <DialogFooter>
                                <button className="cursor-pointer bg-[#18181B] text-[#FAFAFA] rounded-[6px] py-[8px] px-[16px]" onClick={() => {
                                    if(!isEmpty()){
                                        updateAddress();
                                        rerenderState.setter(rerenderState.value + 1);
                                    }
                                }}>Deliver Here</button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <button onClick={() => {
                        cardModalIsOpenState.setter(true);
                    }} className="bg-[#F4F4F5] rounded-[9999px] h-[36px] px-[10px] h-[36px] mx-[8px] mt-[40px] cursor-pointer">
                        <img src="/images/icons/shopping-cart.png" className="w-[16px] h-[16px]"></img>
                    </button>
                    <div className="bg-[#FFFFFF] rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                        <h2 className="text-[#09090B] text-[20px] font-[600]">{user?.email}</h2>
                        <button onClick={() => {
                            localStorage.removeItem("token");
                            rerenderState.setter(rerenderState.value + 1);
                        }} className="text-[14px] text-[#18181B] font-[400] rounded-[9999px] bg-[#F4F4F5] py-[8px] px-[12px] cursor-pointer">Sign out</button>
                    </div>
                </div>
            </div>
            <img src="/images/BG.png" className="w-[100vw]"></img>
        </div>
    );
}