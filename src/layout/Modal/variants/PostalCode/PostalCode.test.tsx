import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostalCode from "./PostalCode";
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
import useToast from "../../../../hooks/useToast/useToast";
import { initState } from "../../../../context/AppContext/constants/appInitState";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../../../hooks/useToast/useToast");

describe("PostalCode Modal variant", () => {
  const state = initState;
  const dispatch = vi.fn();
  const setModalData = vi.fn();
  const closeModal = vi.fn();
  const setToastData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
      closeModal: closeModal,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });
  });

  it(`should render a component for "postal-code" type`, () => {
    // Act
    render(<PostalCode modalType="postal-code" />);

    const text = screen.getByText(
      "Uzyskaj aktualne informacje o dostawie produktów i dostępności produktów w twojej okolicy.",
    );
    const input = screen.getByRole("textbox");
    const message = screen.getByText("np. 12-345");
    const subDescription = screen.getByText(
      /do świadczenia tej usługi wykorzystujemy pliki cookie/i,
    );
    const button = screen.getByRole("button", { name: /zapisz/i });

    // Assert
    expect(text).toBeInTheDocument();

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");

    expect(message).toBeInTheDocument();

    expect(subDescription).toBeInTheDocument();

    expect(button).toBeInTheDocument();
  });

  it(`should render a component for "choose-shop" type`, () => {
    // Act
    render(<PostalCode modalType="choose-shop" />);

    const text = screen.getByText(/znajdź swój preferowany sklep/i);
    const input = screen.getByRole("textbox");
    const checkbox = screen.getByRole("checkbox");
    const message = screen.getByText("np. 12-345");
    const button1 = screen.getByRole("button", {
      name: /znajdź preferowany sklep/i,
    });
    const button2 = screen.getByRole("button", {
      name: /zobacz pełną listę sklepów/i,
    });

    // Assert
    expect(text).toBeInTheDocument();

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");

    expect(checkbox).toBeInTheDocument();

    expect(message).toBeInTheDocument();

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });

  it(`should render a component with "posta-code" type if postal code is defined`, () => {
    // Arrange
    const postalCode = "12-345";

    const state = { ...initState, postalCode: postalCode };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    // Act
    render(<PostalCode modalType="postal-code" />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", {
      name: /nie wykorzystuj kodu pocztowego/i,
    });

    // Assert
    expect(input).toHaveValue(postalCode);

    expect(button).toBeInTheDocument();
  });

  it(`should call deletePostalCode function on button click if it is defined`, async () => {
    // Arrange
    const postalCode = "12-345";

    const state = { ...initState, postalCode: postalCode };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    const user = userEvent.setup();

    // Act
    render(<PostalCode modalType="postal-code" />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", {
      name: /nie wykorzystuj kodu pocztowego/i,
    });

    // Assert
    expect(input).toHaveValue(postalCode);

    expect(button).toBeInTheDocument();

    // Act - click the button
    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({ type: "deletePostalCode" });

    expect(closeModal).toHaveBeenCalledOnce();
  });

  it("should show error message if postal code is invalid", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<PostalCode modalType="postal-code" />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /zapisz/i });

    // Act - type invalid postal code
    await user.type(input, "invalid postal code");

    // Act - click the button
    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "showErrorMessage",
      payload: "Wprowadzony kod pocztowy jest nieprawidłowy. Spróbuj ponownie.",
    });
  });

  it("should show error message if form is submitted without postal code", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<PostalCode modalType="postal-code" />);

    const button = screen.getByRole("button", { name: /zapisz/i });

    // Act - click the button
    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "showErrorMessage",
      payload: "Wprowadź kod pocztowy",
    });
  });

  it("should show error message if postal code is the same as before", async () => {
    // Arrange
    const postalCode = "12-345";

    const state = { ...initState, postalCode: postalCode };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    const user = userEvent.setup();

    // Act
    render(<PostalCode modalType="postal-code" />);

    const button = screen.getByRole("button", { name: /zapisz/i });

    // Act - click the button
    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "showErrorMessage",
      payload: "Wprowadzona wartość jest taka sama",
    });
  });

  it("should submit a form when postal code is valid", async () => {
    // Arrange
    const user = userEvent.setup();

    const typedPostalCode = "12-345";

    // Act
    render(<PostalCode modalType="postal-code" />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /zapisz/i });

    // Act - type valid postal code
    await user.type(input, typedPostalCode);

    // Act - click the button
    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: "showErrorMessage",
      payload: "",
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "setPostalCode",
      payload: typedPostalCode,
    });

    expect(closeModal).toHaveBeenCalledOnce();

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Wybrany przez ciebie kod pocztowy to: ${typedPostalCode}`,
    });
  });

  it("should open modal with 'preffered-shop' type on button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<PostalCode modalType="choose-shop" />);

    const button = screen.getByRole("button", {
      name: /zobacz pełną listę sklepów/i,
    });

    // Act - click the button
    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "preffered-shop" });
  });
});
