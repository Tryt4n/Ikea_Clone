// React
import {
  MouseEvent,
  ForwardedRef,
  HTMLProps,
  forwardRef,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
// Components
import Input from "../../../../components/Input/Input";
// Styles
import "./index.scss";

function InnerComponent(
  { ...props }: HTMLProps<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { state } = useApp();
  const [inputTextValue, setInputTextValue] = useState("");

  const { postalCode, isPostalCodeErrorMessageVisible, postalCodeErrorMessage } = state;

  useEffect(() => {
    if (postalCode !== "") {
      setInputTextValue(postalCode);
    }
  }, [postalCode]);

  function labelOnClickFunction(e: MouseEvent<HTMLLabelElement>) {
    e.preventDefault();

    if (ref && "current" in ref && ref.current) {
      ref.current.focus();
    }
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputTextValue(e.target.value);
  }

  return (
    <div className="postal-code-input">
      <Input
        type="text"
        id="postal-code"
        label="Wprowadź kod pocztowy"
        labelProps={{
          onClick: labelOnClickFunction,
        }}
        inputProps={{
          ref: ref,
          className: "postal-code-input__input",
          required: true,
          autoComplete: "off",
          pattern: `\\d{2}-\\d{3}`,
          title: "Wprowadź poprawny kod pocztowy (np. 12-345)",
          "aria-describedby": !postalCodeErrorMessage ? "postal-code-example" : undefined,
          "aria-errormessage": postalCodeErrorMessage ? "postal-code-errormessage" : undefined,
          "aria-invalid": isPostalCodeErrorMessageVisible,
          value: inputTextValue,
          onChange: onInputChange,
          ...props,
        }}
      />

      {!postalCodeErrorMessage && (
        <small
          id="postal-code-example"
          className="postal-code-input__example tx-gray"
          aria-hidden={isPostalCodeErrorMessageVisible}
        >
          np. 12-345
        </small>
      )}

      {postalCodeErrorMessage && (
        <small
          id="postal-code-errormessage"
          className="postal-code-input__errormessage"
          aria-hidden={!isPostalCodeErrorMessageVisible}
        >
          {postalCodeErrorMessage}
        </small>
      )}
    </div>
  );
}

export const PostalCodeInput = forwardRef(InnerComponent);
