// React
import {
  KeyboardEvent,
  MouseEvent,
  ForwardedRef,
  HTMLProps,
  forwardRef,
  useState,
  useEffect,
  FormEvent,
} from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
// Components
import Input from "../../../../components/Input/Input";

function InnerComponent(
  { ...props }: HTMLProps<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { state, dispatch } = useApp();
  const [checkboxStatus, setCheckboxStatus] = useState(true);

  function changeCheckboxStatus() {
    dispatch({ type: "togglePostalCodeCheckbox", payload: !checkboxStatus });
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

  useEffect(() => {
    if (state.rememberPostalCodeCheckboxStatus != null) {
      setCheckboxStatus(state.rememberPostalCodeCheckboxStatus);
    }
  }, [state.rememberPostalCodeCheckboxStatus]);

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
        checked: checkboxStatus,
        onChange: inputOnChangeFunction,
        onKeyDown: inputOnKeyDownFunction,
        ...props,
      }}
    />
  );
}

export const PostalCodeRememberCheckbox = forwardRef(InnerComponent);
