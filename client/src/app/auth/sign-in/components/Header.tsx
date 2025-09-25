"use client"
import { Dispatch, SetStateAction } from "react";
type propsType = {
    pageState: {value: number, setter: Dispatch<SetStateAction<number>>};
}
export default function Header({pageState}: propsType){
    return (
        <div>
            <button style={{display: pageState.value != 0 ? "block" : "none"}} onClick={() => {
                pageState.setter(pageState.value - 1);
            }} className="rounded-[6px] border border-[#E4E4E7] text-[16px] text-center px-[16px] py-[8px] cursor-pointer">
                &#60;
            </button>
            <h1 className="text-[#09090B] text-[24px] font-[600]">Log in</h1>
            <p className="text-[#71717A] text-[16px] font-[400]">Log in to enjoy your favorite dishes.</p>
        </div>
    )
}