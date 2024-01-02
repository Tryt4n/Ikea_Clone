// Importing necessary types from React
import type { ReactNode } from "react";
// Importing the components to be used in the Article component
import { Body } from "./components/ArticleBody/Body";
import { Section } from "./components/ArticleSection/Section";
import { ImgContainer } from "./components/ArticleImgContainer/ImgContainer";
import { TextContainer } from "./components/ArticleTextContainer/TextContainer";
import { Header, SubHeader } from "./components/ArticleHeader/Header";
import { Text } from "./components/ArticleText/Text";
import { ContainerBtn } from "./components/ArticleContainerBtn/ContainerBtn";
import { Link } from "./components/ArticleLink/Link";
import { Img } from "./components/ArticleImg/Img";
import { InstagramBadge } from "./components/ArticleInstagramBadge/InstagramBadge";
import { WishListBadge } from "./components/ArticleWishListBadge/WishListBadge";
import { Slide } from "./components/ArticleSlide/Slide";
import { SlideBtn } from "./components/ArticleSlideBtn/SlideBtn";
// Importing styles
import "./index.scss";

/**
 * Article component
 *
 * This component is a container for an article element.
 * It accepts a children prop which should be a ReactNode.
 * It also has several subcomponents, which are the imported components.
 *
 * @param children - The React elements to be rendered inside the Article component.
 *
 * @returns An article element containing the passed React elements.
 */
export default function Article({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}

// Assigning the imported components as subcomponents of the Article component
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
