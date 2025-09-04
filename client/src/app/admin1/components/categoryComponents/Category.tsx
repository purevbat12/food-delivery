import AddFood from "./AddFood";
import { Dispatch, SetStateAction } from "react";
type propsType = {
  categoryName: string | undefined;
  countOfItemsWithinCategory: number | undefined;
  createFoodModalIsOpen: boolean;
  setCreateFoodModalIsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Category(props: propsType) {
  return (
    <div className="rounded-[12px] bg-[#FFFFFF] p-[24px]">
      <h1 className="text-[20px] font-[600] mb-[16px]">
        {props.categoryName} ({props.countOfItemsWithinCategory})
      </h1>
      <div>
        <AddFood
          createFoodModalIsOpen={props.createFoodModalIsOpen}
          setCreateFoodModalIsOpen={props.setCreateFoodModalIsOpen}
        />
      </div>
    </div>
  );
}
