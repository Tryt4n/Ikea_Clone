// Import types
import type { AnchorHTMLAttributes, HTMLProps, ReactNode } from "react";
import type { CardHTMLElementsType } from "../../types/cardTypes";
import type { BackgroundVariants } from "../../types/colorsVariantsType";
// Import child components
import { CardImg } from "./components/CardImg/CardImg";
import { TextContainer } from "./components/CardTextContainer/TextContainer";
import { Heading } from "./components/CardHeading/Heading";
import { Text } from "./components/CardText/Text";
import { CardBtn } from "./components/CardBtn/CardBtn";
// Style
import "./index.scss";

// Define the type for the Card props
type CardPropsType<T> = {
  children: ReactNode; // The elements that this component will wrap around
  className?: string; // Optional string that will be added to the className prop of the component
  as?: CardHTMLElementsType; // Optional string that determines the HTML element that the component will render as, defaults to "div"
  variant?: BackgroundVariants; // Optional string that determines the background color of the component, defaults to "primary"
} & (T extends "div"
  ? HTMLProps<HTMLDivElement>
  : T extends "a"
  ? AnchorHTMLAttributes<HTMLAnchorElement>
  : T extends "section"
  ? HTMLProps<HTMLElement>
  : never); // This allows the component to accept all properties that the specified HTML element would accept

/**
 * Card component
 *
 * This component wraps around its `children` and applies a CSS class to itself.
 * If `className` is provided, it will also apply the provided class.
 * If `as` is provided, it will render as the provided HTML element type.
 * If `variant` is provided, it will apply a background variant class.
 *
 * @param children - The elements that this component will wrap around.
 * @param as - Optional string that determines the HTML element type of the component, defaults to "div".
 * @param variant - Optional string that determines the background variant of the component.
 * @param className - Optional string that determines the class of the component.
 * @param props - Any additional props to pass to the HTML element component.
 *
 * @returns An HTML element component with the specified type, a "card" class, a background variant class if variant is provided, the provided className if it exists, and the provided children.
 */

export default function Card<T extends "div" | "a">({
  children,
  as = "div",
  variant,
  className,
  ...props
}: CardPropsType<T>) {
  const Element = as === "div" ? "div" : as === "link" ? "a" : "section"; // Determine the HTML element type

  return (
    <Element
      {...(props as HTMLProps<HTMLDivElement> & HTMLProps<HTMLAnchorElement>)} // Spread the rest of the props
      className={`card bg-${variant}${className ? ` ${className}` : ""}`} // Set the class to "card", a background variant class if variant is provided, and the provided className if it exists
    >
      {children}
    </Element>
  );
}

// Define child components
Card.Img = CardImg;
Card.TextContainer = TextContainer;
Card.Heading = Heading;
Card.Text = Text;
Card.Btn = CardBtn;
