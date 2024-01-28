import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../setup-test/test-utils";
import ListPage from "./ListPage";
import { exampleList } from "../../setup-test/test-constants/exampleList";
import useList from "./hooks/useList";
import useApp from "../../hooks/useApp/useApp";
import { initState } from "../../context/AppContext/constants/appInitState";
import { useParams } from "react-router-dom";

vi.mock("../../hooks/useApp/useApp");
vi.mock("./hooks/useList");
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useParams: vi.fn(),
}));

describe("ListPage", () => {
  const state = {
    ...initState,
    favouriteLists: [exampleList],
  };
  const dispatch = vi.fn();
  const listState = exampleList;
  const listDispatch = vi.fn();
  const params = { listId: exampleList.id };

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
      listDispatch: listDispatch,
    });

    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      params: params,
    });
  });

  it("should render a component with loading state when list is undefined", () => {
    // Arrange
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: undefined,
    });

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
