// Importing necessary types from React
import { HTMLProps, ReactNode } from "react";

// Defining the type for the props of the Body component
type BodyPropsType = {
  // The children prop is used to pass React elements to be rendered inside the Body component
  children: ReactNode;
  // The className prop is an optional string that can be used to add additional CSS classes to the Body component
  className?: string;
  // The HTMLProps<HTMLDivElement> type is used to allow all standard HTML div element properties to be passed to the Body component
} & HTMLProps<HTMLDivElement>;

/**
 * Body component
 *
 * This component is a wrapper for a div element with the class of "article".
 * It accepts all standard HTML div element properties and an optional className prop to add additional CSS classes.
 *
 * @param children - The React elements to be rendered inside the Body component.
 * @param className - The additional CSS classes to add to the Body component.
 *
 * @returns A div element with the class of "article" and any additional CSS classes passed through the className prop, containing the passed children.
 */

export function Body({ children, className }: BodyPropsType) {
  return (
    <div className={`article${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
