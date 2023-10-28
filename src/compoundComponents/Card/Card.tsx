// React
import { HTMLProps, ReactNode } from "react";
// Components
import Btn, { BtnPropsType } from "../../components/Btn/Btn";
// Types
import { CardHTMLElementsType } from "../../types/cardTypes";
// Icons
import ArrowRightIcon from "../../Icons/ArrowRightIcon";
// Style
import "./index.scss";
import { BackgroundVariants } from "../../types/colorsVariantsType";

type CardPropsType<T> = {
  children: React.ReactNode;
  className?: string;
  as?: CardHTMLElementsType;
  variant?: BackgroundVariants;
} & (T extends "div"
  ? HTMLProps<HTMLDivElement>
  : T extends "a"
  ? HTMLProps<HTMLAnchorElement>
  : T extends "section"
  ? HTMLProps<HTMLElement>
  : never);

type ImgPropsType = {
  aspectRatio?: "1/1" | "3/4";
} & HTMLProps<HTMLImageElement>;

type TextContainerPropsType = {
  children: ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;

type HeadingPropsType = {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
} & HTMLProps<HTMLHeadingElement>;

type TextPropsType = HTMLProps<HTMLParagraphElement>;

type CardBtnPropsType = Omit<BtnPropsType, "children" | "shape">;

export default function Card<T extends "div" | "a">({
  children,
  as = "div",
  variant,
  className,
  ...props
}: CardPropsType<T>) {
  const Element = as === "div" ? "div" : as === "link" ? "a" : "section";

  return (
    <Element
      {...(props as React.HTMLProps<HTMLDivElement> & React.HTMLProps<HTMLAnchorElement>)}
      className={`card bg-${variant}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Element>
  );
}

function CardImg({ aspectRatio = "1/1", ...props }: ImgPropsType) {
  return (
    <img
      {...props}
      className={aspectRatio === "3/4" ? "aspect-ratio-3-4" : undefined}
      loading="lazy"
    />
  );
}

function TextContainer({ children, className }: TextContainerPropsType) {
  return <div className={`card__text-wrapper${className ? ` ${className}` : ""}`}>{children}</div>;
}

function Heading({ children, headingLevel, ...props }: HeadingPropsType) {
  const Element = headingLevel ? `h${headingLevel}` : "h2";

  return <Element {...props}>{children}</Element>;
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
