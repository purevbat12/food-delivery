"use client"
import { useEmailVerify } from "../emailVerify";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function page(){
    const { setEmailToken, emailToken } = useEmailVerify();
    const [check, setCheck] = useState(false);
    const searchParams = useSearchParams();
    useEffect(() => {
        console.log("emailToken = " + searchParams.get("emailToken"));
        setEmailToken(searchParams.get("emailToken"));
        setCheck(true);
    }, []);
    useEffect(() => {
        console.log(check);
        if(check){
            if(emailToken){
                console.log("Exists");
            }
            else{
                setEmailToken(searchParams.get("emailToken"));
                console.log("Does not Exist");
            }
            console.log(emailToken);
            console.log(localStorage.getItem("emailToken"));
        }
    }, [emailToken, check]);
    return (
        <p>Verified</p>
    );
}