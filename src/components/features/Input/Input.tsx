// React
import {
  ForwardedRef,
  HTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  Ref,
  forwardRef,
} from "react";
// Styles
import "./index.scss";

type InputTypes = "text" | "search" | "checkbox";

type InputProps =
  | InputHTMLAttributes<HTMLInputElement>
  | (InputHTMLAttributes<HTMLInputElement> & { ref: Ref<HTMLInputElement> });

type ComponentPropsType = {
  type: InputTypes;
  id: string;
  label: string;
  className?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputProps;
};

export default function Input({
  type,
  id,
  label,
  className,
  labelProps,
  inputProps,
}: ComponentPropsType) {
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
