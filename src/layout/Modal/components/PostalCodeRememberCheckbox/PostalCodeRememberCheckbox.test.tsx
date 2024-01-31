import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import useApp from "../../../../hooks/useApp/useApp";
import { initState } from "../../../../context/AppContext/constants/appInitState";
import { PostalCodeRememberCheckbox } from "./PostalCodeRememberCheckbox";

vi.mock("../../../../hooks/useApp/useApp");

describe("Modal PostalCodeRememberCheckbox", () => {
  const state = initState;
  const dispatch = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });
  });

  it("should render a component with checked checkbox", () => {
    // Act
    render(<PostalCodeRememberCheckbox />);

    const input = screen.getByRole("checkbox");

    // Assert
    expect(input).toBeInTheDocument();
    expect(input).toBeChecked();
  });

  it("should render a component with checked checkbox", () => {
    // Arrange
    const state = {
      ...initState,
      rememberPostalCodeCheckboxStatus: false,
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    // Act
    render(<PostalCodeRememberCheckbox />);

    const input = screen.getByRole("checkbox");

    // Assert
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  it("should call dispatch function when the checkbox is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<PostalCodeRememberCheckbox />);

    const input = screen.getByRole("checkbox");

    await user.click(input);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "togglePostalCodeCheckbox",
      payload: !state.rememberPostalCodeCheckboxStatus,
    });
  });

  it("should call dispatch function when the label is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<PostalCodeRememberCheckbox />);

    const label = screen.getByText(/zapamiętaj mój kod pocztowy/i);

    await user.click(label);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "togglePostalCodeCheckbox",
      payload: !state.rememberPostalCodeCheckboxStatus,
    });
  });

  it("should call dispatch function when user presses the Enter key on the input", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<PostalCodeRememberCheckbox />);

    const input = screen.getByRole("checkbox");

    await user.type(input, "{enter}");

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "togglePostalCodeCheckbox",
      payload: !state.rememberPostalCodeCheckboxStatus,
    });
  });

  it("should call dispatch function when user presses the Space key on the input", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<PostalCodeRememberCheckbox />);

    const input = screen.getByRole("checkbox");

    // Act
    await user.type(input, "{space}");

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "togglePostalCodeCheckbox",
      payload: !state.rememberPostalCodeCheckboxStatus,
    });
  });
});
