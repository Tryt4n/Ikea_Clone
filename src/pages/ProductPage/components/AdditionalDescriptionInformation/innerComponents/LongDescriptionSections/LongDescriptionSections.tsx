// Import react dependencies
import { useRef, useState } from "react";
// Import components
import { Header } from "../Header/Header";
import { LongDescriptionMainSection } from "../LongDescriptionMainSection/LongDescriptionMainSection";
import { LongDescriptionSection } from "../LongDescriptionSection/LongDescriptionSection";
import { ShowMoreBtn } from "../ShowMoreBtn/ShowMoreBtn";
// Import helpers functions
import { startViewTransition } from "../../../../../../utils/helpers";
// Import types
import type { AdditionalInfo } from "../../../../types/ProductDataType";

/**
 * LongDescriptionSections Component
 *
 * This is a React functional component. It displays a long description section of a product, consisting of a main section and additional sections. The main section is rendered by the `LongDescriptionMainSection` component, and each additional section is rendered by the `LongDescriptionSection` component. There is also a `ShowMoreBtn` component that toggles the visibility of the additional sections.
 *
 * @param {AdditionalInfo} data - The data for the section.
 *
 * @example
 * <LongDescriptionSections data={additionalInfoData} />
 *
 * @returns A JSX element that consists of a `div` with the class name `additional-info__long-content-container`. Inside this `div`, it renders the `Header` component, the `LongDescriptionMainSection` component, and a `LongDescriptionSection` component for each additional section in the `additionalSections` array from the `data` prop. It also renders the `ShowMoreBtn` component that toggles the visibility of the additional sections.
 */

export function LongDescriptionSections({ data }: { data: AdditionalInfo }) {
  const [showMore, setShowMore] = useState(false); // State for the visibility of the additional sections.
  const longDescriptionRef = useRef<HTMLDivElement | null>(null); // Ref for the long description section.

  const { title, variant, header, description, additionalSections } = data; // Destructure the data prop.

  // Function to handle the click event of the ShowMoreBtn component.
  function handleShowMoreClick() {
    startViewTransition(() => {
      setShowMore(!showMore);

      // If the additional sections are visible and the long description section exists, scroll to the top of the long description section.
      if (showMore && longDescriptionRef.current) {
        const targetScrollPosition =
          longDescriptionRef.current.getBoundingClientRect().top + window.scrollY - 90;

        // Check if the user has reduced motion enabled.
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // If the user has reduced motion enabled, set the behavior to "auto". Otherwise, set it to "smooth".
        const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

        window.scrollTo({ top: targetScrollPosition, behavior: scrollBehavior });
      }
    });
  }

  return (
    <div
      ref={longDescriptionRef} // Set the ref for the long description section.
      className={`additional-info__long-content-container${showMore ? " showMore" : ""}`} // Add the class name "showMore" if the additional sections are visible.
    >
      <div className="additional-info__long-content-wrapper">
        <Header
          title={title}
          variant={variant}
          id="long-section-header"
        />

        <LongDescriptionMainSection
          header={header}
          description={description}
        />

        {/* Render a LongDescriptionSection component for each additional section. */}
        {additionalSections &&
          additionalSections.map((section) => {
            return (
              <LongDescriptionSection
                key={section.header}
                header={section.header}
                description={section.description}
              />
            );
          })}
      </div>

      <ShowMoreBtn
        showMore={showMore} // Pass the state for the visibility of the additional sections to the ShowMoreBtn component.
        setShowMore={handleShowMoreClick} // Pass the function to handle the click event of the ShowMoreBtn component to the ShowMoreBtn component.
      />
    </div>
  );
}
