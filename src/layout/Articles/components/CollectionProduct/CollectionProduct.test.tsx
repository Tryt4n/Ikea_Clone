import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import CollectionProduct from "./CollectionProduct";
import type { ReactNode } from "react";
import { exampleProducts } from "../../../../setup-test/test-constants/exampleProducts";
import Collection from "../../../../compoundComponents/CollectionProducts/layout/Collection";
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";

// Mock the useWindowSize hook
vi.mock("../../../../hooks/useWindowSize/useWindowSize");

describe("CollectionProduct", () => {
  beforeEach(() => {
    (useWindowSize as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      width: 600,
    });
  });

  const collectionWrapper = (children: ReactNode) => (
    <Collection children={children} />
  );

  it("should render a product with proper elements based on the product data", () => {
    // Arrange
    const product = exampleProducts[2];

    // Act
    render(collectionWrapper(<CollectionProduct product={product} />));

    const collectionListItem = screen.getByRole("listitem");
    const accessibilityText = screen.getByText(/idź na stronę produktu/i);
    const collectionListItemButton = screen.getByRole("button");
    const collectionListItemTooltip = screen.getByRole("tooltip", {
      hidden: true,
    });
    const collectionListItemTooltipLink = screen.getByRole("link", {
      hidden: true,
    });
    const collectionListItemTooltipHeader = screen.getByRole("heading", {
      level: 3,
      hidden: true,
    });
    const collectionListItemTooltipSubHeading = screen.getByText(
      product.productSubHeading,
    );
    const collectionListItemTooltipPrice =
      screen.getByTestId("collection-price");

    // Assert
    expect(collectionListItem).toBeInTheDocument();

    expect(accessibilityText).toBeInTheDocument();
    expect(accessibilityText).toHaveClass("visually-hidden");

    expect(collectionListItemButton).toBeInTheDocument();
    expect(collectionListItemButton).toHaveAttribute(
      "aria-controls",
      product.id,
    );
    expect(collectionListItemButton).toHaveAttribute(
      "aria-labelledby",
      product.id,
    );
    expect(collectionListItemButton).toHaveTextContent(
      "Pokaż informacje o produkcie",
    );

    expect(collectionListItemTooltip).toBeInTheDocument();
    expect(collectionListItemTooltip).toHaveAttribute("id", product.id);
    expect(collectionListItemTooltip).toHaveAttribute("aria-hidden", "true");

    expect(collectionListItemTooltipLink).toBeInTheDocument();
    expect(collectionListItemTooltipLink).toHaveAttribute("tabindex", "-1");

    if (product.newTag) {
      expect(screen.getByText(/nowość/i)).toBeInTheDocument();
    }

    if (product.topSellerTag) {
      expect(screen.getByText(/top seller/i)).toBeInTheDocument();
    }

    if (product.newPriceTag) {
      expect(screen.getByText(/nowa niższa cena/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Najniższa cena z 30 dni przed obniżką/),
      ).toBeInTheDocument();
    }

    expect(collectionListItemTooltipHeader).toBeInTheDocument();
    expect(collectionListItemTooltipHeader).toHaveTextContent(
      product.productHeading,
    );

    expect(collectionListItemTooltipSubHeading).toBeInTheDocument();

    expect(collectionListItemTooltipPrice).toBeInTheDocument();
  });

  it("should render a product with proper placement styles for screens bigger than mobile breakpoint (600px)", () => {
    // Arrange
    const product = exampleProducts[3];

    // Act
    render(collectionWrapper(<CollectionProduct product={product} />));

    const collectionListItem = screen.getByRole("listitem");

    // Assert
    expect(collectionListItem).toBeInTheDocument();
    if (product.placement.top !== "auto") {
      expect(collectionListItem).toHaveStyle(`top: ${product.placement.top}`);
    }
    if (product.placement.right !== "auto") {
      expect(collectionListItem).toHaveStyle(
        `right: ${product.placement.right}`,
      );
    }
    if (product.placement.bottom !== "auto") {
      expect(collectionListItem).toHaveStyle(
        `bottom: ${product.placement.bottom}`,
      );
    }
    if (product.placement.left !== "auto") {
      expect(collectionListItem).toHaveStyle(`left: ${product.placement.left}`);
    }
  });

  it("should render a product with proper placement styles for screens smaller than mobile breakpoint (600px)", () => {
    // Arrange
    (useWindowSize as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      width: 599,
    });
    const product = exampleProducts[3];

    // Act
    render(collectionWrapper(<CollectionProduct product={product} />));

    const collectionListItem = screen.getByRole("listitem");

    // Assert
    expect(collectionListItem).toBeInTheDocument();
    if (product.placement.topMobile !== "auto") {
      expect(collectionListItem).toHaveStyle(
        `top: ${product.placement.topMobile}`,
      );
    }
    if (product.placement.rightMobile !== "auto") {
      expect(collectionListItem).toHaveStyle(
        `right: ${product.placement.rightMobile}`,
      );
    }
    if (product.placement.bottomMobile !== "auto") {
      expect(collectionListItem).toHaveStyle(
        `bottom: ${product.placement.bottomMobile}`,
      );
    }
    if (product.placement.leftMobile !== "auto") {
      expect(collectionListItem).toHaveStyle(
        `left: ${product.placement.leftMobile}`,
      );
    }
  });
});
