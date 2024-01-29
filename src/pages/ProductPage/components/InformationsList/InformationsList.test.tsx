import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import InformationsList from "./InformationsList";
import useModal from "../../../../hooks/useModal/useModal";

vi.mock("../../../../hooks/useModal/useModal");

describe("ProductPage InformationItem", () => {
  const setModalData = vi.fn();

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it("should render a list of information items", () => {
    // Act
    render(<InformationsList />);

    const listItems = screen.getAllByRole("listitem");

    // Assert
    expect(listItems).toHaveLength(4);
  });

  it("should render a list of information items with rating", () => {
    // Arrange
    const rating = {
      rate: 4.5,
      quantity: 57,
    };

    // Act
    render(<InformationsList rating={rating} />);

    const listItems = screen.getAllByRole("listitem");

    // Assert
    expect(listItems).toHaveLength(5);
  });

  it("should open product information modal", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<InformationsList />);

    const button = screen.getByRole("button", {
      name: /informacje o produkcie/i,
    });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "product-information" });
  });

  it("should open items included modal", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<InformationsList />);

    const button = screen.getByRole("button", {
      name: /elementy w zestawie/i,
    });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "items-included" });
  });

  it("should open dimensions modal", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<InformationsList />);

    const button = screen.getByRole("button", {
      name: /wymiary/i,
    });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "dimensions" });
  });

  it("should open installment purchase modal", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<InformationsList />);

    const button = screen.getByRole("button", {
      name: /na raty w ikea/i,
    });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "installment-purchase" });
  });

  it("should open ratings modal", async () => {
    // Arrange
    const rating = {
      rate: 4.5,
      quantity: 57,
    };

    const user = userEvent.setup();

    // Act
    render(<InformationsList rating={rating} />);

    const button = screen.getByRole("button", {
      name: /opinie/i,
    });

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "ratings" });
  });
});
