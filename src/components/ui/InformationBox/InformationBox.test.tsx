import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import InformationBox from "./InformationBox";

describe("InformationBox", () => {
  it("should render an information box with the provided information text", () => {
    // Arrange
    const information = "This is some information";

    // Act
    render(<InformationBox information={information} />);

    // Assert
    expect(screen.getByText(information)).toBeInTheDocument();
  });

  it("should render and information box with additional class if provided", () => {
    // Arrange
    const information = "This is some information";
    const additionalClass = "additional-class";

    // Act
    render(
      <InformationBox information={information} className={additionalClass} />
    );
    const containerElement = screen.getByTestId("information-box-container");

    // Assert
    expect(containerElement).toHaveClass(additionalClass);
  });

  it("should render an information box with an optional heading and the provided information text", () => {
    // Arrange
    const heading = "Heading";
    const information = "This is some information";

    // Act
    render(<InformationBox heading={heading} information={information} />);

    // Assert
    expect(screen.getByText(heading)).toBeInTheDocument();
    expect(screen.getByText(information)).toBeInTheDocument();
  });

  it("should render an information box with an optional heading and the provided information text, using the specified HTML element for the container", () => {
    // Arrange
    const heading = "Heading";
    const information = "This is some information";
    const as = "section";

    // Act
    render(
      <InformationBox heading={heading} information={information} as={as} />
    );

    // Assert
    const containerElement = screen.getByTestId("information-box-container");
    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    expect(screen.getByText(information)).toBeInTheDocument();
    expect(containerElement.tagName).toBe("SECTION");
  });

  it("should render an information box with a passed heading level and the provided information text", () => {
    // Arrange
    const headingLevel = 5;
    const information = "This is some information";
    const heading = "Heading";

    // Act
    render(
      <InformationBox
        heading={heading}
        headingLevel={headingLevel}
        information={information}
      />
    );

    // Assert
    expect(
      screen.getByRole("heading", { level: headingLevel })
    ).toBeInTheDocument();
    expect(screen.getByText(information)).toBeInTheDocument();
  });
});
