// Importing the Btn component and its props type
import { Btn, type BtnPropsType } from "../../../../components/ui/Btn/Btn";

/**
 * SlideBtn component
 *
 * This component is a wrapper for the Btn component with the class of "article__slide-btn", the "aria-hidden" attribute set to "true", and the "tabIndex" attribute set to -1.
 * It accepts all the props of the Btn component.
 *
 * @param props - The props of the Btn component to be added to the SlideBtn component.
 *
 * @returns A Btn component with the class of "article__slide-btn", the "aria-hidden" attribute set to "true", and the "tabIndex" attribute set to -1 for accessibility reason.
 */

export function SlideBtn(props: BtnPropsType) {
  return (
    <Btn
      {...props}
      className="article__slide-btn"
      aria-hidden="true" // The "aria-hidden" attribute is set to "true" to hide the SlideBtn component from screen readers
      tabIndex={-1} // The "tabIndex" attribute is set to -1 to remove the SlideBtn component from the tab order
    />
  );
}
