// Import React dependencies
import {
  ForwardedRef,
  HTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  Ref,
  forwardRef,
} from "react";
// Import styles
import "./index.scss";

// Defining the type for the input types
type InputTypes = "text" | "search" | "checkbox";

// Defining the type for the input props
type InputProps =
  | InputHTMLAttributes<HTMLInputElement> // Include all standard input attributes
  | (InputHTMLAttributes<HTMLInputElement> & { ref: Ref<HTMLInputElement> }); // Include all standard input attributes and the ref

// Defining the type for the component props
type ComponentPropsType = {
  type: InputTypes; // The type of the input
  id: string; // The id of the input
  label: string; // The label of the input
  className?: string; // The class name of the input
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>; // The props for the label
  inputProps?: InputProps; // The props for the input
};

/**
 * Input Component
 *
 * This component displays an input with a label.
 *
 * @param type - The type of the input.
 * @param id - The id of the input.
 * @param label - The label of the input.
 * @param className - The class name of the input.
 * @param labelProps - The props for the label.
 * @param inputProps - The props for the input.
 *
 * @returns A container div element with a class of "{type}-input" and the class name if provided, containing a Label component with the label and label props, a CustomInput component with the id, name, type, and input props, and a div which is the visual equivalent of 'input' with a class of "checkbox-input__checkbox", a role of "presentation", and an aria-hidden attribute of "true" if the type is "checkbox".
 */

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

// Defining the type for the label props
type LabelPropsType<T> = {
  type: T; // The type of the label
  children: string; // The children of the label
  className?: string; // The class name of the label
} & HTMLProps<HTMLLabelElement>; // Include all standard label attributes

/**
 * Label Component
 *
 * This component displays a label.
 *
 * @param type - The type of the label.
 * @param className - The class name of the label.
 * @param children - The children of the label.
 * @param props - The other props for the label.
 *
 * @returns A label element with a class of "{type}-input__label" and the class name if provided, and the other props.
 */
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

// Defining the type for the custom input props
type CustomInputPropsType<T> = {
  type: T; // The type of the custom input
  className?: string; // The class name of the custom input
} & HTMLProps<HTMLInputElement>; // Include all standard input attributes

/**
 * InnerInput Component
 *
 * This component displays an input.
 *
 * @param type - The type of the input.
 * @param className - The class name of the input.
 * @param props - The other props for the input.
 * @param ref - The ref for the input.
 *
 * @returns An input element with a class of "{type}-input__input" and the class name if provided, the type, the ref, and the other props.
 */
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

// Creating a forward ref for the InnerInput component
const CustomInput = forwardRef(InnerInput);
