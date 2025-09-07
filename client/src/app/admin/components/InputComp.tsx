import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { produce } from "immer";
import inputValueSetter from "../utils/inputValueSetter";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
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
};
export default function InputComp({
  setAllInputs,
  type,
  input,
  label,
  previewState,
}: propsType) {
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setAllInputs((prev) =>
        produce(prev, (draft) => {
          draft[label].value = droppedFile;
        })
      );
      if (previewState) {
        previewState.setter(URL.createObjectURL(droppedFile));
      }
    }
  }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setAllInputs((prev) =>
        produce(prev, (draft) => {
          draft[label].value = selectedFile;
        })
      );
      if (previewState) {
        previewState.setter(URL.createObjectURL(selectedFile));
      }
    }
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
