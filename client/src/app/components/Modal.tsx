import { Dispatch, ReactNode, SetStateAction } from "react";
type propsType = {
    isOpenState: {
        value: boolean;
        setter: Dispatch<SetStateAction<boolean>>;
    };
    children: ReactNode;
}
export default function Modal({isOpenState, children}: propsType){
    return (
        <div style={{display: isOpenState.value ? "flex" : "none", backgroundColor: "rgba(0, 0, 0, 0.4)"}} className="fixed inset-[0px] items-center justify-end">
            <div style={{borderRadius: "20px 0px 0px 20px"}} className="fixed bg-[#404040] p-[32px] h-[100%] z-[3] overflow-y-auto">
                <header>
                    <button onClick={() => {
                        isOpenState.setter(!isOpenState.value);
                    }} className="rounded-[9999px] border border-[#E4E4E7] px-[5px] text-[#FFFFFF] cursor-pointer">✕</button>
                </header>
                {children}
            </div>
        </div>
    );
}