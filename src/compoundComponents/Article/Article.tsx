// React
import { HTMLProps, ReactNode, createElement } from "react";
// Components
import Btn, { BtnPropsType } from "../../components/Btn/Btn";
import AddToWishListBtn from "../../components/AddToWishListBtn/AddToWishListBtn";
// Icons
import InstagramIcon from "../../Icons/InstagramIcon";
// Types
import { ArticleBtnVariantsType, AspectRatioType } from "../../types/articleTypes";
import { BackgroundVariants } from "../../types/colorsVariantsType";
// Style
import "./index.scss";

type BodyPropsType = {
  children: ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;

type SectionPropsType = BodyPropsType;

type ImgContainerPropsType = BodyPropsType;

type TextContainerPropsType = {
  children: ReactNode;
  variant?: BackgroundVariants;
};

type HeaderPropsType = {
  children: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
} & HTMLProps<HTMLHeadingElement>;

type ContainerBtnPropsType = {
  children: string;
  className?: string;
  variant?: ArticleBtnVariantsType;
} & HTMLProps<HTMLAnchorElement>;

type LinkPropsType = {
  children?: ReactNode;
} & HTMLProps<HTMLAnchorElement>;

type ImgPropsType = {
  aspectRatio?: AspectRatioType;
  aspectRatioMobile?: AspectRatioType;
} & HTMLProps<HTMLImageElement>;

type InstagramBadgeType = {
  children: string;
  nickVisible?: boolean;
};

interface SlidePropsType extends BodyPropsType {
  variant?: BackgroundVariants;
}

export default function Article({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}

function Body({ children, className }: BodyPropsType) {
  return <div className={`article${className ? ` ${className}` : ""}`}>{children}</div>;
}

function Section({ children, className, ...props }: SectionPropsType) {
  return (
    <section
      className={`article__section${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </section>
  );
}

function ImgContainer({ children, className, ...props }: ImgContainerPropsType) {
  return (
    <div
      className={`article__img-container${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

function TextContainer({ children, variant }: TextContainerPropsType) {
  return (
    <div className={`article__text-container${variant ? ` bg-${variant}` : ""}`}>{children}</div>
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

function Text({ children }: { children: ReactNode }) {
  return <p className="article__text">{children}</p>;
}

function ContainerBtn({ children, className, variant = "dark", ...props }: ContainerBtnPropsType) {
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

function InstagramBadge({ children, nickVisible = true }: InstagramBadgeType) {
  return (
    <div
      className="article__instagram-badge"
      aria-label="Użytkownik Instagram"
    >
      <InstagramIcon />
      <div
        className={`article__instagram-nickname${
          !nickVisible ? ` article__instagram-nickname--hide` : ""
        }`}
      >
        <span>{children}</span>
      </div>
    </div>
  );
}

function WishListBadge() {
  return (
    <AddToWishListBtn
      className="article__wishlist-badge"
      variant="dark-opaque"
    />
  );
}

function Slide({ children, variant, className, ...props }: SlidePropsType) {
  return (
    <div
      className={`article__slide${variant ? ` bg-${variant}` : ""}${
        className ? ` ${className}` : ""
      }`}
      {...props}
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
Article.InstagramBadge = InstagramBadge;
Article.WishListBadge = WishListBadge;

Article.Slide = Slide;
Article.SlideBtn = SlideBtn;