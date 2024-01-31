import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "../../setup-test/test-utils";
import ListPage from "./ListPage";
import { exampleList } from "../../setup-test/test-constants/exampleList";
import useList from "./hooks/useList";
import useApp from "../../hooks/useApp/useApp";
import { useNavigate, useParams } from "react-router-dom";
import { initState } from "../../context/AppContext/constants/appInitState";

vi.mock("../../hooks/useApp/useApp");
vi.mock("./hooks/useList");
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

describe("ListPage", () => {
  const state = {
    ...initState,
    favouriteLists: [exampleList],
  };
  const dispatch = vi.fn();
  const listDispatch = vi.fn();
  const params = { listId: exampleList.id };

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue(params);
  });

  it("should render a component with loading state when list is undefined", () => {
    // Arrange
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: undefined,
      listDispatch: listDispatch,
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
      listDispatch: listDispatch,
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
      listDispatch: listDispatch,
    });

    // Act
    render(<ListPage />);

    // Assert
    expect(
      screen.getByText(/ta lista potrzebuje odrobiny miłości/i),
    ).toBeInTheDocument();
  });

  it("should render the list page", async () => {
    // Arrange
    const list = exampleList;

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: list,
      managedProducts: [],
      listDispatch: listDispatch,
    });

    // Act
    render(<ListPage />);

    const listHeader = screen.getByRole("heading", {
      level: 2,
      name: exampleList.name,
    });

    // Assert
    expect(listHeader).toBeInTheDocument();

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: "setEditingList",
        payload: list,
      });

      expect(listDispatch).toHaveBeenCalled();
      expect(listDispatch).toHaveBeenCalledWith({
        type: "initList",
        payload: list,
      });
    });
  });

  it("should sort list by name", async () => {
    // Arrange
    const listState = {
      ...exampleList,
      listSorting: "name",
    };

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
      listDispatch: listDispatch,
      managedProducts: [],
    });

    // Act
    render(<ListPage />);

    // Assert
    await waitFor(() => {
      expect(listDispatch).toHaveBeenCalled();
      expect(listDispatch).toHaveBeenCalledWith({ type: "sortByName" });
    });
  });

  it("should sort list by price ascending", async () => {
    // Arrange
    const listState = {
      ...exampleList,
      listSorting: "priceAscending",
    };

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
      listDispatch: listDispatch,
      managedProducts: [],
    });

    // Act
    render(<ListPage />);

    // Assert
    await waitFor(() => {
      expect(listDispatch).toHaveBeenCalled();
      expect(listDispatch).toHaveBeenCalledWith({
        type: "sortByPrice",
        payload: listState.listSorting,
      });
    });
  });

  it("should sort list by price descending", async () => {
    // Arrange
    const listState = {
      ...exampleList,
      listSorting: "priceDescending",
    };

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
      listDispatch: listDispatch,
      managedProducts: [],
    });

    // Act
    render(<ListPage />);

    // Assert
    await waitFor(() => {
      expect(listDispatch).toHaveBeenCalled();
      expect(listDispatch).toHaveBeenCalledWith({
        type: "sortByPrice",
        payload: listState.listSorting,
      });
    });
  });

  it("should sort list by recently added", async () => {
    // Arrange
    const listState = {
      ...exampleList,
      listSorting: "recent",
    };

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
      listDispatch: listDispatch,
      managedProducts: [],
    });

    // Act
    render(<ListPage />);

    // Assert
    await waitFor(() => {
      expect(listDispatch).toHaveBeenCalled();
      expect(listDispatch).toHaveBeenCalledWith({
        type: "sortByDate",
        payload: listState.listSorting,
      });
    });
  });

  it("should sort list by the oldest", async () => {
    // Arrange
    const listState = {
      ...exampleList,
      listSorting: "oldest",
    };

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
      listDispatch: listDispatch,
      managedProducts: [],
    });

    // Act
    render(<ListPage />);

    // Assert
    await waitFor(() => {
      expect(listDispatch).toHaveBeenCalled();
      expect(listDispatch).toHaveBeenCalledWith({
        type: "sortByDate",
        payload: listState.listSorting,
      });
    });
  });

  it(`should navigate to "/favourites" if the list does not exist`, async () => {
    // Arrange
    const list = exampleList;
    const params = { listId: "none-existent-list-id" };
    const navigate = vi.fn();

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: list,
      managedProducts: [],
      listDispatch: listDispatch,
    });

    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue(params);

    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      navigate,
    );

    // Act
    render(<ListPage />);

    // Assert
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledOnce();
      expect(navigate).toHaveBeenCalledWith("/favourites");
    });
  });
});
