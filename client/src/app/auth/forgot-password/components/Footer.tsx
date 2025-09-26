"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { produce } from "immer";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
type allInputsType = Record<string, {value: unknown, error: string, type: string}>[];
type propsType = {
    pageState: {value: number, setter: Dispatch<SetStateAction<number>>};
    allInputsState: {value: allInputsType, setter: Dispatch<SetStateAction<allInputsType>>};
}
export default function Footer({pageState, allInputsState}: propsType){
    const router = useRouter();
    if(Object.keys(allInputsState.value[pageState.value]).includes("emailVerification")){
        return <></>;
    }
    async function customChecks(){
        const allChecked: Record<string, boolean> = {};
        let overall = false;
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
                        draft[pageState.value][key].error = "Local part of email cannot have a &apos;.&apos; for start or end.";
                    }));
                }
                if(!splat[1].includes(".")){
                    valid = false;
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "Email missing &apos;.&apos;";
                    }));
                }
                const splatDot = splat[1].split(".");
                if(splatDot[1] == "" || splatDot[0] == ""){
                    valid = false;
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "Email must have complete domain.";
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
                let containsUpperCase = false, containsNumber = false, containsSymbol = false;
                for(let i = 0; i < (allInputsState.value[pageState.value][key].value as string).length; i++){
                    const code = (allInputsState.value[pageState.value][key].value as string)[i].charCodeAt(0);
                    if (code >= 48 && code <= 57){
                        containsNumber = true;
                        continue;
                    }
                    if (code >= 65 && code <= 90){
                        containsUpperCase = true;
                        continue;
                    }
                    if (code >= 97 && code <= 122) continue;
                    containsSymbol = true;
                }
                if((allInputsState.value[pageState.value][key].value as string).length < 8 || !containsNumber || !containsUpperCase || !containsSymbol){
                    valid = false;
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "Password must have at least 8 characters, have at least 1 uppercase character, have at least 1 number and at least 1 symbol."
                    }));
                }
                if(valid){
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "";
                    }));
                    allChecked[Object.keys(allInputsState.value[pageState.value])[i]] = true;
                }
            }
            if(Object.keys(allInputsState.value[pageState.value])[i] == "confirmPassword"){
                let valid = true;
                if(allInputsState.value[pageState.value][key].value != allInputsState.value[2]["password"].value){
                    valid = false;
                    allInputsState.setter(prev => produce(prev, draft => {
                        draft[pageState.value][key].error = "Password does not match!";
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
        for(let i = 0; i < keys.length; i++){
            if(currentInputs[keys[i]].value == ""){
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
        const customValid = await customChecks();
        if(isEmpty() || !customValid){
            return false;
        }
        return true;
    }
    return (
        <div className="flex flex-col gap-[24px]">
            <Button className="w-[100%] cursor-pointer" onClick={async () => {
                const valid = await inputValidation();
                if(valid){
                    if(pageState.value + 1 == Object.keys(allInputsState.value).length){
                        await fetch(`http://localhost:8000/auth/reset-password`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: allInputsState.value[0]["email"].value,
                                newPassword: allInputsState.value[2]["password"].value,
                            })
                        }).then(response => {
                            if(!response.ok){
                                throw new Error("HTTP error! Status: " + response.status);
                            }
                        }).catch(err => {
                            console.error(err);
                        }).finally(() => {
                            localStorage.removeItem("emailToken");
                            router.push("/auth/sign-in");
                        });
                    }
                    else{
                        pageState.setter(pageState.value + 1);
                    }
                }
            }}>Next</Button>
            <p>Don&apos;t have an account? <Link className="mx-[12px] text-[#2563EB]" href="http://localhost:3000/auth/sign-up">Sign up</Link></p>
        </div>
    );
}