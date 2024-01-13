import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toast from "./Toast";
import type { ToastDataType } from "../../../context/ToastContext/ToastContext";

describe("Toast", () => {
  it("should render a close dialog element by default", () => {
    // Arrange
    const toastData: ToastDataType = {
      open: false,
      text: "",
    };

    // Act
    render(<Toast toastData={toastData} closeToast={() => vi.fn()} />);
    const dialogElement = screen.getByTestId("toast-notification");
    const closeButtonElement = screen.getByRole("button", {
      name: /zamknij/i,
      hidden: true,
    });

    // Assert
    expect(dialogElement).toBeInTheDocument();
    expect(dialogElement).not.toHaveAttribute("open");

    expect(closeButtonElement).toBeInTheDocument();
  });

  it("should render a dialog element with the open attribute and passed text if the toast is open", () => {
    // Arrange
    const toastData: ToastDataType = {
      open: true,
      text: "Test Toast",
    };

    // Act
    render(<Toast toastData={toastData} closeToast={() => vi.fn()} />);
    const dialogElement = screen.getByTestId("toast-notification");

    // Assert
    expect(dialogElement).toBeInTheDocument();
    expect(dialogElement).toHaveAttribute("open");
  });

  it("should render a dialog element with link if provided", () => {
    // Arrange
    const toastData: ToastDataType = {
      open: false,
      text: "",
      link: "/test",
    };

    // Act
    render(<Toast toastData={toastData} closeToast={() => vi.fn()} />);
    const linElement = screen.getByRole("link", { hidden: true });

    // Assert
    expect(linElement).toBeInTheDocument();
    expect(linElement).toHaveAttribute("href", toastData.link);
  });

  it("should render a dialog element on the left if alignLeft is true", () => {
    // Arrange
    const toastData: ToastDataType = {
      open: false,
      text: "",
      alignLeft: true,
    };

    // Act
    render(<Toast toastData={toastData} closeToast={() => vi.fn()} />);
    const dialogElement = screen.getByTestId("toast-notification");

    // Assert
    expect(dialogElement).toHaveClass("toast-notification--left");
  });

  it("should render a dialog element with a button to restore the previous state if prevState is provided", () => {
    // Arrange
    const toastData: ToastDataType = {
      open: true,
      text: "",
      link: "/test",
      prevState: () => vi.fn(),
    };

    // Act
    render(<Toast toastData={toastData} closeToast={() => vi.fn()} />);
    const restorationButtonElement = screen.getByRole("button", {
      name: /cofnij/i,
    });

    // Assert
    expect(restorationButtonElement).toBeInTheDocument();
  });

  it("should call the closeToast function when the button to restore the previous state is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const toastData: ToastDataType = {
      open: true,
      text: "",
      link: "/test",
    };
    const closeToast = vi.fn();

    // Act
    render(<Toast toastData={toastData} closeToast={closeToast} />);

    const closeButtonElement = screen.getByRole("button", { name: /zamknij/i });
    await user.click(closeButtonElement);

    // Assert
    expect(closeToast).toHaveBeenCalled();
  });

  it("should call the restoration function when the button to restore the previous state is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const toastData: ToastDataType = {
      open: true,
      text: "",
      link: "/test",
      prevState: vi.fn(),
    };

    // Act
    render(<Toast toastData={toastData} closeToast={vi.fn()} />);

    const restorationButtonElement = screen.getByRole("button", {
      name: /cofnij/i,
    });
    await user.click(restorationButtonElement);

    // Assert
    expect(toastData.prevState).toHaveBeenCalled();
  });
});
