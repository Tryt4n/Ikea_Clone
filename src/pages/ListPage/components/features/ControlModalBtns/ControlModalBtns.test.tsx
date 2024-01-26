import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { ListContextProvider } from "../../../context/ListContext";
import ControlModalBtns from "./ControlModalBtns";
import useList from "../../../hooks/useList";
import { exampleList } from "../../../../../setup-test/test-constants/exampleList";

vi.mock("../../../hooks/useList");

describe("ControlModalBtns", () => {
  beforeEach(() => {
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: exampleList,
    });
  });

  const contextWrapper = (children: ReactNode) => {
    render(<ListContextProvider>{children}</ListContextProvider>);
  };

  it("should render three control buttons", () => {
    // Act
    contextWrapper(<ControlModalBtns />);
    const buttons = screen.getAllByRole("button");

    // Assert
    expect(buttons.length).toBe(3);
  });

  it("should not open menu list modal when there are no lists", async () => {
    // Arrange
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: undefined,
    });

    const user = userEvent.setup();

    // Act
    contextWrapper(<ControlModalBtns />);
    const button = screen.getByRole("button", {
      name: /otwórz menu listy/i,
    });

    const modal = screen.getByTestId("modal");

    await user.click(button);

    // Assert
    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveClass("show");
  });

  it("should open menu list modal when appropriate button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    contextWrapper(<ControlModalBtns />);
    const button = screen.getByRole("button", {
      name: /otwórz menu listy/i,
    });
    const modal = screen.getByTestId("modal");

    await user.click(button);

    const modalHeader = await screen.findByRole("heading", {
      level: 2,
      name: /ustawienia/i,
      hidden: true,
    });

    // Assert
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass("show");
    expect(modalHeader).toBeInTheDocument();
  });
});
