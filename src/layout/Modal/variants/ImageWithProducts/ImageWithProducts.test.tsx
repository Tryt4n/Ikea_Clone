import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import ImageWithProducts from "./ImageWithProducts";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import useToast from "../../../../hooks/useToast/useToast";
import { initState } from "../../../../context/AppContext/constants/appInitState";
import { cardCollection } from "../../../../setup-test/test-constants/cardCollection";
import { exampleProducts } from "../../../../setup-test/test-constants/exampleProducts";
import type { ModalImageWithProductsType } from "../../types/ModalTypes";
import type { CardCollectionType } from "../../../Articles/components/ImageCardCollection/ImageCardCollection";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../../../hooks/useToast/useToast");

describe("ImageWithProducts Modal variant", () => {
  const state = initState;
  const dispatch = vi.fn();
  const closeModal = vi.fn();
  const setToastData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      closeModal: closeModal,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });
  });

  it("should render a component", () => {
    // Arrange
    const products: CardCollectionType = {
      ...cardCollection[0],
      products: exampleProducts,
    };

    const data: ModalImageWithProductsType = {
      type: "image-with-products",
      productsData: products,
    };

    // Act
    render(<ImageWithProducts data={data} />);

    const list = screen.getByTestId("image-with-products-modal-list");

    // Assert
    expect(
      screen.getByRole("heading", { name: /wasze wnętrza/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /zamknij/i }),
    ).toBeInTheDocument();

    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(data.productsData.products.length);
  });

  it("should render a component without any products if they don't exist", () => {
    // Arrange
    const products: CardCollectionType = {
      ...cardCollection[0],
      products: [],
    };

    const data: ModalImageWithProductsType = {
      type: "image-with-products",
      productsData: products,
    };

    // Act`
    render(<ImageWithProducts data={data} />);

    const list = screen.getByTestId("image-with-products-modal-list");

    // Assert
    expect(list.children).toHaveLength(0);
  });

  it("should render instagram user element if it exist and the window width is less than 1000px", () => {
    // Arrange
    window.innerWidth = 999;
    window.innerHeight = 1024;

    const instagramUser = "some user123";

    const products: CardCollectionType = {
      ...cardCollection[0],
      instagramUser: instagramUser,
      products: exampleProducts,
    };

    const data: ModalImageWithProductsType = {
      type: "image-with-products",
      productsData: products,
    };

    // Act
    render(<ImageWithProducts data={data} />);

    // Assert
    expect(
      screen.getByTestId("image-with-products-modal-instagram-user"),
    ).toBeInTheDocument();
  });

  it("should render instagram user element if it exist and the window height is less than 700px", () => {
    // Arrange
    window.innerWidth = 1920;
    window.innerHeight = 699;

    const products: CardCollectionType = {
      ...cardCollection[0],
      instagramUser: "some user123",
      products: exampleProducts,
    };

    const data: ModalImageWithProductsType = {
      type: "image-with-products",
      productsData: products,
    };

    // Act
    render(<ImageWithProducts data={data} />);

    // Assert
    expect(
      screen.getByTestId("image-with-products-modal-instagram-user"),
    ).toBeInTheDocument();
  });

  it("should render image with products if the window width is at least 1000px and window height is at least 700px", () => {
    // Arrange
    window.innerWidth = 1000;
    window.innerHeight = 700;

    const products: CardCollectionType = {
      ...cardCollection[0],
      instagramUser: "some user123",
      products: exampleProducts,
    };

    const data: ModalImageWithProductsType = {
      type: "image-with-products",
      productsData: products,
    };

    // Act
    render(<ImageWithProducts data={data} />);

    const collectionList = screen.getByRole("list", {
      name: /produkty ze zdjęcia/i,
    });
    const image = screen.getByAltText(products.img.imgAlt);

    // Assert
    expect(collectionList).toBeInTheDocument();

    expect(image).toBeInTheDocument();

    expect(
      screen.getByTestId("article-instagram-nickname"),
    ).toBeInTheDocument();
  });

  it("should call the closeModal function when the close button is clicked", async () => {
    // Arrange
    const products: CardCollectionType = {
      ...cardCollection[0],
      products: [],
    };

    const data: ModalImageWithProductsType = {
      type: "image-with-products",
      productsData: products,
    };

    const user = userEvent.setup();

    // Act
    render(<ImageWithProducts data={data} />);

    const button = screen.getByRole("button", { name: /zamknij/i });

    await user.click(button);

    // Assert
    expect(closeModal).toHaveBeenCalledOnce();
  });
});
