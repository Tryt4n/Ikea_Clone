// React
import InfoIcon from "../../../Icons/InfoIcon";
// Style
import "./index.scss";

// Define the type for the InformationBox props
type InformationBoxPropsType = {
  heading?: string; // The heading text, optional
  headingLevel?: 2 | 3 | 4 | 5 | 6; // The heading level, defaults to 3
  information: string; // The information text
  as?: "div" | "section"; // The HTML element to use for the container, defaults to "div"
  className?: string; // Optional additional CSS classes
};

/**
 * InformationBox component
 *
 * This component displays an information box with an optional heading and required information text.
 *
 * @param heading - The heading text.
 * @param headingLevel - The heading level.
 * @param as - The HTML element to use for the container.
 * @param information - The information text.
 * @param className - Optional additional CSS classes.
 *
 * @returns An element of the type specified by the 'as' prop, containing an InfoIcon, an optional heading, and the information text.
 */
export default function InformationBox({
  heading,
  headingLevel = 3,
  as = "div",
  information,
  className,
}: InformationBoxPropsType) {
  // Use the 'as' prop to determine the type of the container element
  const Container = as;
  // Use the 'headingLevel' prop to determine the type of the heading element
  const Heading = `h${headingLevel}` as const;

  return (
    <Container className={`information-box${className ? ` ${className}` : ""}`}>
      <InfoIcon />
      <div>
        {heading && <Heading>{heading}</Heading>}
        <p>{information}</p>
      </div>
    </Container>
  );
}
