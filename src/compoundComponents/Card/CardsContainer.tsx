// Import necessary types from 'react' library
import type { HTMLProps, ReactNode } from "react";

// Define the type for the CardContainer props
type CardContainerPropsType = {
  children: ReactNode; // The elements that this component will wrap around
  breakOnMobile?: boolean; // Optional boolean that determines if the layout should change on mobile devices
} & HTMLProps<HTMLDivElement>; // This allows the component to accept all properties that a regular div would accept

/**
 * CardsContainer component
 *
 * This component wraps around its children and applies a CSS class to itself.
 * If breakOnMobile is true, it will also apply the 'breakOnMobile' CSS class.
 *
 * @param children - The elements that this component will wrap around.
 * @param breakOnMobile - Optional boolean that determines if the layout should change on mobile devices.
 * @param props - Any additional props to pass to the div component.
 *
 * @returns A div component with a "cards-container" class, and a "breakOnMobile" class if breakOnMobile is true.
 */

export default function CardsContainer({
  children,
  breakOnMobile = false,
}: CardContainerPropsType) {
  return (
    <div className={`cards-container${breakOnMobile ? ` breakOnMobile` : ""}`}>{children}</div>
  );
}
