import { HTMLProps } from "react";
import "./index.scss";

type BtnPropsType = {
  text: string;
  className?: string;
  variant?: "light" | "dark";
} & HTMLProps<HTMLButtonElement>;

export default function Btn({ text, className, variant = "dark" }: BtnPropsType) {
  return (
    <button className={`btn btn--${variant}${className ? ` ${className}` : ""}`}>{text}</button>
  );
}
