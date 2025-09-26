"use client"
import { useEmailVerify } from "../emailVerify";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function Container(){
    const { setEmailToken, emailToken } = useEmailVerify();
    const [check, setCheck] = useState(false);
    const searchParams = useSearchParams();
    useEffect(() => {
        setEmailToken(searchParams.get("emailToken"));
        setCheck(true);
    }, []);
    useEffect(() => {
        if(check){
            if(emailToken){
                console.log("Exists");
            }
            else{
                setEmailToken(searchParams.get("emailToken"));
                console.log("Does not Exist");
            }
        }
    }, [emailToken, check]);
    return (
        <p>Verified</p>
    );
}