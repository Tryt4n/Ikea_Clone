// React
import {
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";
// Types
import type {
  BtnShapesType,
  BtnSizesType,
  BtnVariantsType,
} from "../../../types/btnTypes";
// Style
import "./index.scss";

// Define the type for the button props
export type BtnPropsType = {
  children: string | ReactNode; // The content of the button
  className?: string; // Optional additional CSS classes
  variant?: BtnVariantsType; // The variant of the button, defaults to "dark"
  shape?: BtnShapesType; // The shape of the button, defaults to "oval"
  size?: BtnSizesType; // The size of the button, defaults to "small"
} & ButtonHTMLAttributes<HTMLButtonElement>; // Include all standard button attributes

// Define the inner button component
function InnerBtn(
  // Destructure the props and provide default values for variant, shape, and size
  {
    children,
    className,
    variant = "dark",
    shape = "oval",
    size = "small",
    ...props
  }: BtnPropsType,
  ref: ForwardedRef<HTMLButtonElement>, // Forwarded ref
) {
  // Construct the className from the variant, size, shape, and any additional classes
  const styles = `btn btn--${variant} btn--${size} btn--${shape}${
    className ? ` ${className}` : ""
  }`;

  return (
    <button
      className={styles}
      {...props} // Spread the rest of the props
      ref={ref} // Set the ref
    >
      {children}
    </button>
  );
}

// Export the button component with a forwarded ref
export const Btn = forwardRef(InnerBtn);
