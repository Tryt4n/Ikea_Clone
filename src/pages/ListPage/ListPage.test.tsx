import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../setup-test/test-utils";
import ListPage from "./ListPage";
import { exampleList } from "../../setup-test/test-constants/exampleList";
import useList from "./hooks/useList";

vi.mock("./hooks/useList");

describe("ListPage", () => {
  beforeEach(() => {
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: undefined,
    });
  });

  it("should render a component with loading state at start", () => {
    // Act
    render(<ListPage />);

    const loadingSpinner = screen.getByRole("heading", {
      name: /ładowanie/i,
      level: 2,
    });

    // Assert
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("should render an empty list page if the `products` property does not exist on the list", () => {
    // Arrange
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: {
        ...exampleList,
        products: undefined,
      },
    });

    // Act
    render(<ListPage />);

    // Assert
    expect(
      screen.getByText(/ta lista potrzebuje odrobiny miłości/i),
    ).toBeInTheDocument();
  });

  it("should render an empty list page if the list does not have any products", () => {
    // Arrange
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: {
        ...exampleList,
        products: [],
      },
    });

    // Act
    render(<ListPage />);

    // Assert
    expect(
      screen.getByText(/ta lista potrzebuje odrobiny miłości/i),
    ).toBeInTheDocument();
  });

  it("should render the list page", () => {
    // Arrange
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: exampleList,
      managedProducts: [],
    });

    // Act
    render(<ListPage />);

    const listHeader = screen.getByRole("heading", {
      level: 2,
      name: exampleList.name,
    });

    // Assert
    expect(listHeader).toBeInTheDocument();
  });
});
