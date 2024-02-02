import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RoomsMenu from "./RoomsMenu";
import { roomsNavigationList } from "../../../../constants/navigationLists";

describe("RoomsMenu Modal variant", () => {
  it("should render a component", () => {
    // Act
    render(<RoomsMenu className="rooms-menu" />);

    const component = screen.getByRole("navigation");
    const listItems = screen.getAllByRole("listitem");

    // Assert
    expect(component).toBeInTheDocument();

    expect(listItems).toHaveLength(roomsNavigationList.length);
  });
});
