"use client"
import { useAuth } from "../../authProvider";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function Container(){
    const { setToken, token } = useAuth();
    const searchParams = useSearchParams();
    useEffect(() => {
        console.log("token = " + searchParams.get("token"));
        setToken(searchParams.get("token"));
    }, [token]);
    useEffect(() => {
        console.log(token);
    }, [token]);
    return (
        <div>
            <p>Verified</p>
        </div>
    );
}