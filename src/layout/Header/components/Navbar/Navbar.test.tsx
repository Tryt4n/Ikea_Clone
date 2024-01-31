import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import Navbar from "./Navbar";
import { useInView } from "react-intersection-observer";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import { initState } from "../../../../context/AppContext/constants/appInitState";
import { shoppingCart } from "../../../../setup-test/test-constants/shoppingCart";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");

describe("Navbar", () => {
  const state = {
    ...initState,
    shoppingCart: shoppingCart,
  };
  const isDesktop = true;
  const modalData = {
    type: "some type",
  };

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      isDesktop: isDesktop,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      modalData: modalData,
    });
  });

  it("should render the Navbar component", () => {
    // Act
    render(<Navbar />);

    const searchBar = screen.getByRole("searchbox");

    // Assert
    expect(searchBar).toBeInTheDocument();
  });

  it("should render searchbar when width is at least 700px", () => {
    // Arrange
    window.innerWidth = 700;

    // Act
    render(<Navbar />);

    const searchBar = screen.getByRole("searchbox");

    // Assert
    expect(searchBar).toBeInTheDocument();
  });

  it("should render searchbar when is inView even when width is less than 700px", () => {
    // Arrange
    window.innerWidth = 699;
    (useInView as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      vi.fn(),
      true,
    ]);

    // Act
    render(<Navbar />);

    const searchBar = screen.getByRole("searchbox");

    // Assert
    expect(searchBar).toBeInTheDocument();
  });

  it("should render button for searchbar when width is less than 700px and is not inView", () => {
    // Arrange
    window.innerWidth = 699;
    (useInView as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      vi.fn(),
      false,
    ]);

    // Act
    render(<Navbar />);

    // Assert
    expect(screen.getByText(/wyszukaj produkty/i)).toBeInTheDocument();
  });

  it("should render button for logging in", () => {
    // Arrange
    window.innerWidth = 1199;

    // Act
    render(<Navbar />);
    const loginBtn = screen.getByRole("button", { name: /hej! zaloguj się/i });

    // Assert
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveClass("btn--circle");

    expect(screen.getByText(/hej! zaloguj się/i)).toHaveClass(
      "visually-hidden",
    );
  });

  it("should render button for logging with special styles when the width is at least 1200px", () => {
    // Arrange
    window.innerWidth = 1200;

    // Act
    render(<Navbar />);
    const loginBtn = screen.getByRole("button", { name: /hej! zaloguj się/i });

    // Assert
    expect(loginBtn.parentElement).toHaveClass("self-align");

    expect(loginBtn).toHaveClass("btn--oval");
  });

  it("should render HamburgerButton component when the width is less than 1200px", () => {
    // Arrange
    window.innerWidth = 1199;

    // Act
    render(<Navbar />);
    const hamburgerBtn = screen.getByRole("button", { name: /menu/i });

    // Assert
    expect(hamburgerBtn).toBeInTheDocument();
  });

  it("should add appropriate classes if page is not scrolled", () => {
    // Act
    render(<Navbar />);

    const container = screen.getByTestId("navbar-wrapper");

    // Assert
    expect(container).toHaveClass("scrolled");
    expect(container).toHaveClass("slideUp");
  });

  it("should add appropriate classes if page is scrolled", () => {
    // Arrange
    (useInView as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      vi.fn(),
      true,
    ]);

    // Act
    render(<Navbar />);

    const container = screen.getByTestId("navbar-wrapper");

    // Assert
    expect(container).not.toHaveClass("scrolled");
    expect(container).not.toHaveClass("slideDown");
  });

  it("should add 'mobile' class when device is not a desktop", () => {
    // Arrange
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      isDesktop: false,
    });

    // Act
    render(<Navbar />);

    const container = screen.getByTestId("navbar-wrapper");

    // Assert
    expect(container).toHaveClass("mobile");
  });

  it("should not add 'mobile' class when device is a desktop", () => {
    // Arrange
    delete window.ontouchstart;

    // Act
    render(<Navbar />);

    const container = screen.getByTestId("navbar-wrapper");

    // Assert
    expect(container).not.toHaveClass("mobile");
  });
});
