import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Article from "./Article";

describe("Article", () => {
  it("should render an article with all passed React elements without any additional props", () => {
    // Arrange
    const header = "Article Header";
    const subHeader = "Article Subheader";
    const articleText = "Article Text";
    const articleImgSrc = "image.jpg";
    const articleImgAlt = "Article Image";
    const btnText = "Read More";
    const linkText = "Go to example page";
    const linkHref = "https://www.example.com";
    const slideImgSrc = "slide-image.jpg";
    const slideImgAlt = "Article Slide Image";
    const slideBtnText = "Slide Btn";
    const badgeNick = "ExampleUser123";

    // Act
    render(
      <Article>
        <Article.Header>{header}</Article.Header>
        <Article.SubHeader>{subHeader}</Article.SubHeader>

        <Article.Body>
          <Article.Section>
            <Article.WishListBadge />

            <Article.ImgContainer>
              <Article.Img src={articleImgSrc} alt={articleImgAlt} />
            </Article.ImgContainer>

            <Article.TextContainer>
              <Article.Text>{articleText}</Article.Text>
            </Article.TextContainer>
          </Article.Section>

          <Article.Btn>{btnText}</Article.Btn>

          <Article.Link href={linkHref}>{linkText}</Article.Link>
        </Article.Body>

        <Article.Body>
          <Article.Slide>
            <Article.ImgContainer>
              <Article.Img src={slideImgSrc} alt={slideImgAlt} />
              <Article.InstagramBadge>{badgeNick}</Article.InstagramBadge>
            </Article.ImgContainer>
          </Article.Slide>
          <Article.SlideBtn>{slideBtnText}</Article.SlideBtn>
        </Article.Body>
      </Article>,
    );

    const articleElement = screen.getByRole("article");
    const headerElement = screen.getByRole("heading", { level: 2 });
    const subHeaderElement = screen.getByText(subHeader);
    const sectionElement = screen.getByTestId("article-section");
    const bodyElement = sectionElement.parentElement;
    const wishlistBadge = screen.getByTestId("article-wishlist-badge");
    const imgElement = screen.getByRole("img", { name: articleImgAlt });
    const imgContainer = imgElement.parentElement;
    const text = screen.getByText(articleText);
    const textContainer = text.parentElement;
    const btnElement = screen.getByText(btnText);
    const linkElement = screen.getByText(linkText);
    const articleSlide = screen.getByTestId("article-slide");
    const articleSlideBtn = screen.getByText(slideBtnText);
    const badgeElement = screen.getByLabelText("Użytkownik Instagram");
    const nicknameWrapper = screen.getByTestId("article-instagram-nickname");

    // Assert
    expect(articleElement).toBeInTheDocument();

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent(header);

    expect(subHeaderElement).toBeInTheDocument();

    expect(bodyElement).toBeInTheDocument();

    expect(sectionElement).toBeInTheDocument();

    expect(wishlistBadge).toBeInTheDocument();

    expect(imgContainer).toBeInTheDocument();

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", articleImgSrc);
    expect(imgElement).toHaveAttribute("alt", articleImgAlt);
    expect(imgElement).toHaveClass("aspect-ratio-16-9");

    expect(textContainer).toBeInTheDocument();

    expect(text).toBeInTheDocument();

    expect(btnElement).toBeInTheDocument();
    expect(btnElement).toHaveClass("btn--dark");
    expect(btnElement).toHaveClass("btn--small");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", linkHref);

    expect(articleSlide).toBeInTheDocument();

    expect(articleSlideBtn).toBeInTheDocument();
    expect(articleSlideBtn).toHaveAttribute("aria-hidden", "true");
    expect(articleSlideBtn).toHaveAttribute("tabIndex", "-1");

    expect(badgeElement).toBeInTheDocument();
    expect(nicknameWrapper).not.toHaveClass(
      "article__instagram-nickname--hide",
    );
  });

  it("should render an article with all passed React elements with all possible additional props", () => {
    // Arrange
    const header = "Article Header";
    const articleText = "Article Text";
    const articleImgSrc = "image.jpg";
    const articleImgAlt = "Article Image";
    const btnText = "Read More";
    const slideImgSrc = "slide-image.jpg";
    const slideImgAlt = "Article Slide Image";
    const slideBtnText = "Slide Btn";
    const badgeNick = "ExampleUser123";

    const headerLevel = 3;
    const headerAdditionalClass = "header-class";
    const bodyAdditionalClass = "body-class";
    const sectionAdditionalClass = "section-class";
    const imgContainerAdditionalClass = "img-container-class";
    const articleBtnADditionalClass = "article-btn-class";
    const slideAdditionalClass = "slide-class";

    // Act
    render(
      <Article>
        <Article.Header headingLevel={3} className={headerAdditionalClass}>
          {header}
        </Article.Header>

        <Article.Body className={bodyAdditionalClass}>
          <Article.Section className={sectionAdditionalClass}>
            <Article.ImgContainer className={imgContainerAdditionalClass}>
              <Article.Img
                src={articleImgSrc}
                alt={articleImgAlt}
                aspectRatio="3/4"
                aspectRatioMobile="1/1"
              />
            </Article.ImgContainer>

            <Article.TextContainer variant="red">
              <Article.Text>{articleText}</Article.Text>
            </Article.TextContainer>
          </Article.Section>

          <Article.Btn
            variant="light"
            size="big"
            className={articleBtnADditionalClass}
          >
            {btnText}
          </Article.Btn>
        </Article.Body>

        <Article.Body>
          <Article.Slide variant="red" className={slideAdditionalClass}>
            <Article.ImgContainer>
              <Article.Img
                src={slideImgSrc}
                alt={slideImgAlt}
                aspectRatio="3/4"
              />
              <Article.InstagramBadge nickVisible={false}>
                {badgeNick}
              </Article.InstagramBadge>
            </Article.ImgContainer>
          </Article.Slide>
          <Article.SlideBtn>{slideBtnText}</Article.SlideBtn>
        </Article.Body>
      </Article>,
    );

    const articleElement = screen.getByRole("article");
    const headerElement = screen.getByRole("heading", { level: headerLevel });
    const sectionElement = screen.getByTestId("article-section");
    const bodyElement = sectionElement.parentElement;
    const imgElement = screen.getByRole("img", { name: articleImgAlt });
    const imgContainer = imgElement.parentElement;
    const text = screen.getByText(articleText);
    const textContainer = text.parentElement;
    const btnElement = screen.getByText(btnText);
    const articleSlide = screen.getByTestId("article-slide");
    const articleSlideBtn = screen.getByText(slideBtnText);
    const articleSlideImg = screen.getByRole("img", { name: slideImgAlt });
    const badgeElement = screen.getByLabelText("Użytkownik Instagram");
    const nicknameWrapper = screen.getByTestId("article-instagram-nickname");

    // Assert
    expect(articleElement).toBeInTheDocument();

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent(header);
    expect(headerElement).toHaveClass(headerAdditionalClass);

    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toHaveClass(bodyAdditionalClass);

    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveClass(sectionAdditionalClass);

    expect(imgContainer).toBeInTheDocument();
    expect(imgContainer).toHaveClass(imgContainerAdditionalClass);

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", articleImgSrc);
    expect(imgElement).toHaveAttribute("alt", articleImgAlt);
    expect(imgElement).toHaveClass("aspect-ratio-3-4");
    expect(imgElement).toHaveClass("mobile-aspect-ratio-1-1");

    expect(textContainer).toBeInTheDocument();
    expect(textContainer).toHaveClass("bg-red");

    expect(text).toBeInTheDocument();

    expect(btnElement).toBeInTheDocument();
    expect(btnElement).toHaveClass("btn--light");
    expect(btnElement).toHaveClass("btn--big");
    expect(btnElement).toHaveClass(articleBtnADditionalClass);

    expect(articleSlide).toBeInTheDocument();
    expect(articleSlide).toHaveClass("bg-red");
    expect(articleSlide).toHaveClass(slideAdditionalClass);

    expect(articleSlideBtn).toBeInTheDocument();
    expect(articleSlideBtn).toHaveAttribute("aria-hidden", "true");
    expect(articleSlideBtn).toHaveAttribute("tabIndex", "-1");

    expect(articleSlideImg).toBeInTheDocument();
    expect(articleSlideImg).toHaveAttribute("src", slideImgSrc);
    expect(articleSlideImg).toHaveAttribute("alt", slideImgAlt);
    expect(articleSlideImg).toHaveClass("aspect-ratio-3-4");

    expect(badgeElement).toBeInTheDocument();
    expect(nicknameWrapper).toHaveClass("article__instagram-nickname--hide");
  });
});
