"use client"
import Logo from "./Logo";
import { Dispatch, SetStateAction } from "react";
type propsType = {
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
  labels: string[];
};
export default function SideNav(props: propsType) {
  return (
    <div className="w-[205px]">
      <div className="flex flex-col gap-[40px] mt-[36px] mx-[20px]">
        <Logo />
        <div className="flex flex-col gap-[10px]">
          {props.labels.map((label, labelIndex) => {
            return (
              <button
                className="text-[14px] rounded-[9999px] py-[8px] px-[16px] w-[165px] cursor-pointer flex gap-[10px]"
                key={labelIndex}
                onClick={() => {
                  props.setActiveTab(label);
                }}
                style={{
                  backgroundColor:
                    props.activeTab == props.labels[labelIndex]
                      ? "#18181B"
                      : "#FFFFFF",
                  color:
                    props.activeTab == props.labels[labelIndex]
                      ? "#FAFAFA"
                      : "#09090B",
                }}
              >
                <img
                  src={`./images/icons/${label}${
                    props.activeTab == props.labels[labelIndex] ? "L" : "D"
                  }.png`}
                  className="w-[20px] h-[20px]"
                ></img>
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
