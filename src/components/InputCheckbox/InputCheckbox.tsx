// React
import { ChangeEvent, KeyboardEvent, MouseEvent, ForwardedRef, HTMLProps, forwardRef } from "react";
// Style
import "./index.scss";

type InputCheckboxType = {
  id: string;
  onChangeFunction: () => void;
} & HTMLProps<HTMLInputElement>;

export default function InnerComponent(
  { id, onChangeFunction, ...props }: InputCheckboxType,
  ref: ForwardedRef<HTMLInputElement>
) {
  function inputOnChangeFunction(e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLLabelElement>) {
    e.preventDefault();
    onChangeFunction();
  }

  function inputOnKeyDownFunction(e: KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode !== 9) {
      e.preventDefault();
    }

    if (e.keyCode === 13 || e.keyCode === 32) {
      onChangeFunction();
    }
  }

  return (
    <div className="input-checkbox">
      <input
        ref={ref}
        type="checkbox"
        className="visually-hidden input-checkbox__input"
        name={id}
        id={id}
        onChange={inputOnChangeFunction}
        onKeyDown={inputOnKeyDownFunction}
        {...props}
      />
      <div
        className="input-checkbox__checkbox"
        onClick={() => onChangeFunction()}
        aria-hidden="true"
      ></div>
      <label
        htmlFor={id}
        className="input-checkbox__label"
        onClick={inputOnChangeFunction}
      >
        Zapamiętaj mój kod pocztowy do dostawy oraz informacji o dostępności i stanie magazynowym.
      </label>
    </div>
  );
}

export const InputCheckbox = forwardRef(InnerComponent);
