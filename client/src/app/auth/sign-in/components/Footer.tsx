"use client"
import { Button } from "@/components/ui/button";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Link from "next/link";
type allInputsType = Record<string, {value: unknown, error: string, type: string}>[];
type propsType = {
    pageState: {value: number, setter: Dispatch<SetStateAction<number>>};
    allInputsState: {value: allInputsType, setter: Dispatch<SetStateAction<allInputsType>>};
}
export default function Footer({pageState, allInputsState}: propsType){
    const router = useRouter();
    const [allUsers, setAllUsers] = useState<Record<string, {email: string, password: string}>[]>([]);
    useEffect(() => {
        console.log("Check");
        async function getAllUsers(){
            await fetch(`http://localhost:8000/auth/get-all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error("HTTP error! Status: " + response.status);
                }
                return response.json();
            }).then(data => {
                console.log(data);
                setAllUsers(data);
            }).catch(err => {
                console.error(err);
            });
        }
        getAllUsers();
    }, []);
    async function customChecks(){
        let allChecked: Record<string, boolean> = {};
        let overall = false;
        let user: Record<string, {email: string, password: string}> = {};
        for(let i = 0; i < Object.keys(allInputsState.value[pageState.value]).length; i++){
            allChecked[Object.keys(allInputsState.value[pageState.value])[i]] = false;
            const currentInputs = allInputsState.value[pageState.value];
            const key = Object.keys(currentInputs)[i] as keyof typeof currentInputs;
            if(Object.keys(allInputsState.value[pageState.value])[i] == "email"){
                let valid = true;
                if(!(allInputsState.value[pageState.value][key].value as string).includes("@")){ 
                    valid = false;
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "Email must have @domain";
                    }));
                } 
                const splat = (allInputsState.value[pageState.value][key].value as string).split("@");
                if(splat[0][0] == "." || splat[0][splat[0].length - 1] == "."){
                    valid = false;
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "Local part of email cannot have a '.' for start or end.";
                    }));
                }
                if(!splat[1].includes(".")){
                    valid = false;
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "Email missing '.'";
                    }));
                }
                const splatDot = splat[1].split(".");
                if(splatDot[1] == "" || splatDot[0] == ""){
                    valid = false;
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "Email must have complete domain.";
                    }));
                }
                let userExists = false;
                for(let i = 0; i < allUsers.length; i++){
                    if(allUsers[i].email == allInputsState.value[pageState.value][key].value){
                        user = allUsers[i];
                        userExists = true;
                        break;
                    }
                }
                if(!userExists){
                    valid = false;
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "User with this email does not exists!";
                    }));
                }
                if(valid){
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "";
                    }));
                    allChecked[Object.keys(allInputsState.value[pageState.value])[i]] = true;
                }
            }
            if(Object.keys(allInputsState.value[pageState.value])[i] == "password"){
                let valid = true;
                let isValid: boolean = false;
                await fetch(`http://localhost:8000/auth/verify-password`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: allInputsState.value[0]["email"].value,
                        password: allInputsState.value[0]["password"].value
                    })
                }).then(response => {
                    if(!response.ok){
                        throw new Error("HTTP error! Status: " + response.status);
                    }
                    return response.json();
                }).then(data => {
                    console.log(data);
                    isValid = data.valid;
                }).catch(err => {
                    console.error(err);
                });
                console.log("Password is valid: " + isValid);
                if(!isValid){
                    valid = false;
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "Password is incorrent!";
                    }));
                }
                if(valid){
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "";
                    }));
                    allChecked[Object.keys(allInputsState.value[pageState.value])[i]] = true;
                }
            }
        }
        let count = 0;
        for(let i = 0; i < Object.keys(allChecked).length; i++){      
            if(allChecked[Object.keys(allChecked)[i]]){
                count++;
            }
        }
        if(count == Object.keys(allChecked).length){
            overall = true;
        }
        return overall;
    }
    function isEmpty(){
        const currentInputs = allInputsState.value[pageState.value];
        const keys = Object.keys(currentInputs) as Array<keyof typeof currentInputs>;
        let count = 0;
        for (let i = 0; i < keys.length; i++) {
            if (currentInputs[keys[i]].value == "") {
                allInputsState.setter(prev => produce(prev, draft => {
                    draft[pageState.value][keys[i]].error = `Empty ${keys[i]} input field!`;
                }));
                count++;
            }
        }
        if(count > 0){
            return true;
        }
        return false;
    }
    async function inputValidation(){
        if(isEmpty() || !(await customChecks())){
            return false;
        }
        return true;
    }
    return (
        <div className="flex flex-col gap-[24px]">
            <Link className="hover:underline" href="http://localhost:3000/auth/forgot-password">Forgot password?</Link>
            <Button className="w-[100%] cursor-pointer" onClick={async () => {
                if(await inputValidation()){
                    if(pageState.value + 1 == Object.keys(allInputsState.value).length){
                        await fetch(`http://localhost:8000/auth/sign-in`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: allInputsState.value[0]["email"].value,
                                password: allInputsState.value[0]["password"].value,
                            })
                        }).then(response => {
                            if(!response.ok){
                                throw new Error("HTTP error! Status: " + response.status + " In Sign-in");
                            }
                            return response.json();
                        }).then(data => {
                            console.log("data: ");
                            console.log(data);
                            localStorage.setItem("token", data.token);
                        })
                        .catch(err => {
                            console.error(err);
                        }).finally(() => {
                            
                            router.push("/");
                        });
                    }
                    else{
                        pageState.setter(pageState.value + 1);
                    }
                }
            }}>Let's Go</Button>
            <p>Don't have an account? <Link className="mx-[12px] text-[#2563EB]" href="http://localhost:3000/auth/sign-up">Sign up</Link></p>
        </div>
    );
}