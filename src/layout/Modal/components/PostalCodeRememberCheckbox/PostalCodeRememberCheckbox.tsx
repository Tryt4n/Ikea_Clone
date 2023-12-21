// React
import { KeyboardEvent, MouseEvent, ForwardedRef, HTMLProps, forwardRef, FormEvent } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
// Components
import Input from "../../../../components/features/Input/Input";

function InnerComponent(
  { ...props }: HTMLProps<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { state, dispatch } = useApp();

  function changeCheckboxStatus() {
    dispatch({
      type: "togglePostalCodeCheckbox",
      payload: !state.rememberPostalCodeCheckboxStatus,
    });
  }

  function inputOnChangeFunction(e: FormEvent<HTMLInputElement> | MouseEvent<HTMLLabelElement>) {
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
    <Input
      type="checkbox"
      id="postal-code-checkbox"
      label="Zapamiętaj mój kod pocztowy do dostawy oraz informacji o dostępności i stanie magazynowym."
      labelProps={{
        onClick: inputOnChangeFunction,
      }}
      inputProps={{
        ref: ref,
        checked: state.rememberPostalCodeCheckboxStatus,
        onChange: inputOnChangeFunction,
        onKeyDown: inputOnKeyDownFunction,
        ...props,
      }}
    />
  );
}

export const PostalCodeRememberCheckbox = forwardRef(InnerComponent);
