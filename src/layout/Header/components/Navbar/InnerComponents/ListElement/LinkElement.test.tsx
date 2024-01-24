import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../../../setup-test/test-utils";
import { LinkElement } from "./LinkElement";

describe("LinkElement", () => {
  it("should render a component with container class if container prop is true", () => {
    // Arrange
    const linkAdditionalClass = "link-additional-class";

    // Act
    render(
      <LinkElement as="link" className={linkAdditionalClass} container="true">
        some children
      </LinkElement>,
    );

    const linkElement = screen.getByRole("link", { name: /some children/i });

    expect(linkElement).toBeInTheDocument();

    expect(linkElement.parentElement).toHaveClass("btn-container");
    expect(linkElement.parentElement).toHaveClass(linkAdditionalClass);
  });

  it("should render a component with container class if container prop is true", () => {
    // Act
    render(
      <LinkElement as="link" container="false">
        some children
      </LinkElement>,
    );

    const linkElement = screen.getByRole("link", { name: /some children/i });

    expect(linkElement).toBeInTheDocument();

    expect(linkElement.parentElement).not.toHaveClass("btn-container");
  });
});
