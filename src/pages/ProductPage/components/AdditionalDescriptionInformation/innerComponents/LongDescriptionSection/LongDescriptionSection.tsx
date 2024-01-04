type LongDescriptionSectionType = {
  header: string;
  description: string;
};

/**
 * LongDescriptionSection Component
 *
 * This is a React functional component. It displays a section of a long description for a product, consisting of a header and a description. The header is rendered as a `h4` element, and the description is rendered as a `p` element.
 *
 * @param {string} props.header - The header for the section.
 * @param {string} props.description - The description for the section.
 *
 * @example
 * <LongDescriptionSection header="Product Details" description="This is a detailed description of the product." />
 *
 * @returns A JSX element that consists of a `section` with the class name `additional-info__description-container`. Inside this `section`, it renders a `h4` element that displays the `header` prop, and a `p` element that displays the `description` prop.
 */

export function LongDescriptionSection({ header, description }: LongDescriptionSectionType) {
  return (
    <section
      key={header}
      className="additional-info__description-container"
    >
      <h4 className="additional-info__heading-small">{header}</h4>
      <p>{description}</p>
    </section>
  );
}
