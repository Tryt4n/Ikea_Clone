import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

describe("ListProductHeader", () => {
  it("should render a component", () => {
    // Act
    render(
      <Header
        collection="collection"
        productLink="product-link.com"
        imgMain="img-main.com"
        imgHover="img-hover.com"
        imgAlt="img-alt"
        newTag={{ variant: "blue" }}
        oldPrice={{ variant: "blue", integer: 100 }}
      />,
    );

    // Assert
    expect(screen.getByRole("link")).toBeInTheDocument();

    expect(screen.getByText(/nowość/i)).toBeInTheDocument();

    expect(screen.getByText(/nowa niższa cena/i)).toBeInTheDocument();
  });

  it("should change the image on hover", async () => {
    // Arrange
    const imgMainSrc = "img-main.com";
    const imgHoverSrc = "img-hover.com";

    const user = userEvent.setup();

    // Act
    render(
      <Header
        collection="collection"
        productLink="product-link.com"
        imgMain={imgMainSrc}
        imgHover={imgHoverSrc}
        imgAlt="img-alt"
        newTag={{ variant: "blue" }}
        oldPrice={{ variant: "blue", integer: 100 }}
      />,
    );

    const imageContainer = screen.getByTestId("list-product-image-container");
    const image = screen.getByRole("img");

    // Assert
    expect(image).toHaveAttribute("src", imgMainSrc);

    // Act - hover the image
    await user.hover(imageContainer);

    // Assert - the image should change
    expect(image).toHaveAttribute("src", imgHoverSrc);

    // Act - unhover the image
    await user.unhover(imageContainer);

    // Assert - the image should change back
    expect(image).toHaveAttribute("src", imgMainSrc);
  });

  it("should not change the image on hover if the imgHover prop does not exist", async () => {
    // Arrange
    const imgMainSrc = "img-main.com";

    const user = userEvent.setup();

    // Act
    render(
      // @ts-expect-error - imgHover prop is missing
      <Header
        collection="collection"
        productLink="product-link.com"
        imgMain={imgMainSrc}
        imgAlt="img-alt"
        newTag={{ variant: "blue" }}
        oldPrice={{ variant: "blue", integer: 100 }}
      />,
    );

    const imageContainer = screen.getByTestId("list-product-image-container");
    const image = screen.getByRole("img");

    // Assert
    expect(image).toHaveAttribute("src", imgMainSrc);

    // Act - hover the image
    await user.hover(imageContainer);

    // Assert - the image should not change
    expect(image).toHaveAttribute("src", imgMainSrc);
  });
});
