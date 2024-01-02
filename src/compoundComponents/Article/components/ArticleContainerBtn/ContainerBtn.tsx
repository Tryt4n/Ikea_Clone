// Importing necessary types from React
import type { AnchorHTMLAttributes } from "react";
// Importing the type for button variants
import type { ArticleBtnVariantsType } from "../../../../types/articleTypes";
// Importing the type for button sizes
import type { BtnSizesType } from "../../../../types/btnTypes";

// Defining the type for the props of the ContainerBtn component
type ContainerBtnPropsType = {
  // The children prop is used to pass a string to be rendered inside the ContainerBtn component
  children: string;
  // The className prop is an optional string that can be used to add additional CSS classes to the ContainerBtn component
  className?: string;
  // The variant prop is an optional string that can be used to specify a button variant for the ContainerBtn component
  variant?: ArticleBtnVariantsType;
  // The size prop is an optional string that can be used to specify a button size for the ContainerBtn component
  size?: BtnSizesType;
  // The AnchorHTMLAttributes<HTMLAnchorElement> type is used to allow all standard HTML anchor element properties to be passed to the ContainerBtn component
} & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * ContainerBtn component
 *
 * This component is a wrapper for an anchor element with the classes of "btn", "btn--variant", "btn--size", and "btn--oval".
 * It accepts a children prop which should be a string, and optional className, variant, and size props.
 * All standard HTML anchor element properties can also be passed.
 *
 * @param children - The string to be rendered inside the ContainerBtn component.
 * @param className - The additional CSS classes to add to the ContainerBtn component.
 * @param variant - The button variant for the ContainerBtn component. Defaults to "dark".
 * @param size - The button size for the ContainerBtn component. Defaults to "small".
 * @param props - The standard HTML anchor element properties to be added to the ContainerBtn component.
 *
 * @returns An anchor element with the classes of "btn", "btn--variant", "btn--size", "btn--oval", and any additional CSS classes passed through the className prop, containing the passed string.
 */

export function ContainerBtn({
  children,
  className,
  variant = "dark",
  size = "small",
  ...props
}: ContainerBtnPropsType) {
  return (
    <a
      {...props}
      className={`btn btn--${variant} btn--${size} btn--oval${className ? ` ${className}` : ""}`}
    >
      {children}
    </a>
  );
}
