// Import types
import type { HTMLProps } from "react";
import type { TextVariants } from "../../../../../../types/colorsVariantsType";

/**
 * Header Component
 *
 * This is a React functional component. It displays a header with a title. The color of the title can be customized by passing a `variant` prop.
 *
 * @param {string} title - The title to be displayed in the header.
 * @param {TextVariants} props.variant - The color variant for the title. If not provided, the color defaults to "gray".
 * @param {HTMLProps<HTMLDivElement>} props.props - Any additional props to be passed to the `header` element.
 *
 * @example
 * <Header title="Product Information" variant="blue" />
 *
 * @returns A JSX element that consists of a `header` element with the class name `additional-info__title` and an additional class that depends on the `variant` prop. The `header` element displays the `title` prop.
 */

export function Header({
  title,
  variant,
  ...props
}: { title: string; variant?: TextVariants } & HTMLProps<HTMLDivElement>) {
  return (
    <header
      {...props} // Pass any additional props to the header element.
      className={`additional-info__title ${variant ? `tx-${variant}` : "tx-gray"}`}
    >
      {title}
    </header>
  );
}
