// React
import { CSSProperties, HTMLProps, ReactNode, createElement } from "react";
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

type CollectionListPropsType = {
  children: ReactNode;
} & HTMLProps<HTMLUListElement>;

type CollectionListItemPropsType = {
  children: ReactNode;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
} & HTMLProps<HTMLLIElement>;

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

function SubHeader({ children }: { children: string }) {
  return <p className="article__subheading">{children}</p>;
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

type ImgPropsType = {
  aspectRatio?: "1/1" | "3/4" | "16/9";
  aspectRatioMobile?: "1/1" | "3/4" | "16/9";
} & HTMLProps<HTMLImageElement>;

function Img({ aspectRatio = "16/9", aspectRatioMobile, ...props }: ImgPropsType) {
  const formattedAspectRatio = aspectRatio.replace("/", "-");
  const formattedAspectRatioMobile = aspectRatioMobile ? aspectRatioMobile.replace("/", "-") : "";
  const imgClassNames = `aspect-ratio-${formattedAspectRatio}${
    formattedAspectRatioMobile ? ` mobile-aspect-ratio-${formattedAspectRatioMobile}` : ""
  }`;

  return (
    <img
      {...props}
      loading="lazy"
      className={imgClassNames}
    />
  );
}

function CollectionList({ children }: CollectionListPropsType) {
  return <ul className="article__collection-list">{children}</ul>;
}

function CollectionListItem({ children, top, bottom, left, right }: CollectionListItemPropsType) {
  const style: CSSProperties = {
    top: top ? top : "auto",
    bottom: bottom ? bottom : "auto",
    left: left ? left : "auto",
    right: right ? right : "auto",
  };

  return (
    <li
      style={style}
      className=""
    >
      {children}
    </li>
  );
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
Article.SubHeader = SubHeader;
Article.Body = Body;
Article.Section = Section;

Article.ImgContainer = ImgContainer;
Article.TextContainer = TextContainer;
Article.Text = Text;
Article.Btn = ContainerBtn;
Article.Link = Link;
Article.Img = Img;
Article.CollectionList = CollectionList;
Article.CollectionListItem = CollectionListItem;

Article.Slide = Slide;
Article.SlideBtn = SlideBtn;
