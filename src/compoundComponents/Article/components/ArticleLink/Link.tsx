// Importing necessary types from React
import { AnchorHTMLAttributes, ReactNode } from "react";

// Defining the type for the props of the Link component
type LinkPropsType = {
  // The children prop is used to pass React elements to be rendered inside the Link component
  // It is optional and defaults to the string "Dowiedz się więcej"
  children?: ReactNode;
  // The AnchorHTMLAttributes<HTMLAnchorElement> type is used to allow all standard HTML anchor element properties to be passed to the Link component
} & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Link component
 *
 * This component is a wrapper for an anchor element.
 * It accepts a children prop which should be a ReactNode and defaults to the string "Dowiedz się więcej".
 * All standard HTML anchor element properties can also be passed.
 *
 * @param children - The React elements to be rendered inside the Link component. Defaults to "Dowiedz się więcej".
 * @param props - The standard HTML anchor element properties to be added to the Link component.
 *
 * @returns An anchor element containing the passed React elements or the default string "Dowiedz się więcej".
 */
export function Link({ children = "Dowiedz się więcej", ...props }: LinkPropsType) {
  return <a {...props}>{children}</a>;
}
