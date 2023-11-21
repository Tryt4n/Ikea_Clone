// React
import { ChangeEvent, KeyboardEvent, MouseEvent, ForwardedRef, HTMLProps, forwardRef } from "react";
// Custom Hooks
import useApp from "../../hooks/useApp";
// Style
import "./index.scss";

export default function InnerComponent(
  { ...props }: HTMLProps<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { state, dispatch } = useApp();

  function changeCheckboxStatus() {
    dispatch({ type: "togglePostalCodeCheckbox" });
  }

  function inputOnChangeFunction(e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLLabelElement>) {
    e.preventDefault();
    changeCheckboxStatus();
  }

  function inputOnKeyDownFunction(e: KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode !== 9) {
      e.preventDefault();
    }

    if (e.keyCode === 13 || e.keyCode === 32) {
      changeCheckboxStatus();
    }
  }

  return (
    <div className="input-checkbox">
      <input
        ref={ref}
        type="checkbox"
        className="visually-hidden input-checkbox__input"
        name="postal-code-checkbox"
        id="postal-code-checkbox"
        onChange={inputOnChangeFunction}
        onKeyDown={inputOnKeyDownFunction}
        checked={state.rememberPostalCodeCheckboxStatus}
        {...props}
      />

      <div
        className="input-checkbox__checkbox"
        onClick={() => changeCheckboxStatus()}
        aria-hidden="true"
      ></div>

      <label
        htmlFor="postal-code-checkbox"
        className="input-checkbox__label"
        onClick={inputOnChangeFunction}
      >
        Zapamiętaj mój kod pocztowy do dostawy oraz informacji o dostępności i stanie magazynowym.
      </label>
    </div>
  );
}

export const PostalCodeRememberCheckbox = forwardRef(InnerComponent);
