import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { MoreOptionsList } from "./MoreOptionsList";
import { shoppingCart } from "../../../../../setup-test/test-constants/shoppingCart";
import useModal from "../../../../../hooks/useModal/useModal";

vi.mock("../../../../../hooks/useModal/useModal");

describe("ListProductMoreOptionsList", () => {
  const setModalData = vi.fn();

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it("should render a component", () => {
    // Act
    render(<MoreOptionsList product={shoppingCart[0]} />);

    const optionsList = screen.getByRole("list");

    // Assert
    expect(optionsList).toBeInTheDocument();
    expect(optionsList.children).toHaveLength(3);
  });

  it("should open a modal on more options button click", async () => {
    // Arrange
    const product = shoppingCart[0];

    const user = userEvent.setup();

    // Act
    render(<MoreOptionsList product={product} />);

    const btn = screen.getByText(/więcej opcji/i);

    await user.click(btn);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "more-options-for-product-in-list",
      products: [product],
    });
  });
});
