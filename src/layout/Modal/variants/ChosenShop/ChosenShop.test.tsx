import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import useModal from "../../../../hooks/useModal/useModal";
import useApp from "../../../../hooks/useApp/useApp";
import ChosenShop from "./ChosenShop";
import { initState } from "../../../../context/AppContext/constants/appInitState";
import { shopsList } from "../../../../constants/shopsList";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useModal/useModal");

describe("Modal ChosenShop variant", () => {
  const state = {
    ...initState,
    chosenShop: shopsList[0],
  };
  const setModalData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it("should render a chosen shop component", () => {
    // Act
    render(<ChosenShop />);

    // Assert
    expect(
      screen.getByRole("heading", { name: /informacje/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Godziny otwarcia" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /niestandardowe godziny otwarcia/i }),
    ).toBeInTheDocument();
  });

  it("should call setModalData on button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ChosenShop />);

    const button = screen.getByRole("button", { name: /wybierz inny sklep/i });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "choose-shop" });
  });
});
