import { describe, expect, it } from "vitest";
import { render, screen } from "../../../setup-test/test-utils";
import FavouriteLists from "../FavouriteLists";
import { exampleList } from "../../../setup-test/test-constants/exampleList";
import type { FavouritesListType } from "../../../context/AppContext/types/FavouritesListType";

describe("FavouriteLists", () => {
  it("should render a component", () => {
    // Act
    render(<FavouriteLists />);

    const component = screen.getByRole("article").parentElement;

    // Assert
    expect(component).toBeInTheDocument();
  });

  it("should render a component without any lists if they do not exist", () => {
    // Arrange
    const lists: FavouritesListType[] = [];

    localStorage.setItem("favouriteLists", JSON.stringify(lists));

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
    const lists: FavouritesListType[] = [exampleList];

    localStorage.setItem("favouriteLists", JSON.stringify(lists));

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
    const lists: FavouritesListType[] = [
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

    localStorage.setItem("favouriteLists", JSON.stringify(lists));

    // Act
    render(<FavouriteLists />);

    const mainArticleHeading = screen.getByRole("heading", {
      name: /wiele list, jeden dom/i,
    });
    // const mainList = screen.getByTestId("favourite-list");
    const listElements = screen.getAllByTestId("favourite-list");

    // Assert
    expect(mainArticleHeading).toBeInTheDocument();
    expect(listElements).toHaveLength(lists.length);
  });
});
