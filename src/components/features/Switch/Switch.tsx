// Import React dependencies
import { ForwardedRef } from "react";
// Import components
import { Btn } from "../../ui/Btn/Btn";
// Import types
import type { BtnPropsType } from "../../ui/Btn/Btn";
// Importing styles
import "./index.scss";

// Defining the type for the Switch props
export type SwitchType = {
  firstPropertyProps: BtnPropsType & { ref?: ForwardedRef<HTMLButtonElement> }; // The props for the first button
  secondPropertyProps: BtnPropsType & { ref?: ForwardedRef<HTMLButtonElement> }; // The props for the second button
  props?: Omit<BtnPropsType, "children">; // The common props for both buttons
};

/**
 * Switch Component
 *
 * This component displays a switch with two buttons.
 *
 * @param firstPropertyProps - The props for the first button.
 * @param secondPropertyProps - The props for the second button.
 * @param props - The common props for both buttons.
 *
 * @returns A div element with a class of "switch-wrapper", containing two Btn components, the common props, and their respective props.
 */
export default function Switch({
  firstPropertyProps,
  secondPropertyProps,
  props,
}: SwitchType) {
  return (
    <div className="switch-wrapper">
      <Btn size="big" {...props} {...firstPropertyProps} />

      <Btn size="big" {...props} {...secondPropertyProps} />
    </div>
  );
}
