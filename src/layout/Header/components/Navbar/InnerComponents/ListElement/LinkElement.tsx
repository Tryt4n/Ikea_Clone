// Import components
import { ButtonElement } from "../ButtonElement/ButtonElement";
// Import types
import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { ButtonProps } from "../ButtonElement/ButtonElement";

/**
 * ListElement
 *
 * Component that serves as a wrapper for either a LinkElement or a ButtonElement. It uses the `as` prop to determine which component to render.
 *
 * @param {ButtonProps | LinkProps} props - The props for the component.
 * @returns {JSX.Element} The ListElement component.
 */
export function ListElement(props: ButtonProps | LinkProps) {
  return props.as === "link" ? (
    <LinkElement {...props} />
  ) : (
    <ButtonElement {...props} />
  );
}

// Define types for LinkElement props
type LinkProps = {
  children: ReactNode; // The children of the component
  as: "link"; // The `as` prop is set to "link" to render the LinkElement component
  className?: string; // The class name for the component
  link?: string; // The link for the anchor element
  container?: "true" | "false"; // The container prop to determine whether to render the component with the `btn-container` class
} & AnchorHTMLAttributes<HTMLAnchorElement>; // The props for the anchor element

/**
 * LinkElement
 *
 * Component that serves as a wrapper for an anchor element. It uses the `li` and `a` HTML elements to create a list item with a link.
 *
 * @param {LinkProps} props - The props for the component.
 * @returns {JSX.Element} The LinkElement component.
 */

export function LinkElement({
  children,
  className,
  link = "#",
  container = "true",
  ...props
}: LinkProps) {
  return (
    <li
      className={`${container === "true" ? "btn-container" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <a href={link} className="btn-container__svg-wrapper" {...props}>
        {children}
      </a>
    </li>
  );
}
