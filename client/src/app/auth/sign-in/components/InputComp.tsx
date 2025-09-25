import { Input } from "@/components/ui/input";
import { produce, current } from "immer";
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
                                <Input style={{borderColor: allInputsState.value[page][input].error != "" ? "#EF4444" : "#E4E4E7", backgroundColor: "#F1F3F2"}} onChange={(event) => {
                                    if(input == "phone number"){
                                        let lastCharacter = event.target.value.slice(event.target.value.length - 1);
                                        if(event.target.value.length <= 8 && !isNaN(Number(lastCharacter))){
                                            allInputsState.setter(prev => produce(prev, draft => {
                                                draft[page][input].value = event.target.value;
                                            }));
                                        }
                                    }
                                    else{
                                        allInputsState.setter(prev => produce(prev, draft => {
                                            draft[page][input].value = event.target.value;
                                        }));
                                    }
                                }} value={allInputsState.value[page][input].value as string} type={allInputsState.value[page][input].type} placeholder={`Type ${input} here...`}/>
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