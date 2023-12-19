// React
import { ForwardedRef, HTMLProps, forwardRef } from "react";
// Styles
import "./index.scss";

type InputTypes = "text" | "search" | "checkbox";

type InputPropsType = {
  type: InputTypes;
  id: string;
  label: string;
  className?: string;
  labelProps?: HTMLProps<HTMLLabelElement>;
  inputProps?: HTMLProps<HTMLInputElement>;
};

export default function Input({
  type,
  id,
  label,
  className,
  labelProps,
  inputProps,
}: InputPropsType) {
  return (
    <div className={`${type}-input${className ? ` ${className}` : ""}`}>
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        ref={inputProps ? inputProps.ref : null}
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
