// React
import { ButtonHTMLAttributes, ForwardedRef, ReactNode, forwardRef } from "react";
// Types
import type { BtnShapesType, BtnSizesType, BtnVariantsType } from "../../types/btnTypes";
// Style
import "./index.scss";

export type BtnPropsType = {
  children: string | ReactNode;
  className?: string;
  variant?: BtnVariantsType;
  shape?: BtnShapesType;
  size?: BtnSizesType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function InnerBtn(
  { children, className, variant = "dark", shape = "oval", size = "small", ...props }: BtnPropsType,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} btn--${shape}${
        className ? ` ${className}` : ""
      }`}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
}

export const Btn = forwardRef(InnerBtn);
