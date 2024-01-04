// Import components
import { Header } from "../Header/Header";
// Import types
import type { AdditionalInfo } from "../../../../types/ProductDataType";

/**
 * DescriptionSection Component
 *
 * This is a React functional component. It displays a section of additional information about a product, consisting of a header and a description. The header is rendered by the `Header` component, and the description is rendered as a paragraph of text. If there is a sub-description, it is also rendered as a paragraph of text.
 *
 * @param {AdditionalInfo} data - The data for the section.
 *
 * @example
 * <DescriptionSection data={additionalInfoData} />
 *
 * @returns A JSX element that consists of a `div` with the class name `additional-info__section-container`. Inside this `div`, it renders the `Header` component and another `div` with the class name `additional-info__text-container`. Inside the `additional-info__text-container` `div`, it renders a `h4` element that displays the `header` prop, a `p` element that displays the `description` prop, and another `p` element that displays the `subDescription` prop if it exists.
 */

export function DescriptionSection({ data }: { data: AdditionalInfo }) {
  const { title, variant, header, description, subDescription } = data;

  return (
    <div className="additional-info__section-container">
      <Header
        title={title}
        variant={variant}
      />

      <div className="additional-info__text-container">
        <h4 className="additional-info__heading">{header}</h4>
        <div className="additional-info__description-container">
          <p>{description}</p>

          {/* If there is a subDescription, render it. */}
          {subDescription && <p>{subDescription}</p>}
        </div>
      </div>
    </div>
  );
}
