import { orderType } from "../../types";
import { useState, Dispatch, SetStateAction } from "react";
import StatusesForHeader from "./StatusesForHeader";
type propsType = {
  orders: orderType[];
  countOfCheckedOrders: number;
  checkedOrders: string[];
  rerenderState: {
    value: number;
    setter: Dispatch<SetStateAction<number>>;
  }
}
export default function OrdersTableHeader({ orders, countOfCheckedOrders, rerenderState, checkedOrders }: propsType){
  const [pressedStatus, setPressedStatus] = useState(false);
  const date = new Date();
  return (
    <div className="flex justify-between p-[16px]">
      <div>
        <h1 className="font-[700] text-[20px] text-[#09090B]">Orders</h1>
        <p className="text-[12px] text-[#71717A] font-[500]">{orders.length} items</p>
      </div>
      <div className="flex gap-[12px]">
        <div className="rounded-[9999px] border border-[#E4E4E7] flex justify-center items-center py-[8px] px-[16px]">
          <img src="/images/icons/_calendar.png" className="w-[13.87px] h-[13.87px]"></img>
          <p className="text-[14px] text-[#09090B] font-[400]">{date.getDate()} {date.getMonth()} {date.getFullYear()}</p>
        </div>
        <div className="relative">
          <button onClick={() => {
            if(!(pressedStatus && countOfCheckedOrders == 0)){
              setPressedStatus(!pressedStatus);
            }
          }} className="rounded-[9999px] text-[#FAFAFA] text-[14px] font-[500] py-[8px] bg-[#18181B] px-[16px] cursor-pointer" disabled={countOfCheckedOrders == 0} style={{opacity: countOfCheckedOrders == 0 ? "0.2" : "1.0"}}>Change delivery state ({countOfCheckedOrders})</button>
          <StatusesForHeader  orders={checkedOrders} pressedStatusState={{value: pressedStatus, setter: setPressedStatus}} rerenderState={rerenderState}/>
        </div>
      </div>
    </div>
  );
}
