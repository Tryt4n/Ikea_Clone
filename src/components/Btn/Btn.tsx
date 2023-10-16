import { HTMLProps } from "react";
import "./index.scss";

type BtnPropsType = {
  text: string;
  className?: string;
};

type BtnType = HTMLProps<HTMLButtonElement> & BtnPropsType;

export default function Btn({ text, className }: BtnType) {
  return <button className={`btn${className ? ` ${className}` : ""}`}>{text}</button>;
}
