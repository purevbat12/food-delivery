"use client"
import { useState, useEffect } from "react";
import { useEmailVerify } from "../../emailVerify";
import Header from "./Header";
import Footer from "./Footer";
import InputComp from "./InputComp";
export default function Inputs(){
    const [allInputs, setAllInputs] = useState<Record<string, {value: unknown, error: string, type: string}>[]>([{email: {value: "", error: "", type: "email"}}, {emailVerification: {value: "", error: "", type: "button"}}, {password: {value: "", error: "", type: "password"}, confirmPassword: {value: "", error: "", type: "password"}}]); 
    const { emailToken } = useEmailVerify();
    const [page, setPage] = useState(0);
    async function sendRequest(){
        await fetch(`https://food-delivery-nl5n.onrender.com/auth/reset-password-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: allInputs[0]["email"].value
            })
        }).then(response => {
            if(!response.ok){
                throw new Error("HTTP error! Status: " + response.status);
            }
        }).catch(err => {
            console.error(err);
        });
    }
    useEffect(() => {
        if(page == 1){
            sendRequest();
        } 
    }, [page]);
    useEffect(() => {
        if(emailToken && page == 1){
            setPage(page + 1);
        }
    }, [emailToken]);
    useEffect(() => {
        localStorage.removeItem("emailToken");
    }, []);
    return (
        <div className="flex flex-col gap-[24px]">
            <Header pageState={{value: page, setter: setPage}} allInputsState={{value: allInputs, setter: setAllInputs}}/>
            <InputComp page={page} allInputsState={{value: allInputs, setter: setAllInputs}}/>
            <Footer pageState={{value: page, setter: setPage}} allInputsState={{value: allInputs, setter: setAllInputs}}/>
        </div>
    );
}