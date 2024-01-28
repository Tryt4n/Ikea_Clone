import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import ProductFilters from "./ProductFilters";
import useList from "../../hooks/useList";
import { exampleList } from "../../../../setup-test/test-constants/exampleList";

vi.mock("../../hooks/useList");

describe("ProductFilters", () => {
  it("should render a component with <ManageProducts /> if managed products list is not empty", () => {
    // Arrange
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      managedProducts: exampleList.products,
    });

    // Act
    render(<ProductFilters />);

    const managedProducts = screen.getByRole("list");

    // Assert
    expect(managedProducts).toBeInTheDocument();
  });
});
