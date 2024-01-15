// Import types
import type { HTMLProps, ReactNode } from "react";

// Define the type for the TextContainer props
type TextContainerPropsType = {
  children: ReactNode; // The elements that this component will wrap around
  className?: string; // Optional string that determines the class of the component
} & HTMLProps<HTMLDivElement>;

/**
 * TextContainer component
 *
 * This component wraps around its children and applies a CSS class to itself.
 * If className is provided, it will also apply the provided class.
 *
 * @param children - The elements that this component will wrap around.
 *
 * @param className - Optional string that determines the class of the component.
 *
 * @param props - Any additional props to pass to the div component.
 *
 * @returns A div component with a "card__text-wrapper" class, and the provided className if it exists.
 */

export function TextContainer({
  children,
  className,
  ...props
}: TextContainerPropsType) {
  return (
    <div
      {...props}
      className={`card__text-wrapper${className ? ` ${className}` : ""}`}
      data-testid="card-text-container"
    >
      {children}
    </div>
  );
}
