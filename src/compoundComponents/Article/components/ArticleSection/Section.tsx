// Importing necessary types from React
import { HTMLProps, ReactNode } from "react";

// Defining the type for the props of the Section component
type SectionPropsType = {
  // The children prop is used to pass React elements to be rendered inside the Section component
  children: ReactNode;
  // The className prop is an optional string that can be used to add additional CSS classes to the Section component
  className?: string;
  // The HTMLProps<HTMLDivElement> type is used to allow all standard HTML div element properties to be passed to the Section component
} & HTMLProps<HTMLDivElement>;

/**
 * Section component
 *
 * This component is a wrapper for a section element with the class of "article__section".
 * It accepts all standard HTML div element properties and an optional className prop to add additional CSS classes.
 *
 * @param children - The React elements to be rendered inside the Section component.
 * @param className - The additional CSS classes to add to the Section component.
 * @param props - The standard HTML div element properties to be added to the Section component.
 *
 * @returns A section element with the class of "article__section" and any additional CSS classes passed through the className prop, containing the passed children.
 */
export function Section({ children, className, ...props }: SectionPropsType) {
  return (
    <section
      className={`article__section${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </section>
  );
}
