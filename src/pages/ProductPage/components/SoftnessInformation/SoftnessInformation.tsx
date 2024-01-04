// Import icons
import SoftnessIndexIcon from "../../../../Icons/SoftnessIndexIcon";
// Import types
import type { SoftnessIndexType } from "../../../../types/softnessVariants";
// Import styles
import "./index.scss";

/**
 * SoftnessInformation Component
 *
 * This is a React functional component. It displays the softness index of a product, represented by an icon and a text description.
 *
 * @param {SoftnessIndexType} softnessIndex - The softness index of the product.
 *
 * @example
 * <SoftnessInformation softnessIndex="Miękki" />
 *
 * @returns A JSX element that consists of a `div` with the class name `softness-information`. Inside this `div`, it renders a `SoftnessIndexIcon` and a `span` that displays the `softnessIndex` prop.
 */

export default function SoftnessInformation({
  softnessIndex,
}: {
  softnessIndex: SoftnessIndexType;
}) {
  return (
    <div className="softness-information">
      <SoftnessIndexIcon />
      <span className="softness-information__text">{softnessIndex}</span>
    </div>
  );
}
