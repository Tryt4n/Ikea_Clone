// Importing necessary types from React
import { ReactNode } from "react";

// Defining the type for the props of the Text component
type TextPropsType = {
  // The children prop is used to pass React elements to be rendered inside the Text component
  children: ReactNode;
};

/**
 * Text component
 *
 * This component is a wrapper for a paragraph element with the class of "article__text".
 * It accepts a children prop which should be a ReactNode.
 *
 * @param children - The React elements to be rendered inside the Text component.
 *
 * @returns A paragraph element with the class of "article__text", containing the passed React elements.
 */
export function Text({ children }: TextPropsType) {
  return <p className="article__text">{children}</p>;
}
