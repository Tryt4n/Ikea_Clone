// React
import { MouseEvent, ForwardedRef, HTMLProps, forwardRef, useState, useEffect } from "react";
// Custom Hooks
import useApp from "../../hooks/useApp";
// Styles
import "./index.scss";

function InnerComponent(
  { ...props }: HTMLProps<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { state } = useApp();
  const [inputTextValue, setInputTextValue] = useState("");

  const { postalCode, isErrorMessageVisible, errorMessage } = state;

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

  return (
    <div className="input-text">
      <label
        htmlFor="postal-code"
        className="input-text__label"
        onClick={labelOnClickFunction}
      >
        Wprowadź kod pocztowy
      </label>

      <input
        ref={ref}
        id="postal-code"
        className={`input-text__input${isErrorMessageVisible ? " error" : ""}`}
        type="text"
        name="postal-code"
        required
        aria-describedby={!errorMessage ? "postal-code-example" : undefined}
        aria-errormessage={errorMessage ? "postal-code-errormessage" : undefined}
        aria-invalid={isErrorMessageVisible}
        autoComplete="off"
        value={inputTextValue}
        onChange={(e) => setInputTextValue(e.target.value)}
        {...props}
      />

      {!errorMessage && (
        <small
          id="postal-code-example"
          className="input-text__example tx-gray"
          aria-hidden={isErrorMessageVisible}
        >
          np. 12-345
        </small>
      )}

      {errorMessage && (
        <small
          id="postal-code-errormessage"
          className="input-text__errormessage"
          aria-hidden={!isErrorMessageVisible}
        >
          {errorMessage}
        </small>
      )}
    </div>
  );
}

export const PostalCodeInput = forwardRef(InnerComponent);
