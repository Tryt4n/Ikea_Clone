import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { ProductsBtnsControl } from "./ProductsBtnsControl";
import useApp from "../../../../../hooks/useApp/useApp";
import useModal from "../../../../../hooks/useModal/useModal";
import useList from "../../../hooks/useList";
import { initState } from "../../../../../context/AppContext/constants/appInitState";
import { exampleList } from "../../../../../setup-test/test-constants/exampleList";

vi.mock("../../../../../hooks/useApp/useApp");
vi.mock("../../../../../hooks/useModal/useModal");
vi.mock("../../../hooks/useList");

describe("ProductsBtnsControl", () => {
  const state = {
    ...initState,
    editingList: exampleList,
  };
  const setModalData = vi.fn();
  let managedProducts = [exampleList.products![0], exampleList.products![1]];
  const setManagedProducts = vi.fn(() => {
    managedProducts = [];
  });

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: exampleList,
      managedProducts: managedProducts,
      setManagedProducts: setManagedProducts,
    });
  });

  it("should render two buttons for managing products and clearing all products", () => {
    // Act
    render(<ProductsBtnsControl />);
    const manageBtn = screen.getByText("Zarządzaj");
    const clearBtn = screen.getByText("Wyczyść wszystko");

    // Assert
    expect(manageBtn).toBeInTheDocument();
    expect(clearBtn).toBeInTheDocument();
  });

  it("should open modal on manage button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ProductsBtnsControl />);
    const manageBtn = screen.getByText("Zarządzaj");

    await user.click(manageBtn);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "manage-products-in-list",
      products: managedProducts,
    });
  });

  it("should clear managed products list on clear button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ProductsBtnsControl />);

    const clearBtn = screen.getByText("Wyczyść wszystko");

    await user.click(clearBtn);

    // Assert
    expect(setManagedProducts).toHaveBeenCalledOnce();
    expect(setManagedProducts).toHaveBeenCalledWith([]);
    expect(managedProducts).toEqual([]);
  });

  it("should clear managed products list when some products are moved to another list", async () => {
    // Arrange
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: {
        ...initState,
        editingList: exampleList,
      },
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      // Pretend that the list has only one product, so that the managed products list is cleared
      listState: { ...exampleList, products: [exampleList.products![0]] },
      managedProducts: managedProducts,
      setManagedProducts: setManagedProducts,
    });

    // Act
    render(<ProductsBtnsControl />);

    // Assert
    expect(setManagedProducts).toHaveBeenCalledOnce();
    expect(setManagedProducts).toHaveBeenCalledWith([]);
    expect(managedProducts).toEqual([]);
  });
});
