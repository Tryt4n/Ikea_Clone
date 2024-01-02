// Import types
import type { HTMLProps } from "react";

// Define the type for the Text props
type TextPropsType = {
  children: string; // The string that this component will display
} & HTMLProps<HTMLParagraphElement>; // This allows the component to accept all properties that a regular paragraph would accept

/**
 * Text component
 *
 * This component renders a paragraph with the provided text.
 *
 * @param children - The string that this component will display.
 *
 * @param props - Any additional props to pass to the paragraph component.
 *
 * @returns A paragraph component with the provided text.
 */

export function Text({ children, ...props }: TextPropsType) {
  return <p {...props}>{children}</p>;
}
