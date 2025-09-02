import { ReactNode, Dispatch, SetStateAction } from "react";
type propsType = {
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  z: number;
};
export default function Modal(props: propsType) {
  return (
    <div
      className="transition-all duration-[0.5s]"
      style={{
        display: props.isOpen ? "block" : "none",
      }}
    >
      <div
        className="fixed bg-[#000000] inset-0 bg-opacity-50 absolute opacity-50"
        style={{ zIndex: props.z }}
      ></div>
      <div className="bg-[#FFFFFF] p-[24px] rounded-[12px] absolute z-3 top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] w-[460px]">
        <header className="mb-[24px] flex justify-between">
          <h1 className="font-[600] text-[18px]">{props.title}</h1>
          <button
            onClick={() => {
              props.setIsOpen(false);
            }}
            className="w-[36px] h-[36px] rounded-[100%] bg-[#F4F4F5] cursor-pointer flex justify-center items-center"
          >
            <img
              className="w-[12px] h-[12px]"
              src="/images/icons/Vector.png"
            ></img>
          </button>
        </header>
        <main className="flex flex-col gap-[24px]">{props.children}</main>
        <br></br>
        <br></br>
        <footer className="flex justify-end"></footer>
      </div>
    </div>
  );
}
