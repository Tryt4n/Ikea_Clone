// React
import { ButtonHTMLAttributes, ReactNode } from "react";
// Types
import { BtnShapesType, BtnVariantsType } from "../../types/btnTypes";
// Style
import "./index.scss";

export type BtnPropsType = {
  children: string | ReactNode;
  className?: string;
  variant?: BtnVariantsType;
  shape?: BtnShapesType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Btn({
  children,
  className,
  variant = "dark",
  shape = "oval",
  ...props
}: BtnPropsType) {
  return (
    <button
      className={`btn btn--${variant} btn--${shape}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
