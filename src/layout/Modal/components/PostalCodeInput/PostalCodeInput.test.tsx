import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import useApp from "../../../../hooks/useApp/useApp";
import { initState } from "../../../../context/AppContext/constants/appInitState";
import { PostalCodeInput } from "./PostalCodeInput";

vi.mock("../../../../hooks/useApp/useApp");

describe("Modal PostalCodeInput", () => {
  const errorMessage = "error message";

  it("should render a component with valid postal code", () => {
    // Assert
    const state = {
      ...initState,
      postalCode: "12-345",
      isPostalCodeErrorMessageVisible: false,
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<PostalCodeInput />);

    const input = screen.getByRole("textbox");

    // Assert
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(state.postalCode);
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("should render error message", () => {
    // Arrange
    const state = {
      ...initState,
      postalCode: "",
      postalCodeErrorMessage: errorMessage,
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<PostalCodeInput />);

    const errorComponent = screen.getByText(errorMessage);

    // Assert
    expect(errorComponent).toBeInTheDocument();
    expect(errorComponent).toHaveAttribute("aria-hidden", "true");
  });

  it("should render component with invalid postal code", () => {
    // Arrange
    const state = {
      ...initState,
      postalCode: "some invalid postal code",
      isPostalCodeErrorMessageVisible: true,
      postalCodeErrorMessage: errorMessage,
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<PostalCodeInput />);

    const input = screen.getByRole("textbox");
    const errorComponent = screen.getByText(errorMessage);

    // Assert
    expect(input).toHaveAttribute("aria-invalid", "true");

    expect(errorComponent).toHaveAttribute("aria-hidden", "false");
  });

  it("should call onInputChange function", async () => {
    // Arrange
    const state = {
      ...initState,
      postalCode: "",
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    const user = userEvent.setup();

    const typedPostalCode = "11-111";

    // Act
    render(<PostalCodeInput />);

    const input = screen.getByRole("textbox");

    await user.type(input, typedPostalCode);

    // Assert
    expect(input).toHaveValue(typedPostalCode);
  });
});
