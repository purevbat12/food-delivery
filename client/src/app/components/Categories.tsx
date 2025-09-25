import { useState, useEffect } from "react";
import { categoryType } from "../types";
import Category from "./Category";
import { Dispatch, SetStateAction } from "react";
type propsType = {
    rerenderState: {
        value: number,
        setter: Dispatch<SetStateAction<number>>
    }
}
export default function Categories({rerenderState}: propsType){
    const [categories, setCategories] = useState<categoryType[]>([]);
    useEffect(() => {
        async function getCategories(){
            await fetch(`http://localhost:8000/food-category/get-all`, {
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
                setCategories(data.allCategories);
            }).catch(err => console.error(err));
        }
        getCategories();
    }, []);
    return (
        <div className="flex flex-col gap-[54px]">
            {
                categories.map((category, categoryIndex) => {
                    return <Category key={categoryIndex} rerenderState={rerenderState} category={category}/>;
                })
            }
        </div>
    );
}