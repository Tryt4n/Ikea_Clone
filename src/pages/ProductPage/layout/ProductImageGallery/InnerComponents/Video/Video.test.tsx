import { describe, expect, it, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
} from "../../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { Video } from "./Video";

describe("ProductPage Video", () => {
  it("should render component", () => {
    // Arrange
    const src = "video.mp4";
    const openModal = vi.fn();

    // Act
    render(<Video src={src} openModal={openModal} />);

    // Assert
    expect(screen.getByTestId("product-video")).toBeInTheDocument();
  });

  it("should call openModal function", async () => {
    // Arrange
    window.innerWidth = 900;

    const src = "video.mp4";
    const openModal = vi.fn();

    const user = userEvent.setup();

    // Act
    render(<Video src={src} openModal={openModal} />);

    const button = screen.getByRole("button", {
      name: /naciśnij aby powiększyć wideo/i,
    });

    // Assert
    expect(button).toBeInTheDocument();

    // Act - click the button
    await user.click(button);

    // Assert
    expect(openModal).toHaveBeenCalledOnce();
  });

  it("should play/pause video on click", async () => {
    // Arrange
    window.innerWidth = 900;

    const src = "video.mp4";
    const openModal = vi.fn();

    const user = userEvent.setup();

    // Act
    render(<Video src={src} openModal={openModal} />);

    const button = screen.getByRole("button", {
      name: /odtwórz wideo/i,
    });

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("firstPlayback");
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();

    // Act - play video
    await user.click(button);

    // Assert - video should be playing
    expect(button).toHaveTextContent(/zatrzymaj wideo/i);
    expect(button).not.toHaveClass("firstPlayback");
    expect(screen.getByTestId("pause-icon")).toBeInTheDocument();

    // Act - pause video
    await user.click(button);

    // Assert - video should be paused
    expect(button).toHaveTextContent(/odtwórz wideo/i);
    expect(button).not.toHaveClass("firstPlayback");
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();
  });

  it("should play/pause video on touch", () => {
    // Arrange
    window.innerWidth = 899;

    const src = "video.mp4";
    const openModal = vi.fn();

    // Act
    render(<Video src={src} openModal={openModal} />);

    const button = screen.getByRole("button", {
      name: /odtwórz wideo/i,
    });

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("firstPlayback");
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();

    // Act - play video
    fireEvent.touchStart(button);

    // Assert - video should be playing
    expect(button).toHaveTextContent(/zatrzymaj wideo/i);
    expect(button).not.toHaveClass("firstPlayback");
    expect(screen.getByTestId("pause-icon")).toBeInTheDocument();

    // Act - pause video
    fireEvent.touchStart(button);

    // Assert - video should be paused
    expect(button).toHaveTextContent(/odtwórz wideo/i);
    expect(button).not.toHaveClass("firstPlayback");
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();
  });
});
