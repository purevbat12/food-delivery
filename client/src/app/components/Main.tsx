import Categories from "./Categories";
import { Dispatch, SetStateAction } from "react";
type propsType = {
    rerenderState: {
        value: number,
        setter: Dispatch<SetStateAction<number>>
    }
}
export default function Main({rerenderState}: propsType){
    return (
        <div className="p-[88px]">
            <Categories rerenderState={rerenderState}/>
        </div>
    );
}