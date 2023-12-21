// Components
import { ForwardedRef } from "react";
import { Btn } from "../../ui/Btn/Btn";
// Types
import type { BtnPropsType } from "../../ui/Btn/Btn";
// Styles
import "./index.scss";

type SwitchType = {
  firstPropertyProps: BtnPropsType & { ref?: ForwardedRef<HTMLButtonElement> };
  secondPropertyProps: BtnPropsType & { ref?: ForwardedRef<HTMLButtonElement> };
  props?: Omit<BtnPropsType, "children">;
};

export default function Switch({ firstPropertyProps, secondPropertyProps, props }: SwitchType) {
  return (
    <div className="switch-wrapper">
      <Btn
        size="big"
        {...props}
        {...firstPropertyProps}
      />

      <Btn
        size="big"
        {...props}
        {...secondPropertyProps}
      />
    </div>
  );
}
