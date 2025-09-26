import { Input } from "@/components/ui/input";
import { produce } from "immer";
import { Dispatch, SetStateAction } from "react";
type allInputsType = Record<string, {value: unknown, error: string, type: string}>[];
type propsType = {
    page: number;
    allInputsState: {value: allInputsType, setter: Dispatch<SetStateAction<allInputsType>>};
}
export default function InputComp({page, allInputsState}: propsType){
    return (
        <div className="flex flex-col gap-[16px]">
            {
                Object.keys(allInputsState.value[page]).map((input, inputIndex) => {
                    return (
                        <div key={inputIndex}>
                            <div className="flex">
                                <Input style={{borderColor: allInputsState.value[page][input].error != "" ? "#EF4444" : "#E4E4E7", backgroundColor: "#F1F3F2"}} onClick={async () => {
                                    if(allInputsState.value[page][input].type == "button"){
                                        if(input == "emailVerification"){
                                            fetch(`http://localhost:8000/auth/reset-password-request`, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    email: allInputsState.value[0]["email"].value
                                                })
                                            }).then(response => {
                                                if(!response.ok){
                                                    throw new Error("HTTP error! Status: " + response.status);
                                                }
                                            }).catch(err => {
                                                console.error(err);
                                            });
                                        }
                                    }
                                }} onChange={(event) => {
                                    allInputsState.setter(prev => produce(prev, draft => {
                                        draft[page][input].value = event.target.value;
                                    }));
                                }} value={input == "emailVerification" ? "Resend email" : allInputsState.value[page][input].value as string} type={allInputsState.value[page][input].type} placeholder={`Type ${input} here...`}/>
                                <button onClick={() => {
                                    allInputsState.setter(prev => produce(prev, draft => {
                                        if(draft[page][input].type == "password"){
                                            draft[page][input].type = "text";
                                        }
                                        else{
                                            draft[page][input].type = "password";
                                        }
                                    }));
                                }} style={{display: input == "password" || input == "confirmPassword" ? "block" : "none"}} className="cursor-pointer translate-x-[-10px] rounded-[6px]">
                                    <img className="h-[36px] w-[47px] rounded-[6px]"  src={allInputsState.value[page][input].type == "password" ? "/images/icons/show.PNG" : "/images/icons/hide.PNG"}></img>
                                </button>
                            </div>
                            <p className="text-[#EF4444]" style={{display: allInputsState.value[page][input].error == "" ? "none" : "block"}}>{allInputsState.value[page][input].error}</p>
                        </div>
                    );
                })
            }
        </div>
    );
}