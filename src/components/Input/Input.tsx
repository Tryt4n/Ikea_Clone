// React
import { ForwardedRef, HTMLProps, forwardRef } from "react";
// Styles
import "./index.scss";

type InputTypes = "text" | "search" | "checkbox";

type InputPropsType = {
  type: InputTypes;
  id: string;
  label: string;
  labelProps?: HTMLProps<HTMLLabelElement>;
  inputProps?: Omit<HTMLProps<HTMLInputElement>, "ref">;
};

export default function Input({ type, id, label, labelProps, inputProps }: InputPropsType) {
  return (
    <div className={`${type}-input`}>
      <Label
        htmlFor={id}
        type={type}
        {...labelProps}
      >
        {label}
      </Label>

      <CustomInput
        id={id}
        name={id}
        type={type}
        {...inputProps}
      />

      {type === "checkbox" && (
        <div
          className="checkbox-input__checkbox"
          role="presentation"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

type LabelPropsType<T> = {
  type: T;
  children: string;
  className?: string;
} & HTMLProps<HTMLLabelElement>;

function Label<T>({ type, className, children, ...props }: LabelPropsType<T>) {
  return (
    <label
      className={`${type}-input__label${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </label>
  );
}

type CustomInputPropsType<T> = {
  type: T;
  className?: string;
} & HTMLProps<HTMLInputElement>;

function InnerInput<T>(
  { type, className, ...props }: CustomInputPropsType<T>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      className={`${type}-input__input${className ? ` ${className}` : ""}`}
      type={type}
      ref={ref}
      {...props}
    />
  );
}

const CustomInput = forwardRef(InnerInput);
