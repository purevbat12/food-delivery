"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import InputComp from "./InputComp";
export default function Inputs(){
    const [allInputs, setAllInputs] = useState<Record<string, {value: unknown, error: string, type: string}>[]>([{email: {value: "", error: "", type: "email"}, password: {value: "", error: "", type: "password"}}]);
    const [page, setPage] = useState(0);
    const router = useRouter();
    useEffect(() => {
        if(localStorage.getItem("token")){
            router.push("/");
        }
    }, []);
    return (
        <div className="flex flex-col gap-[24px]">
            <Header pageState={{value: page, setter: setPage}}/> 
            <InputComp page={page} allInputsState={{value: allInputs, setter: setAllInputs}}/>
            <Footer pageState={{value: page, setter: setPage}} allInputsState={{value: allInputs, setter: setAllInputs}}/>
        </div>
    );
}