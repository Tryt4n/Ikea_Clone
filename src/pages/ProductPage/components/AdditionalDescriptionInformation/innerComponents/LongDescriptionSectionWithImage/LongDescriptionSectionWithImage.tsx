// Import components
import { ImgContainer } from "../ImgContainer/ImgContainer";
import { LongDescriptionSections } from "../LongDescriptionSections/LongDescriptionSections";
// Import types
import type { AdditionalInfo } from "../../../../types/ProductDataType";

/**
 * LongDescriptionSectionWithImage Component
 *
 * This is a React functional component. It displays a section of a long description with an image. The image is rendered by the `ImgContainer` component, and the description is rendered by the `LongDescriptionSections` component.
 *
 * @param {AdditionalInfo} data - The data for the section.
 *
 * @example
 * <LongDescriptionSectionWithImage data={additionalInfoData} />
 *
 * @returns A JSX element that consists of a `div` with the class name `additional-info__long-section-container`. Inside this `div`, it renders the `ImgContainer` component with the `backgroundImage` prop from the `data` prop, and the `LongDescriptionSections` component with the `data` prop.
 */

export function LongDescriptionSectionWithImage({
  data,
}: {
  data: AdditionalInfo;
}) {
  return (
    <div className="additional-info__long-section-container">
      <ImgContainer img={data.backgroundImage!} />

      <LongDescriptionSections data={data} />
    </div>
  );
}
