"use client"
import { Dispatch, SetStateAction } from "react";
type inputType = {value: unknown; error: string; type: string;}
type propsType = {
    pageState: {value: number, setter: Dispatch<SetStateAction<number>>};
    allInputsState: {value: Record<string, inputType>[], setter: Dispatch<SetStateAction<Record<string, inputType>[]>>};
}
export default function Header({pageState, allInputsState}: propsType){
    return (
        <div>
            <button style={{display: pageState.value != 0 ? "block" : "none"}} onClick={() => {
                pageState.setter(pageState.value - 1);
            }} className="rounded-[6px] border border-[#E4E4E7] text-[16px] text-center px-[16px] py-[8px] cursor-pointer">
                &#60;
            </button>
            <h1 className="text-[#09090B] text-[24px] font-[600]">{pageState.value == 0 ? "Reset your password" : pageState.value == 1 ? "Please verify your Email" : "Create new password"}</h1>
            <p className="w-[343px] text-[#71717A] text-[16px] font-[400]">{pageState.value == 0 ? "Enter your email to receive a password reset link." : pageState.value == 1 ? `We just sent an email to ${allInputsState.value[0]["email"].value}. Click the link in the email to verify your account." : "Set a new password with a combination of letters and numbers for better security.` : "Set a new password with a combination of letters and numbers for better security."}</p>
        </div>
    )
}