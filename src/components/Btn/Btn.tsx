// React
import { ButtonHTMLAttributes, ReactNode } from "react";
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

export default function Btn({
  children,
  className,
  variant = "dark",
  shape = "oval",
  size = "small",
  ...props
}: BtnPropsType) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} btn--${shape}${
        className ? ` ${className}` : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
