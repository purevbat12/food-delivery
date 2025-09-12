"use client"
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import InputComp from "./InputComp";
export default function Inputs(){
    const [allInputs, setAllInputs] = useState<Record<string, {value: unknown, error: string, type: string}>[]>([{email: {value: "", error: "", type: "email"}, "phone number": {value: "", error: "", type: "text"}}, {password: {value: "", error: "", type: "password"}, confirmPassword: {value: "", error: "", type: "password"}}]);
    const [page, setPage] = useState(0);
    return (
        <div className="flex flex-col gap-[24px]">
            <Header pageState={{value: page, setter: setPage}}/>
            <InputComp page={page} allInputsState={{value: allInputs, setter: setAllInputs}}/>
            <Footer pageState={{value: page, setter: setPage}} allInputsState={{value: allInputs, setter: setAllInputs}}/>
        </div>
    );
}