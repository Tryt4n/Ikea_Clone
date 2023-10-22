// React
import { HTMLProps, ReactNode } from "react";
// Components
import Btn, { BtnPropsType } from "../Btn/Btn";
// Icons
import ArrowRightIcon from "../../Icons/ArrowRightIcon";
// Style
import "./index.scss";

type CardPropsType = {
  children: ReactNode;
  className?: string;
};

type ImgPropsType = HTMLProps<HTMLImageElement>;

type TextContainerPropsType = CardPropsType & HTMLProps<HTMLDivElement>;

type HeadingPropsType = HTMLProps<HTMLHeadingElement>;

type TextPropsType = HTMLProps<HTMLParagraphElement>;

type CardBtnPropsType = Omit<BtnPropsType, "children" | "shape">;

export default function Card({ children, className }: CardPropsType) {
  return <div className={`card${className ? ` ${className}` : ""}`}>{children}</div>;
}

function CardImg(props: ImgPropsType) {
  return <img {...props} />;
}

function TextContainer({ children, className }: TextContainerPropsType) {
  return <div className={`card-text-wrapper${className ? ` ${className}` : ""}`}>{children}</div>;
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
      className="card-btn"
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
