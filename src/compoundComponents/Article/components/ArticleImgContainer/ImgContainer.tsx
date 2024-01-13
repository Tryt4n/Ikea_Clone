// Importing necessary types from React
import { HTMLProps, ReactNode } from "react";

// Defining the type for the props of the ImgContainer component
type ImgContainerPropsType = {
  // The children prop is used to pass React elements to be rendered inside the ImgContainer component
  children: ReactNode;
  // The className prop is an optional string that can be used to add additional CSS classes to the ImgContainer component
  className?: string;
  // The HTMLProps<HTMLDivElement> type is used to allow all standard HTML div element properties to be passed to the ImgContainer component
} & HTMLProps<HTMLDivElement>;

/**
 * ImgContainer component
 *
 * This component is a wrapper for a div element with the class of "article__img-container".
 * It accepts all standard HTML div element properties and an optional className prop to add additional CSS classes.
 *
 * @param children - The React elements to be rendered inside the ImgContainer component.
 * @param className - The additional CSS classes to add to the ImgContainer component.
 * @param props - The standard HTML div element properties to be added to the ImgContainer component.
 *
 * @returns A div element with the class of "article__img-container" and any additional CSS classes passed through the className prop, containing the passed children.
 */
export function ImgContainer({
  children,
  className,
  ...props
}: ImgContainerPropsType) {
  return (
    <div
      className={`article__img-container${className ? ` ${className}` : ""}`}
      {...props}
      data-testid="article-img-container"
    >
      {children}
    </div>
  );
}
