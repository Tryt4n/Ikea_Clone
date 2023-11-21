// React
import { ForwardedRef, HTMLProps, forwardRef } from "react";
// Styles
import "./index.scss";

type InputTypes = "text" | "checkbox";

type InputPropsType = {
  type: InputTypes;
  id: string;
  labelProps?: HTMLProps<HTMLLabelElement>;
  inputProps?: Omit<HTMLProps<HTMLInputElement>, "ref">;
};

export default function Input({ type, id, labelProps, inputProps }: InputPropsType) {
  return (
    <div className={`${type}-input`}>
      <Label
        htmlFor={id}
        type={type}
        {...labelProps}
      />
      <CustomInput
        id={id}
        name={id}
        type={type}
        {...inputProps}
      />
    </div>
  );
}

type LabelPropsType<T> = {
  type: T;
  className?: string;
} & HTMLProps<HTMLLabelElement>;

function Label<T>({ type, className, ...props }: LabelPropsType<T>) {
  return (
    <label
      className={`${type}-input__label${className ? ` ${className}` : ""}`}
      {...props}
    >
      Wprowadź kod pocztowy
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
