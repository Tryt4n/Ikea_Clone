import { ForwardedRef, forwardRef } from "react";
import "./index.scss";

type InputTextPropsType = {
  id: string;
  label: string;
  exampleMessage?: string;
  errorMessage?: string;
  isError?: boolean;
};

function InnerComponent(
  { id, label, exampleMessage, errorMessage, isError }: InputTextPropsType,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="input-text">
      <label
        htmlFor={id}
        className="input-text__label"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={`input-text__input${isError ? " error" : ""}`}
        type="text"
        name={id}
        required
        aria-describedby={exampleMessage ? `${id}-example` : undefined}
        aria-errormessage={errorMessage ? `${id}-errormessage` : undefined}
      />
      {exampleMessage && (
        <small
          id={`${id}-example`}
          className="input-text__example tx-gray"
          aria-hidden={isError}
        >
          {exampleMessage}
        </small>
      )}
      {errorMessage && (
        <small
          id={`${id}-errormessage`}
          className="input-text__errormessage"
          aria-hidden={!isError}
        >
          {errorMessage}
        </small>
      )}
    </div>
  );
}

export const InputText = forwardRef(InnerComponent);
