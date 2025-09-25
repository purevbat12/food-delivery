import { categoryType } from "../types";
import Foods from "./Foods";
import { Dispatch, SetStateAction } from "react";
type propsType = {
    category: categoryType;
    rerenderState: {
        value: number,
        setter: Dispatch<SetStateAction<number>>
    }
}
export default function Category({category, rerenderState}: propsType){
    return (
        <div className="flex flex-col gap-[54px]">
            <h2 className="text-[#FFFFFF] text-[30px] font-[600]">{category.categoryName}</h2>
            <Foods rerenderState={rerenderState} category={category}/>
        </div>
    );
}