import React, { type ChangeEvent } from "react";

type SizeRange = {
  min: number;
  max: number;
};

type InputFieldProps = {
  type: string;
  id: string;
  label: string;
  options?: string[] | null;
  requiredField?: boolean;
  regex?: RegExp;
  setIsValidInput?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  sizeRange?: SizeRange;
  setIsValidLength?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setCurrentValue: (value: string) => void;
  currentValue?: string;
};

function InputField({
  type,
  id,
  label,
  options = null,
  requiredField = false,
  regex,
  setIsValidInput,
  sizeRange,
  setIsValidLength,
  setCurrentValue,
  currentValue = "",
}: InputFieldProps) {
  function checkInput(event: ChangeEvent<HTMLInputElement>) {
    if (sizeRange && setIsValidLength) {
      if (
        event.target.value.length < sizeRange.min ||
        event.target.value.length > sizeRange.max
      ) {
        setIsValidLength((prevState) => ({
          ...prevState,
          [id]: false,
        }));
      } else {
        setIsValidLength((prevState) => ({
          ...prevState,
          [id]: true,
        }));
      }
    }
    const value = event.target.value;
    if (setIsValidInput) {
      if (!requiredField && value === "") {
        setIsValidInput((prevState) => ({
          ...prevState,
          [id]: true,
        }));
      } else if (regex) {
        setIsValidInput((prevState) => ({
          ...prevState,
          [id]: regex.test(value),
        }));
      }
    }
  }

  function updateCurrentValue(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setCurrentValue(event.target.value);
  }

  const labelClass = "text-left pb-[2vh]";
  switch (type.toLowerCase()) {
    case "text":
    case "password":
      return (
        <div className="flex mt-[2vh]">
          <label htmlFor={id} className="pr-[1vh] text-white min-w-[10vw]">
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={id}
            className="bg-white rounded text-center"
            required={requiredField}
            onChange={(e) => {
              checkInput(e as ChangeEvent<HTMLInputElement>);
              updateCurrentValue(e);
            }}
          ></input>
          <p>
            <span className="ml-2 text-red-600">
              {requiredField ? "*" : " "}
            </span>
          </p>
          <br></br>
        </div>
      );
    case "select":
      if (options === null || label === null) {
        return null;
      }
      return (
        <>
          <label className={labelClass}>{label}</label>
          <select
            id={id}
            className="bg-white"
            onChange={updateCurrentValue}
            value={currentValue || "default"}
          >
            <option value="default" disabled>
              Select Option
            </option>
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
          <br />
        </>
      );
    default:
      return null;
  }
}

export default InputField;
