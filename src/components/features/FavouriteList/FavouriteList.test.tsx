import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import FavouriteList from "./FavouriteList";
import { exampleList } from "../../../constants/test-constants/exampleList";

describe("FavouriteList", () => {
  it("should render a component with products", () => {
    // Act
    render(<FavouriteList list={exampleList} />);

    const sectionElement = screen.getByTestId("favourite-list");
    const listElement = screen.getByRole("list");
    const linkElement = screen.getByRole("link");
    const headingElement = screen.getByRole("heading", { level: 3 }); // To check if the <ListDescription> component is rendered

    // Assert
    expect(sectionElement).toBeInTheDocument();

    expect(listElement).toBeInTheDocument();

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      `/favourites/${exampleList.id}`
    );

    expect(headingElement).toBeInTheDocument();
  });

  it("should render a component with empty list if list do not have any products", () => {
    // Arrange
    const list = { ...exampleList, products: [] };

    // Act
    render(<FavouriteList list={list} />);

    const emptyListElement = screen.getByTestId("empty-list");
    const linkElement = screen.getByRole("link");
    const headingElement = screen.getByRole("heading", { level: 3 }); // To check if the <ListDescription> component is rendered

    // Assert
    expect(emptyListElement).toBeInTheDocument();

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      `/favourites/${exampleList.id}`
    );

    expect(headingElement).toBeInTheDocument();
  });
});
