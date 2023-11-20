// React
import { ForwardedRef, HTMLProps, forwardRef } from "react";
// Style
import "./index.scss";

type InputCheckboxType = {
  id: string;
} & HTMLProps<HTMLInputElement>;

export default function InnerComponent(
  { id, ...props }: InputCheckboxType,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="input-checkbox">
      <input
        ref={ref}
        type="checkbox"
        // className="input-checkbox__input"
        className="visually-hidden input-checkbox__input"
        name={id}
        id={id}
        {...props}
      />
      <div
        className="input-checkbox__checkbox"
        aria-hidden="true"
      ></div>
      <label
        htmlFor={id}
        className="input-checkbox__label"
      >
        Zapamiętaj mój kod pocztowy do dostawy oraz informacji o dostępności i stanie magazynowym.
      </label>
    </div>
  );
}

export const InputCheckbox = forwardRef(InnerComponent);
