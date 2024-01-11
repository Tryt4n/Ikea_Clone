import { describe, it, expect } from "vitest";
import { getByRole, screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("should render a small element with the error message text and proper aria-hidden attribute", () => {
    // Arrange
    const { getByText } = render(
      <ErrorMessage
        id="error"
        errorMessage="Error message"
        errorVisibility={true}
      />
    );
    const errorMessageElement = getByText("Error message");

    // Assert
    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveAttribute("aria-hidden", "true");
  });
});
