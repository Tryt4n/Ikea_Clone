import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import ImageGallery from "./ImageGallery";
import { cardCollection as data } from "../../../setup-test/test-constants/cardCollection";

describe("ImageGallery", () => {
  it("should render a component", () => {
    // Act
    render(<ImageGallery data={[]} />);
    const imagesGallery = screen.getByTestId("images-gallery");

    // Assert
    expect(imagesGallery).toBeInTheDocument();
    expect(imagesGallery).toHaveClass("images-gallery");
  });

  it('should render a images container"', () => {
    // Act
    render(<ImageGallery data={[]} />);
    const container = screen.getByTestId("images-gallery-container");

    // Assert
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("images-gallery__container");
  });

  it("should render ImageCardCollection maximum 6 components or less depending on data length prop passed to component", () => {
    // Act
    render(<ImageGallery data={data} />);
    const container = screen.getByTestId("images-gallery-container");

    // Assert
    expect(container).toBeInTheDocument();
    expect(container.children.length).toBe(6);
  });

  it("should render a disabled button when passed data length is less then 6", () => {
    // Arrange
    const shortenData = data.slice(0, 5);

    // Act
    render(<ImageGallery data={shortenData} />);
    const buttonElement = screen.getByText(/Pokaż 6 kolejnych inspiracji/);

    // Assert
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });

  it("should render a button for showing more images if there are more than 6 of them", () => {
    // Act
    render(<ImageGallery data={data} />);
    const buttonElement = screen.getByText(/Pokaż 6 kolejnych inspiracji/);

    // Assert
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });

  it("should show more images when button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ImageGallery data={data} />);
    const container = screen.getByTestId("images-gallery-container");
    const buttonElement = screen.getByText(/Pokaż 6 kolejnych inspiracji/);

    await user.click(buttonElement);

    // Assert
    expect(container).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(container.children.length).toBe(data.length);
  });

  it("should change button status to disabled when all images are shown", async () => {
    // Arrange
    const user = userEvent.setup();
    const imagesPerClick = 6;
    const clickTimes = Math.ceil(data.length / imagesPerClick);

    // Act
    render(<ImageGallery data={data} />);
    const buttonElement = screen.getByText(/Pokaż 6 kolejnych inspiracji/);

    for (let i = 0; i < clickTimes; i++) {
      await user.click(buttonElement);
    }

    // Assert
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });
});
