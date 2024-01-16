import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../setup-test/test-utils";
import CollectionNameContainer from "./CollectionNameContainer";
import useWindowSize from "../../../hooks/useWindowSize/useWindowSize";

// Mock the useWindowSize hook
vi.mock("../../../hooks/useWindowSize/useWindowSize");

describe("CollectionNameContainer", () => {
  beforeEach(() => {
    (useWindowSize as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      width: 600,
    });
  });

  it("should render a component properly", () => {
    // Arrange
    const collectionName = "collection";
    const collectionLink = "https://collection.com";

    // Act
    render(
      <CollectionNameContainer
        collectionName={collectionName}
        collectionLink={collectionLink}
      />,
    );

    const collectionNameContainer = screen.getByRole("link");
    const collectionText = screen.getByText(`Kolekcja ${collectionName}`);
    const svg = screen.getByTestId("arrow-right-icon");

    // Assert
    expect(collectionNameContainer).toBeInTheDocument();
    expect(collectionNameContainer).toHaveAttribute("href", collectionLink);

    expect(collectionText).toBeInTheDocument();

    expect(svg).toBeInTheDocument();
  });

  it("should render a component with new tag properly", () => {
    // Act
    render(
      <CollectionNameContainer
        collectionName="collection"
        collectionLink="https://collection.com"
        isNew={true}
      />,
    );

    const newTag = screen.getByText("Nowość");

    // Assert
    expect(newTag).toBeInTheDocument();
  });

  it("should render a component with small icon", () => {
    // Arrange
    (useWindowSize as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      width: 599,
    });

    // Act
    render(
      <CollectionNameContainer
        collectionName="collection"
        collectionLink="https://collection.com"
      />,
    );

    const svg = screen.getByTestId("chevron-right-icon");

    // Assert
    expect(svg).toBeInTheDocument();
  });
});
