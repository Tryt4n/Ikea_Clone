import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import CarouselSliderArticle, {
  type CarouselSliderArticleType,
} from "./CarouselSliderArticle";
import { exampleSlides } from "../../../../setup-test/test-constants/exampleSlides";

describe("CarouselSliderArticle", () => {
  it("should properly render component", () => {
    // Arrange
    const article: CarouselSliderArticleType = {
      id: "1",
      // header: "article header",
      swiperConfig: {
        numberOfInitialSlides: 1,
        spaceBetweenSlides: 20,
        breakpoints: {
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        },
      },
      imgSizes: "500px",
      slides: exampleSlides,
    };

    // Act
    render(<CarouselSliderArticle article={article} />);

    const slideHeaders = screen.getAllByRole("heading", { level: 2 });
    const slideLinks = screen.getAllByRole("link");

    // Assert
    expect(article.slides.length).toBe(exampleSlides.length);
    expect(slideHeaders).toHaveLength(
      article.slides.filter((slide) => slide.heading).length,
    );

    article.slides.forEach((slide, index) => {
      if (!slide.linkStyles) {
        expect(slideLinks[index]).not.toHaveClass();
      }

      if (slide.img) {
        expect(
          screen.getByRole("img", { name: slide.img.imgAlt }),
        ).toBeInTheDocument();
      }

      if (slide.btn.icon && !slide.btn.text) {
        expect(document.querySelector("svg")).toBeInTheDocument();
      }
    });
  });

  it("should render article header if provided", () => {
    // Arrange
    const article: CarouselSliderArticleType = {
      id: "1",
      header: "article header",
      swiperConfig: {
        numberOfInitialSlides: 1,
        spaceBetweenSlides: 20,
        breakpoints: {
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        },
      },
      imgSizes: "500px",
      slides: exampleSlides,
    };

    // Act
    render(<CarouselSliderArticle article={article} />);

    const articleHeader = screen.getByRole("heading", { level: 2 });
    const slideHeaders = screen.getAllByRole("heading", { level: 3 });

    // Assert
    expect(articleHeader).toBeInTheDocument();
    expect(articleHeader).toHaveTextContent(article.header!);

    slideHeaders.forEach((slideHeader) =>
      expect(slideHeader).toBeInTheDocument(),
    );
  });
});
