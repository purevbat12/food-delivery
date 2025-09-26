"use client"
import { userType, orderType } from "../../types";
import { useState, Dispatch, SetStateAction } from "react";
import Foods from "./Foods";
import Statuses from "./Statuses";
import { produce } from "immer";
type propsType = {
  order: orderType;
  orderNumber: number;
  user: userType;
  checkedOrdersState: {value: string[], setter: Dispatch<SetStateAction<string[]>>};
  rerenderState: {value: number, setter: Dispatch<SetStateAction<number>>};
}
export default function Order({order, orderNumber, user, checkedOrdersState, rerenderState}: propsType){
  const padding = {paddingRight: "16px", paddingTop: "16px", paddingBottom: "16px"};
  const [pressedFood, setPressedFood] = useState(false); 
  const [pressedStatus, setPressedStatus] = useState(false);
  function isChecked(){
    for(let i = 0; i < checkedOrdersState.value.length; i++){
      if(order._id == checkedOrdersState.value[i]){
        return true;
      }
    }
    return false;
  }
  return (
      <div className="flex bg-[#F4F4F5CC] border border-[#E4E4E7] h-[54px] flex items-center">
        <div className="w-[48px] ml-[16px]">
          <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if(event.target.checked){
              checkedOrdersState.setter(prev => produce(prev, draft => {
                draft.push(order._id);
              }));
            }
            else{
              checkedOrdersState.setter(prev => produce(prev, draft => {
                draft.splice(checkedOrdersState.value.indexOf(order._id), 1);
              }));
            }
          }} checked={isChecked()} type="checkbox" className="w-[16px] h-[16px] rounded-[4px] cursor-pointer" style={padding}></input>
        </div>
        <div className="text-[#71717A] text-[14px] font-[500] flex">
          <div className="w-[56px] h-[100%] overflow-x-auto overflow-y-hidden" style={{scrollbarWidth: "thin", scrollbarColor: "#888 #F1F1F1"}}>
            <span style={padding}>{orderNumber}</span>
          </div>
          <div className="w-[213.5px] h-[100%] overflow-x-auto overflow-y-hidden" style={{scrollbarWidth: "thin", scrollbarColor: "#888 #F1F1F1"}}>
            <span style={padding}>{user?.email}</span>
          </div>
          <div className="relative">
            <div className="w-[160px] h-[100%] overflow-x-auto overflow-y-hidden" style={{scrollbarWidth: "thin", scrollbarColor: "#888 #F1F1F1"}}>
              <span style={padding}>{order.foodOrderItems.length}{order.foodOrderItems.length == 1 ? " food" : " foods"}</span>
              <button className="cursor-pointer" onClick={() => {
                setPressedFood(!pressedFood);
              }}>
                <img src="/images/icons/chevron-down.png" className="w-[16px] h-[16px]"></img>
              </button>
            </div>
            <Foods pressedFoodState={{value: pressedFood, setter: setPressedFood}} foodsIds={order.foodOrderItems}/> 
          </div>
          <div className="w-[160px] h-[100%] overflow-x-auto overflow-y-hidden" style={{scrollbarWidth: "thin", scrollbarColor: "#888 #F1F1F1"}}>
            <span style={padding}>Date</span>
          </div>
          <div className="w-[160px] h-[100%] overflow-x-auto overflow-y-hidden" style={{scrollbarWidth: "thin", scrollbarColor: "#888 #F1F1F1"}}>
            <span style={padding}>{order.totalPrice}</span>
          </div>
          <div className="w-[213.5px] h-[100%] overflow-x-auto overflow-y-hidden" style={{scrollbarWidth: "thin", scrollbarColor: "#888 #F1F1F1"}}>
            <span style={padding}>Delivery Address</span>
          </div>
          <div className="relative">
            <div className="w-[160px] h-[100%] overflow-x-auto overflow-y-hidden relative" style={{scrollbarWidth: "thin", scrollbarColor: "#888 #F1F1F1"}}>
              <span className="border rounded-[9999px] py-[5px] px-[10px]" style={{...padding, borderColor: order.status == "Pending" ? "#EF4444" : order.status == "Delivered" ? "#18BA5180" : "#E4E4E7"}}>{order.status}</span>
              <button className="cursor-pointer" onClick={() => {
                setPressedStatus(!pressedStatus);
              }}>
                <img src="/images/icons/chevron-down.png" className="w-[16px] h-[16px]"></img>
              </button>
            </div>
            <Statuses rerenderState={rerenderState} order={order} pressedStatusState={{value: pressedStatus, setter: setPressedStatus}}/>
          </div>
        </div>
      </div>
  );
}
