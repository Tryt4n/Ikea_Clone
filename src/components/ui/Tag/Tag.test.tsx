import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import Tag from "./Tag";

describe("Tag", () => {
  it("should render the tag content passed as children", () => {
    // Act
    render(<Tag variant="white">Tag Content</Tag>);

    // Assert
    const tagElement = screen.getByText("Tag Content");
    expect(tagElement).toBeInTheDocument();
  });

  it("should render the tag with default variant if variant is not passed", () => {
    // Act
    render(<Tag>Tag Content</Tag>);

    // Assert
    const tagElement = screen.getByText("Tag Content");
    expect(tagElement).toHaveClass("product-tag");
  });

  it("should render a component with the specified variant and additional class", () => {
    // Act
    render(
      <Tag variant="white" className="additional-class">
        Tag Content
      </Tag>,
    );

    // Assert
    const tagElement = screen.getByText("Tag Content");
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass("product-tag");
    expect(tagElement).toHaveClass("tx-white");
    expect(tagElement).toHaveClass("additional-class");
  });
});
