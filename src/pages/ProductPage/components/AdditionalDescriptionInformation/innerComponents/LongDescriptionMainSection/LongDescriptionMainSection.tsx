// Define props types for the component.
type LongDescriptionSectionType = {
  header: string; // The header of the section.
  description: string; // The text of the section.
};

/**
 * LongDescriptionMainSection Component
 *
 * This is a React functional component. It displays a section of a long description, consisting of a header and a paragraph of text.
 *
 * @param {string} header - The header of the section.
 * @param {string} prop.description - The text of the section.
 *
 * @example
 * <LongDescriptionMainSection header="Product Details" description="This is a detailed description of the product." />
 *
 * @returns A JSX element that consists of a `div` with the class name `additional-info__description-container`. Inside this `div`, it renders a `h4` element that displays the `header` prop and a `p` element that displays the `description` prop.
 */

export function LongDescriptionMainSection({
  header,
  description,
}: LongDescriptionSectionType) {
  return (
    <div className="additional-info__description-container">
      <h4 className="additional-info__heading">{header}</h4>
      <p>{description}</p>
    </div>
  );
}
