import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const inputNumberOnChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setValue: Dispatch<SetStateAction<number>>
) => {
  const newValue = Number(e.target.value);
  if (isNaN(newValue)) return;
  setValue(newValue);
};
