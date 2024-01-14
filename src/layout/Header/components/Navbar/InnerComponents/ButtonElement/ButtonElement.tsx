// Import types
import type { ReactNode } from "react";

// Define types for ButtonElement props
export type ButtonProps = {
  children: ReactNode; // The children of the component
  as?: "button"; // The `as` prop is set to "button" to render the ButtonElement component
  className?: string; // The class name for the component
  container?: "true" | "false"; // The container prop to determine whether to render the component with the `btn-container` class
};

/**
 * ButtonElement
 *
 * Component that serves as a wrapper for a button element. It uses the `li` HTML element to create a list item with a button.
 *
 * The `className` prop can be used to add additional CSS classes to the list item, and the `container` prop can be used to determine whether the component is a container.
 * If `container` is "true", the "btn-container" class is added to the list item.
 *
 * @param {ReactNode} props.children - The children of the component.
 * @param {"button"} props.as - The `as` prop is set to "button" to render the ButtonElement component.
 * @param {string} props.className - The class name for the component.
 * @param {"true" | "false"} props.container - The container prop to determine whether to render the component with the `btn-container` class.
 *
 * @returns {JSX.Element} The ButtonElement component.
 */

export function ButtonElement({
  children,
  className,
  container = "true",
}: ButtonProps) {
  return (
    <li
      className={`${container === "true" ? "btn-container" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </li>
  );
}
