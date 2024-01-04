// Import icons
import InfoIcon from "../../../../Icons/InfoIcon";
// Import styles
import "./index.scss";

/**
 * AdditionalInformation Component
 *
 * This is a React functional component. It displays additional information provided to it as a prop.
 *
 * @param {string} additionalInformation - The additional information to be displayed in the component.
 *
 * @example
 * <AdditionalInformation additionalInformation="This is some additional information" />
 *
 * @returns A JSX element that consists of a `div` with the class name `additional-information`. Inside this `div`, it renders the `InfoIcon` component and a `p` element. The `p` element displays the `additionalInformation` prop.
 */

export default function AdditionalInformation({
  additionalInformation,
}: {
  additionalInformation: string;
}) {
  return (
    <div className="additional-information">
      <InfoIcon />
      <p>{additionalInformation}</p>
    </div>
  );
}
