import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import useApp from "../../hooks/useApp/useApp";
import useModal from "../../hooks/useModal/useModal";
import { Modal } from "./Modal";
import { AppContextProvider } from "../../context/AppContext/AppContext";
import { initState } from "../../context/AppContext/constants/appInitState";
import { shoppingCart } from "../../setup-test/test-constants/shoppingCart";
import { exampleFetchedProductData } from "../../setup-test/test-constants/exampleFetchedProductData";
import { cardCollection } from "../../setup-test/test-constants/cardCollection";

vi.mock("../../hooks/useApp/useApp");
vi.mock("../../hooks/useModal/useModal");

describe("Modal", () => {
  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: initState,
    });
  });

  const renderWithAppContextProvider = (children: React.ReactNode) => {
    render(<AppContextProvider>{children}</AppContextProvider>);
  };

  describe("Side Modal", () => {
    it(`should render modal for "choose-color" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "choose-color" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Wybierz kolor",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "choose-size" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "choose-size" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Wybierz rozmiar",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "product-information" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "product-information" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Informacje o produkcie",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "items-included" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "items-included" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Elementy w zestawie",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "dimensions" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "dimensions" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Wymiary",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "ratings" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "ratings" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Opinie",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "installment-purchase" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "installment-purchase" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Na raty w IKEA",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "postal-code" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "postal-code" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Użyj swojej lokalizacji",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "choose-shop" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "choose-shop" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Znajdź swój preferowany sklep",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "preffered-shop" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "preffered-shop" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Wybierz swój preferowany sklep",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    describe(`should render modal for "chosen-shop" type`, () => {
      it("it has header", () => {
        // Arrange
        const shopName = "Test Shop";

        (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
          state: {
            ...initState,
            chosenShop: { name: shopName },
          },
        });

        (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
          modalData: { type: "chosen-shop" },
        });

        // Act
        renderWithAppContextProvider(
          <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
        );

        const heading = screen.getByRole("heading", {
          name: shopName,
          hidden: true,
        });

        // Assert
        expect(heading).toBeInTheDocument();
      });

      it(`it has no header if chosenShop does not exist`, () => {
        // Arrange
        (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
          modalData: { type: "chosen-shop" },
        });

        // Act
        renderWithAppContextProvider(
          <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
        );

        const heading = screen.getByRole("heading", {
          name: "",
          hidden: true,
        });

        // Assert
        expect(heading).toBeInTheDocument();
      });
    });

    it(`should render modal for "log-in" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "log-in" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Zaloguj się",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "refund" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "refund" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "W zmianie zdania nie ma nic złego!",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "data-encryption" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "data-encryption" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Ta strona jest bezpieczna",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "next-step" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "next-step" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByText("Oferty dla Klubowiczów IKEA Family");

      // Assert
      expect(heading).toBeInTheDocument();
    });

    describe(`should render modal for "product-control" type`, () => {
      it("if product is in the shopping cart", () => {
        // Arrange
        const state = {
          ...initState,
          shoppingCart: shoppingCart,
        };

        const product = shoppingCart[0];

        (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
          state: state,
        });

        (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
          modalData: { type: "product-control", product: product },
        });

        // Act
        renderWithAppContextProvider(
          <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
        );

        const heading = screen.getByRole("heading", {
          name: product.collection,
          hidden: true,
        });

        // Assert
        expect(heading).toBeInTheDocument();
      });

      it("it has no header if product is not in the shopping cart", () => {
        // Arrange
        (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
          modalData: { type: "product-control", product: shoppingCart[0] },
        });

        // Act
        renderWithAppContextProvider(
          <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
        );

        const heading = screen.getByRole("heading", {
          name: "",
          hidden: true,
        });

        // Assert
        expect(heading).toBeInTheDocument();
      });
    });

    it(`should render modal for "shopping-cart-control" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "shopping-cart-control" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Koszyk",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "add-product-by-number" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "add-product-by-number" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Dodaj produkt, wpisując jego numer",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "create-list" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "create-list" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Nadaj swojej liście nazwę",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "create-list-with-products" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "create-list-with-products" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Nadaj swojej liście nazwę",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "list-control" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "list-control" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Ustawienia",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "change-list-name" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "change-list-name" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Zmień nazwę listy",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "delete-list-confirmation" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "delete-list-confirmation" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Usuń swoją listę",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "select-list" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "select-list" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Zapisz na swojej liście",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "select-list-with-products" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "select-list-with-products" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Przenieś do innej listy",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "move-to-other-list" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "move-to-other-list" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Przenieś do innej listy",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "move-product-from-one-list-to-another" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "move-product-from-one-list-to-another" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Przenieś do innej listy",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "more-options-for-product-in-list" type`, () => {
      // Arrange
      const product = shoppingCart[0];

      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: {
          type: "more-options-for-product-in-list",
          products: [product],
        },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: `Więcej możliwości dla ${product.collection}`,
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "manage-products-in-list" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "manage-products-in-list" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: "Zarządzaj swoimi wyborami",
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Image Preview Modal", () => {
    it(`should render modal for "image-preview" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: {
          type: "image-preview",
          productData: {
            images: exampleFetchedProductData.images,
            name: exampleFetchedProductData.name,
            variant: exampleFetchedProductData.variant,
          },
          index: 0,
          path: "some-path",
        },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: /podgląd obrazu/i,
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Image with Products Modal", () => {
    it(`should render modal for "image-with-products" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: {
          type: "image-with-products",
          productsData: cardCollection[0],
        },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: /wasze wnętrza/i,
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Menu Modal", () => {
    it(`should render modal for "menu" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "menu" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: /menu poboczne/i,
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "products-menu" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "products-menu" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: /menu poboczne/i,
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });

    it(`should render modal for "rooms-menu" type`, () => {
      // Arrange
      (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        modalData: { type: "rooms-menu" },
      });

      // Act
      renderWithAppContextProvider(
        <Modal onClickFunction={vi.fn()} onKeyDownFunction={vi.fn()} />,
      );

      const heading = screen.getByRole("heading", {
        name: /menu poboczne/i,
        hidden: true,
      });

      // Assert
      expect(heading).toBeInTheDocument();
    });
  });
});
