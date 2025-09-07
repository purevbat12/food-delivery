import { produce } from "immer";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
type InputState = Record<
  string,
  {
    value: unknown;
    error: string;
    type: string;
  }
>;

export default function inputValueSetter(
  setAllInputs: Dispatch<SetStateAction<InputState>>,
  inputName: string,
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>,
  type: string
) {
  if (type == "text" || type == "select") {
    setAllInputs((prev) =>
      produce(prev, (draft) => {
        draft[inputName].value = event.target.value;
      })
    );
  } else if (type == "number") {
    if (
      !isNaN(Number(event.target.value.slice(event.target.value.length - 1)))
    ) {
      setAllInputs((prev) =>
        produce(prev, (draft) => {
          draft[inputName].value = event.target.value;
        })
      );
    }
  }
}
