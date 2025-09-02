import { Dispatch, SetStateAction } from "react";
type propsType = {
  createFoodModalIsOpen: boolean;
  setCreateFoodModalIsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function AddFood(props: propsType) {
  return (
    <div className="border border-[1px] border-dashed border-[#EF4444] w-[270px] h-[241px] flex justify-center items-center rounded-[20px]">
      <div className="flex flex-col gap-[24px] items-center">
        <button
          onClick={() => props.setCreateFoodModalIsOpen(true)}
          className="text-[25px] text-[#FAFAFA] bg-[#EF4444] rounded-[100%] w-[36px] h-[36px] cursor-pointer"
        >
          +
        </button>
        <h2
          className="font-[500] text-[14px] w-[154px]"
          style={{ textAlign: "center" }}
        >
          Add new Dish to appetizers
        </h2>
      </div>
    </div>
  );
}
