import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { produce } from "immer";
import inputValueSetter from "../utils/inputValueSetter";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { categoryType } from "../types";
import Categories from "./categoryComponents/Categories";
type propsType = {
  setAllInputs: Dispatch<
    SetStateAction<
      Record<
        string,
        {
          value: unknown;
          error: string;
          type: string;
        }
      >
    >
  >;
  type: string;
  input: {
    value: unknown;
    error: string;
    type: string;
  };
  label: string;
  previewState:
    | {
        value: null | string;
        setter: Dispatch<SetStateAction<null | string>>;
      }
    | undefined;
  categories?: categoryType[];
};
export default function InputComp({
  setAllInputs,
  type,
  input,
  label,
  previewState,
  categories,
}: propsType) {
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (!droppedFile) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (previewState) {
        previewState?.setter(reader.result as string);
      }
      setAllInputs((prev) =>
        produce(prev, (draft) => {
          draft["Food Image"].value = reader.result;
        })
      );
    };
    reader.readAsDataURL(droppedFile);
  }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (previewState) {
        previewState?.setter(reader.result as string);
      }
      setAllInputs((prev) =>
        produce(prev, (draft) => {
          draft["Food Image"].value = reader.result;
        })
      );
    };
    reader.readAsDataURL(selectedFile);
    /*
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setAllInputs((prev) =>
        produce(prev, (draft) => {
          draft[label].value = selectedFile;
        })
      );
    }
      */
  }
  if (type == "text") {
    return (
      <div className="flex flex-col gap-[8px] w-[100%]">
        <Label htmlFor={label}>{label}</Label>
        <Input
          type="text"
          id={label}
          value={input.value as string}
          placeholder={label + "..."}
          onChange={(event) => {
            inputValueSetter(setAllInputs, label, event, type);
          }}
        />
        <p
          className="text-[#EF4444] text-[10px]"
          style={{ display: input.error == "" ? "none" : "block" }}
        >
          {input.error}
        </p>
      </div>
    );
  } else if (type == "number") {
    return (
      <div className="flex flex-col gap-[8px] w-[100%]">
        <Label htmlFor={label}>{label}</Label>
        <Input
          type="text"
          id={label}
          value={input.value as number}
          placeholder={label + "..."}
          onChange={(event) => {
            inputValueSetter(setAllInputs, label, event, type);
          }}
        />
        <p
          className="text-[#EF4444] text-[10px]"
          style={{ display: input.error == "" ? "none" : "block" }}
        >
          {input.error}
        </p>
      </div>
    );
  } else if (type == "select") {
    return (
      <div className="flex flex-col gap-[8px] w-[100%]">
        <Label htmlFor={label}>{label}</Label>
        <select
          id={label}
          className="rounded-[6px] border border-[#E4E4E7] w-[100%] px-[10px] py-[8px] cursor-pointer"
          onChange={(event) => {
            console.log(event.target.value);
            inputValueSetter(setAllInputs, label, event, type);
          }}
        >
          {categories?.map((category, categoryIndex) => {
            return (
              <option
                className="cursor-pointer"
                key={categoryIndex}
                value={category.categoryName}
              >
                {category.categoryName}
              </option>
            );
          })}
        </select>
      </div>
    );
  } else if (type == "image") {
    return (
      <div className="flex flex-col gap-[8px] w-[100%]">
        <Label htmlFor={label}>{label}</Label>
        <div
          onDrop={handleDrop}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          className="border-2 border-dashed border-blue-400 rounded-[6px] p-6 text-center h-[138px] bg-[#F4F7FE] flex justify-center items-center cursor-pointer relative"
        >
          <button
            onClick={() => {
              setAllInputs((prev) =>
                produce(prev, (draft) => {
                  draft[label].value = null;
                })
              );
              if (previewState) {
                previewState.setter(null);
              }
            }}
            type="button"
            className="bg-[#FFFFFF] rounded-[100%] w-[36px] h-[36px] absolute z-[2] bottom-[65%] left-[90%] cursor-pointer text-center"
            style={{ display: previewState?.value ? "block" : "none" }}
          >
            X
          </button>
          <input
            onChange={handleFileChange}
            id={label}
            className="hidden"
            type="file"
          ></input>
          <label htmlFor={label} className="cursor-pointer">
            {previewState?.value ? (
              <img
                src={previewState?.value}
                alt="Preview"
                className="max-h-34 shadow-md rounded-[6px] mx-auto"
              ></img>
            ) : (
              <>
                <p className="text-gray-600">
                  Choose a file or drag & drop it here
                </p>
              </>
            )}
          </label>
        </div>
        <p
          className="text-[#EF4444] text-[10px]"
          style={{ display: input.error == "" ? "none" : "block" }}
        >
          {input.error}
        </p>
      </div>
    );
  }
}
