// Import components
import { DescriptionSection } from "./innerComponents/DescriptionSection/DescriptionSection";
import { LongDescriptionSectionWithImage } from "./innerComponents/LongDescriptionSectionWithImage/LongDescriptionSectionWithImage";
// Import types
import type { ProductDataType } from "../../types/ProductDataType";
// Import styles
import "./index.scss";

/**
 * AdditionalDescriptionInformation Component
 *
 * This is a React functional component. It displays additional description information about a product. Each section of the additional information is either a `DescriptionSection` or a `LongDescriptionSectionWithImage`, depending on whether the `additionalSections` property of the section data is truthy.
 *
 * @param {NonNullable<ProductDataType["additionalInfo"]>} infoData - The data for the additional information sections.
 *
 * @example
 * <AdditionalDescriptionInformation infoData={productData.additionalInfo} />
 *
 * @returns A JSX element that consists of a `div` with the class name `additional-info`. Inside this `div`, it renders a `section` for each item in the `infoData` array. Each `section` renders either a `LongDescriptionSectionWithImage` component or a `DescriptionSection` component, depending on whether the `additionalSections` property of the section data is truthy.
 */

export default function AdditionalDescriptionInformation({
  infoData,
}: {
  infoData: NonNullable<ProductDataType["additionalInfo"]>;
}) {
  return (
    <div className="additional-info">
      {infoData.map((section) => {
        const { title, additionalSections } = section;

        return (
          <section key={title}>
            {/* If the additionalSections property of the section data is truthy, render a LongDescriptionSectionWithImage component. Otherwise, render a DescriptionSection component. */}
            {additionalSections ? (
              <LongDescriptionSectionWithImage data={section} />
            ) : (
              <DescriptionSection data={section} />
            )}
          </section>
        );
      })}
    </div>
  );
}
