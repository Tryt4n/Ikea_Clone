import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import NavigationBar from "./NavigationBar";
import { mainNavigationList } from "../../../../constants/navigationLists";
import userEvent from "@testing-library/user-event";
import { shopsList } from "../../../../constants/shopsList";

describe("NavigationBar", () => {
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

    await screen.findByTestId("menu-modal-header"); // Wait for the modal to be fully visible

    // Assert - modal is open
    expect(modal).toHaveClass("show");
    expect(modal).toHaveClass("menu-modal");
    expect(screen.getByTestId("menu-modal-header")).toHaveTextContent(
      "Produkty",
    );
  });

  it('should open rooms menu modal if "Pomieszczenia" button is clicked', async () => {
    // Arrange
    window.innerWidth = 1200;
    const user = userEvent.setup();

    // Act
    render(<NavigationBar />);

    // const modal = screen.getByTestId("modal");
    const modal = screen.queryByTestId("modal");
    const roomsBtn = screen.getByRole("button", { name: "Pomieszczenia" });

    // Assert
    expect(modal).not.toHaveClass();

    // Act - open modal
    await user.click(roomsBtn);

    await screen.findByTestId("menu-modal-header"); // Wait for the modal to be fully visible

    // Assert - modal is open
    expect(modal).toHaveClass("show");
    expect(modal).toHaveClass("menu-modal");
    expect(screen.getByTestId("menu-modal-header")).toHaveTextContent(
      "Pomieszczenia",
    );
  });

  it("should change the postal code button text if postal code is set", () => {
    // Arrange
    localStorage.setItem("postalCode", "12-345");

    // Act
    render(<NavigationBar />);

    // Assert
    expect(screen.getByRole("button", { name: "12-345" })).toBeInTheDocument();
  });

  it("should change the shop button text if shop is chosen", () => {
    // Arrange
    localStorage.setItem("chosenShop", shopsList[0].name);

    // Act
    render(<NavigationBar />);

    const shopText = shopsList[0].name.replace(/ikea/i, "").trim();

    // Assert
    expect(screen.getByRole("button", { name: shopText })).toBeInTheDocument();
  });

  it("should open postal code modal if postal code button is clicked", async () => {
    // Act
    render(<NavigationBar />);

    const modal = screen.getByTestId("modal");
    const postalCodeBtn = screen.getByRole("button", {
      name: "Wpisz kod pocztowy",
    });

    await userEvent.click(postalCodeBtn);

    // Assert
    expect(modal).toHaveClass("show");
    expect(modal).toHaveClass("side-modal");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Użyj swojej lokalizacji",
        hidden: true,
      }),
    ).toBeInTheDocument();
  });

  it("should open choose shop modal if postal chosen shop button is clicked", async () => {
    // Act
    render(<NavigationBar />);

    const modal = screen.getByTestId("modal");
    const postalCodeBtn = screen.getByRole("button", {
      name: "Wybierz sklep",
    });

    await userEvent.click(postalCodeBtn);

    // Assert
    expect(modal).toHaveClass("show");
    expect(modal).toHaveClass("side-modal");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Znajdź swój preferowany sklep",
        hidden: true,
      }),
    ).toBeInTheDocument();
  });
});
