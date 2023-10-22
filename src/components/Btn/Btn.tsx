import { ButtonHTMLAttributes, ReactElement } from "react";
import "./index.scss";

export type BtnPropsType = {
  children: string | ReactElement;
  className?: string;
  variant?: "light" | "dark";
  shape?: "oval" | "circle";
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
