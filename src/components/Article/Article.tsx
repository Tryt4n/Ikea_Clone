// React
import { HTMLProps, ReactNode, createElement } from "react";
// Components
import Btn, { BtnPropsType } from "../Btn/Btn";
// Style
import "./index.scss";

type BodyPropsType = {
  children: ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;

type ImgContainerPropsType = BodyPropsType;

type SectionPropsType = BodyPropsType;

interface SlidePropsType extends BodyPropsType {
  variant?: "normal" | "accent";
}

type TextContainerPropsType = {
  children: ReactNode;
  variant?: "accent";
};

type CardBtnPropsType = {
  children: string;
  className?: string;
  variant?: "light" | "dark";
} & HTMLProps<HTMLAnchorElement>;

type HeaderPropsType = {
  children: string;
  headingLevel?: number;
  className?: string;
} & HTMLProps<HTMLHeadingElement>;

type LinkPropsType = {
  children?: ReactNode;
} & HTMLProps<HTMLAnchorElement>;

export default function Article({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}

function Body({ children, className }: BodyPropsType) {
  return <div className={`article${className ? ` ${className}` : ""}`}>{children}</div>;
}

function Section({ children, className }: SectionPropsType) {
  return (
    <section className={`article__section${className ? ` ${className}` : ""}`}>{children}</section>
  );
}

function ImgContainer({ children, className }: ImgContainerPropsType) {
  return (
    <div className={`article__img-container${className ? ` ${className}` : ""}`}>{children}</div>
  );
}

function TextContainer({ children, variant }: TextContainerPropsType) {
  return (
    <div
      className={`article__text-container${
        variant === "accent" ? ` article__text-container--accent` : ""
      }`}
    >
      {children}
    </div>
  );
}

function Header({ children, className, headingLevel, ...props }: HeaderPropsType) {
  const Element = headingLevel ? `h${headingLevel}` : "h2";
  return createElement(
    Element,
    { ...props, className: `article__heading${className ? ` ${className}` : ""}` },
    children
  );
}

function Text({ children }: { children: ReactNode } & HTMLProps<HTMLParagraphElement>) {
  return <p className="article__text">{children}</p>;
}

function ContainerBtn({ children, className, variant = "dark", ...props }: CardBtnPropsType) {
  return (
    <a
      {...props}
      className={`btn btn--${variant} btn--oval${className ? ` ${className}` : ""}`}
    >
      {children}
    </a>
  );
}

function Link({ children = "Dowiedz się więcej", ...props }: LinkPropsType) {
  return <a {...props}>{children}</a>;
}

function Slide({ children, variant, className }: SlidePropsType) {
  return (
    <div
      className={`article__slide${variant ? ` article__slide--${variant}` : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}

function Img(props: HTMLProps<HTMLImageElement>) {
  return (
    <img
      {...props}
      loading="lazy"
    />
  );
}

function SlideBtn(props: BtnPropsType) {
  return (
    <Btn
      {...props}
      className="article__slide-btn"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

Article.Header = Header;
Article.Body = Body;
Article.Section = Section;

Article.ImgContainer = ImgContainer;
Article.TextContainer = TextContainer;
Article.Text = Text;
Article.Btn = ContainerBtn;
Article.Link = Link;
Article.Img = Img;

Article.Slide = Slide;
Article.SlideBtn = SlideBtn;
