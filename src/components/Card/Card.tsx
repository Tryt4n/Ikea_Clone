// React
import { HTMLProps, ReactNode } from "react";
// Components
import Btn, { BtnPropsType } from "../Btn/Btn";
// Icons
import ArrowRightIcon from "../../Icons/ArrowRightIcon";
// Style
import "./index.scss";

type CardPropsType<T> = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "link";
  variant?: "blue" | "brown" | "light-brown" | "violet" | "yellow" | "light-yellow";
} & (T extends "div"
  ? HTMLProps<HTMLDivElement>
  : T extends "a"
  ? HTMLProps<HTMLAnchorElement>
  : never);

type ImgPropsType = HTMLProps<HTMLImageElement>;

type TextContainerPropsType = {
  children: ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;

type HeadingPropsType = HTMLProps<HTMLHeadingElement>;

type TextPropsType = HTMLProps<HTMLParagraphElement>;

type CardBtnPropsType = Omit<BtnPropsType, "children" | "shape">;

export default function Card<T extends "div" | "a">({
  children,
  as = "div",
  variant = "blue",
  className,
  ...props
}: CardPropsType<T>) {
  const Element = as === "div" ? "div" : "a";

  return (
    <Element
      {...(props as React.HTMLProps<HTMLDivElement> & React.HTMLProps<HTMLAnchorElement>)}
      className={`card card--${variant}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Element>
  );
}

function CardImg(props: ImgPropsType) {
  return (
    <img
      {...props}
      loading="lazy"
    />
  );
}

function TextContainer({ children, className }: TextContainerPropsType) {
  return <div className={`card__text-wrapper${className ? ` ${className}` : ""}`}>{children}</div>;
}

function Heading({ children }: HeadingPropsType) {
  return <h3>{children}</h3>;
}

function Text({ children }: TextPropsType) {
  return <p>{children}</p>;
}

function CardBtn(props: CardBtnPropsType) {
  return (
    <Btn
      variant="light"
      shape="circle"
      {...props}
      aria-hidden="true"
      tabIndex={-1}
      className="card__btn"
    >
      <ArrowRightIcon />
    </Btn>
  );
}

Card.Img = CardImg;
Card.TextContainer = TextContainer;
Card.Heading = Heading;
Card.Text = Text;
Card.Btn = CardBtn;
