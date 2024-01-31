import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import useModal from "../../../../hooks/useModal/useModal";
import AdditionalInformations from "./AdditionalInformations";

vi.mock("../../../../hooks/useModal/useModal");

describe("Modal AdditionalInformations variant", () => {
  const closeModal = vi.fn();

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      closeModal: closeModal,
    });
  });

  it("should render a refund component", () => {
    // Act
    render(<AdditionalInformations type="refund" />);

    // Assert
    expect(
      screen.getByText(/Nie przyjmujemy zwrotów kart upominkowych/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Aby uzyskać więcej informacji/i }),
    ).toBeInTheDocument();
  });

  it("should render a data-encryption component", () => {
    // Act
    render(<AdditionalInformations type="data-encryption" />);

    // Assert
    expect(
      screen.getByText(/Strona www.ikea.com została uznana za gwarantująca/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Więcej informacji możesz znaleźć/i,
      }),
    ).toBeInTheDocument();
  });

  it("should call closeModal on button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<AdditionalInformations type="data-encryption" />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(closeModal).toHaveBeenCalledOnce();
  });
});
