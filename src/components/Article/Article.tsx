// React
import { HTMLProps, ReactNode } from "react";
// Components
import Btn from "../Btn/Btn";
// Style
import "./index.scss";

type BodyPropsType = {
  children: ReactNode;
  className?: string;
};

type ImgContainerPropsType = BodyPropsType;

type TextContainerPropsType = {
  children: ReactNode;
  variant?: "accent";
};

type HeaderPropsType = {
  children: string;
  className?: string;
} & HTMLProps<HTMLHeadingElement>;

type ContainerBtnPropsType = {
  children: string;
  type?: "button" | "submit" | "reset";
  variant?: "light" | "dark";
} & HTMLProps<HTMLButtonElement>;

export default function Article({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}

function Body({ children, className }: BodyPropsType) {
  return <div className={`article${className ? ` ${className}` : ""}`}>{children}</div>;
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

function Header({ children, className }: HeaderPropsType) {
  return <h3 className={`article__heading${className ? ` ${className}` : ""}`}>{children}</h3>;
}

function Text({ children }: { children: ReactNode } & HTMLProps<HTMLParagraphElement>) {
  return <p className="article__text">{children}</p>;
}

function ContainerBtn({ children, variant = "light", ...props }: ContainerBtnPropsType) {
  const { type, ...rest } = props;

  return (
    <Btn
      variant={variant}
      type={type}
      {...rest}
    >
      {children}
    </Btn>
  );
}

Article.Header = Header;
Article.Body = Body;

Article.ImgContainer = ImgContainer;
Article.TextContainer = TextContainer;
Article.Text = Text;
Article.Btn = ContainerBtn;
