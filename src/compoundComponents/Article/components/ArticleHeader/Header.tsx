// Importing necessary functions and types from React
import { createElement, type HTMLProps, type ReactNode } from "react";

// Defining the type for the props of the Header component
type HeaderPropsType = {
  // The children prop is used to pass React elements to be rendered inside the Header component
  children: ReactNode;
  // The headingLevel prop is an optional number that can be used to specify the heading level for the Header component
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  // The className prop is an optional string that can be used to add additional CSS classes to the Header component
  className?: string;
  // The HTMLProps<HTMLHeadingElement> type is used to allow all standard HTML heading element properties to be passed to the Header component
} & HTMLProps<HTMLHeadingElement>;

/**
 * Header component
 *
 * This component is a wrapper for a heading element with the class of "article__heading".
 * It accepts a headingLevel prop to specify the heading level and all standard HTML heading element properties.
 * An optional className prop can be used to add additional CSS classes.
 *
 * @param children - The React elements to be rendered inside the Header component.
 * @param className - The additional CSS classes to add to the Header component.
 * @param headingLevel - The heading level for the Header component.
 * @param props - The standard HTML heading element properties to be added to the Header component.
 *
 * @returns A heading element with the specified heading level (default is h2), the class of "article__heading", and any additional CSS classes passed through the className prop, containing the passed children.
 */
export function Header({
  children,
  className,
  headingLevel,
  ...props
}: HeaderPropsType) {
  // The Element variable is set to the specified heading level or defaults to "h2"
  const Element = headingLevel ? `h${headingLevel}` : "h2";

  // The createElement function is used to create a heading element with the specified heading level, the class of "article__heading", and any additional CSS classes and properties
  return createElement(
    Element,
    {
      ...props,
      className: `article__heading${className ? ` ${className}` : ""}`,
    },
    children,
  );
}

/**
 * SubHeader component
 *
 * This component is a wrapper for a paragraph element with the class of "article__subheading".
 * It accepts a children prop which should be a string.
 *
 * @param children - The string to be rendered inside the SubHeader component.
 *
 * @returns A paragraph element with the class of "article__subheading", containing the passed string.
 */
export function SubHeader({ children }: { children: string }) {
  return <p className="article__subheading">{children}</p>;
}
