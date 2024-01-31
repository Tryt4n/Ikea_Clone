import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import NavigationBar from "./NavigationBar";
import { mainNavigationList } from "../../../../constants/navigationLists";
import userEvent from "@testing-library/user-event";
import { shopsList } from "../../../../constants/shopsList";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import { initState } from "../../../../context/AppContext/constants/appInitState";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");

describe("NavigationBar", () => {
  const setModalData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: initState,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it("should render the NavigationBar component", () => {
    // Act
    render(<NavigationBar />);

    const container = screen.getByTestId("navigation-bar-container");

    // Assert
    expect(container).toBeInTheDocument();
  });

  it("should render the navbar only when width is at least 1200px", () => {
    // Arrange
    window.innerWidth = 1200;

    // Act
    render(<NavigationBar />);

    const navbar = screen.getByRole("navigation");
    const navbarHeader = screen.getByRole("heading", { level: 2 });
    const navbarList = screen.getByRole("list");
    const navbarLinks = screen.getAllByRole("link");

    // Assert
    expect(navbar).toBeInTheDocument();

    expect(navbarHeader).toBeInTheDocument();

    expect(navbarList.children).toHaveLength(mainNavigationList.length);

    expect(navbarLinks).toHaveLength(mainNavigationList.length - 2);
  });

  it('should open products menu modal if "Produkty" button is clicked', async () => {
    // Arrange
    window.innerWidth = 1200;
    const user = userEvent.setup();

    // Act
    render(<NavigationBar />);

    const modal = screen.queryByTestId("modal");
    const productsBtn = screen.getByRole("button", { name: "Produkty" });

    // Assert
    expect(modal).not.toHaveClass();

    // Act - open modal
    await user.click(productsBtn);

    // Assert - modal is open
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "products-menu" });
  });

  it('should open rooms menu modal if "Pomieszczenia" button is clicked', async () => {
    // Arrange
    window.innerWidth = 1200;
    const user = userEvent.setup();

    // Act
    render(<NavigationBar />);

    const modal = screen.queryByTestId("modal");
    const roomsBtn = screen.getByRole("button", { name: "Pomieszczenia" });

    // Assert
    expect(modal).not.toHaveClass();

    // Act - open modal
    await user.click(roomsBtn);

    // Assert - modal is open
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "rooms-menu" });
  });

  it("should change the postal code button text if postal code is set", () => {
    // Arrange
    const state = {
      ...initState,
      postalCode: "12-345",
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<NavigationBar />);

    // Assert
    expect(
      screen.getByRole("button", { name: state.postalCode }),
    ).toBeInTheDocument();
  });

  it("should change the shop button text if shop is chosen", () => {
    // Arrange
    const state = {
      ...initState,
      chosenShop: shopsList[0],
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<NavigationBar />);

    const shopText = shopsList[0].name.replace(/ikea/i, "").trim();

    // Assert
    expect(screen.getByRole("button", { name: shopText })).toBeInTheDocument();
  });

  it("should open postal code modal if postal code button is clicked", async () => {
    // Act
    render(<NavigationBar />);

    const postalCodeBtn = screen.getByRole("button", {
      name: "Wpisz kod pocztowy",
    });

    await userEvent.click(postalCodeBtn);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "postal-code" });
  });

  it("should open choose shop modal if postal chosen shop button is clicked", async () => {
    // Act
    render(<NavigationBar />);

    const postalCodeBtn = screen.getByRole("button", {
      name: "Wybierz sklep",
    });

    await userEvent.click(postalCodeBtn);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "choose-shop" });
  });

  it("should open chosen shop modal if postal chosen shop button is clicked", async () => {
    // Arrange
    const state = {
      ...initState,
      chosenShop: shopsList[0],
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    const searchedButtonText = shopsList[0].name.replace(/ikea/i, "").trim();

    // Act
    render(<NavigationBar />);

    const postalCodeBtn = screen.getByRole("button", {
      name: searchedButtonText,
    });

    await userEvent.click(postalCodeBtn);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "chosen-shop" });
  });
});
