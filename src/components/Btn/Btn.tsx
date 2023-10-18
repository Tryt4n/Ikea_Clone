import { ButtonHTMLAttributes } from "react";
import "./index.scss";

type BtnPropsType = {
  children: string;
  className?: string;
  variant?: "light" | "dark";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Btn({ children, className, variant = "dark", ...props }: BtnPropsType) {
  return (
    <button
      className={`btn btn--${variant}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
