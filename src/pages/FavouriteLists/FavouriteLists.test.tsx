import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../setup-test/test-utils";
import FavouriteLists from "./FavouriteLists";
import { exampleList } from "../../setup-test/test-constants/exampleList";
import useApp from "../../hooks/useApp/useApp";
import { initState } from "../../context/AppContext/constants/appInitState";

vi.mock("../../hooks/useApp/useApp");

describe("FavouriteLists", () => {
  const state = initState;

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });
  });

  it("should render a component without any lists if they do not exist", () => {
    // Act
    render(<FavouriteLists />);

    const component = screen.getByRole("article").parentElement;
    const articles = screen.getAllByRole("article");
    const mainArticleHeading = screen.getByRole("heading", {
      name: /wiele list, jeden dom/i,
    });

    // Assert
    expect(component).toBeInTheDocument();
    expect(articles).toHaveLength(1);
    expect(mainArticleHeading).toBeInTheDocument();
  });

  it("should render a component without any lists if there is no one list", () => {
    // Arrange
    const state = {
      ...initState,
      favouriteLists: [],
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<FavouriteLists />);

    const articles = screen.getAllByRole("article");
    const mainArticleHeading = screen.getByRole("heading", {
      name: /wiele list, jeden dom/i,
    });

    // Assert
    expect(articles).toHaveLength(1);
    expect(mainArticleHeading).toBeInTheDocument();
  });

  it("should render a component only with main lists if lists has only one list", () => {
    // Arrange
    const state = {
      ...initState,
      favouriteLists: [exampleList],
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<FavouriteLists />);

    const articles = screen.getAllByRole("article");
    const mainArticleHeading = screen.getByRole("heading", {
      name: /wiele list, jeden dom/i,
    });
    const mainList = screen.getByTestId("favourite-list");

    // Assert
    expect(articles).toHaveLength(1);
    expect(mainArticleHeading).toBeInTheDocument();
    expect(mainList).toBeInTheDocument();
  });

  it("should render a component with other lists", () => {
    // Arrange
    const lists = [
      {
        ...exampleList,
        id: "1",
        name: "Example list 1",
        lastEdit: new Date("2021-08-01T12:00:00.000Z"),
      },
      {
        ...exampleList,
        id: "2",
        name: "Example list 2",
        lastEdit: new Date("2021-08-02T13:00:00.000Z"),
      },
    ];

    const state = {
      ...initState,
      favouriteLists: lists,
    };
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<FavouriteLists />);

    const mainArticleHeading = screen.getByRole("heading", {
      name: /wiele list, jeden dom/i,
    });
    const listElements = screen.getAllByTestId("favourite-list");

    // Assert
    expect(mainArticleHeading).toBeInTheDocument();
    expect(listElements).toHaveLength(state.favouriteLists.length);
  });
});
