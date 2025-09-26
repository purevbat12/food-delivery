"use client"
import { orderType, userType } from "../../types";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { produce } from "immer";
import Order from "./Order";
type propsType = {
  orders: orderType[]; 
  users: userType[];
  rerenderState: {value: number, setter: Dispatch<SetStateAction<number>>};
  setCountOfCheckedOrders: Dispatch<SetStateAction<number>>;
  setCheckedOrdersProp: Dispatch<SetStateAction<string[]>>;
};
export default function Orders({orders, users, rerenderState, setCountOfCheckedOrders, setCheckedOrdersProp}: propsType){
  const padding = {paddingRight: "16px", paddingBlock: "16px"};
  const [checkedOrders, setCheckedOrders] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  function getUser(order: orderType){
    for(let i = 0; i < users.length; i++){
      if(users[i]._id == order.user){
        return users[i];
      }
    }
  }
  useEffect(() => {
    setCheckedOrdersProp(checkedOrders);
  }, [checkedOrders]);
  useEffect(() => {
    setCountOfCheckedOrders(checkedOrders.length);
  }, [checkedOrders]);
  return (
    <div className="border border-[#E4E4E7]" style={{borderRadius: "0px 0px 16px 16px"}}> 
      <div className="flex bg-[#F4F4F5CC] border border-[#E4E4E7] h-[54px] flex items-center">
        <div className="w-[48px] ml-[16px]">
          <input type="checkbox" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAllChecked(!allChecked);
            if(event.target.checked){
              setCheckedOrders(prev => produce(prev, draft => {
                for(let i = 0; i < orders.length; i++){
                  draft[i] = orders[i]._id;
                }
              }));
            }
            else{              
              setCheckedOrders(prev => produce(prev, draft => {
                draft.splice(0, draft.length);
              }));
            }
          }} checked={allChecked} className="w-[16px] h-[16px] rounded-[4px] cursor-pointer" style={padding}></input>
        </div>
        <div className="text-[#71717A] text-[14px] font-[500] flex">
          <div className="w-[56px] h-[100%]">
            <span style={padding}>№</span>
          </div>
          <div className="w-[213.5px] h-[100%]">
            <span style={padding}>Customer</span>
          </div>
          <div className="w-[160px] h-[100%]">
            <span style={padding}>Food</span>
          </div>
          <div className="w-[160px] h-[100%]">
            <span style={padding}>Date</span>
          </div>
          <div className="w-[160px] h-[100%]">
            <span style={padding}>Total</span>
          </div>
          <div className="w-[213.5px] h-[100%]">
            <span style={padding}>Delivery Address</span>
          </div>
          <div className="w-[160px] h-[100%]">
            <span style={padding}>Delivery State</span>
          </div>
        </div>
      </div>
      {
        orders.map((order, orderIndex) => {
          return <Order rerenderState={rerenderState} key={orderIndex} order={order} orderNumber={orderIndex + 1} user={getUser(order) as userType} checkedOrdersState={{value: checkedOrders, setter: setCheckedOrders}}/>;
        })
      }
    </div>
  );
}
