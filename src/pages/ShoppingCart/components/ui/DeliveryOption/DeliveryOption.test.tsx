import { render, screen } from "../../../../../setup-test/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { DeliveryOption } from "./DeliveryOption";
import { deliveryOptions } from "../../../../../constants/deliveryOptions";
import useApp from "../../../../../hooks/useApp/useApp";
import useModal from "../../../../../hooks/useModal/useModal";
import { initState } from "../../../../../context/AppContext/constants/appInitState";

vi.mock("../../../../../hooks/useApp/useApp");
vi.mock("../../../../../hooks/useModal/useModal");

describe("ShoppingCart page DeliveryOption", () => {
  const state = initState;
  const setModalData = vi.fn();

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });
  });

  it("should render a component with home delivery", async () => {
    // Arrange
    const onChangeFunction = vi.fn();
    const item = deliveryOptions[0];
    const checkedStatus = true;

    const user = userEvent.setup();

    // Act
    render(
      <DeliveryOption
        item={item}
        onChangeFunction={onChangeFunction}
        checkedStatus={checkedStatus}
      />,
    );

    const input = screen.getByRole("radio");

    // Assert
    expect(input).toBeChecked();

    await user.click(input);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({ type: "postal-code" });
  });

  it("should render a component with other options", async () => {
    // Arrange
    const onChangeFunction = vi.fn();
    const item = deliveryOptions[1];
    const checkedStatus = true;

    const user = userEvent.setup();

    // Act
    render(
      <DeliveryOption
        item={item}
        onChangeFunction={onChangeFunction}
        checkedStatus={checkedStatus}
      />,
    );

    const input = screen.getByRole("radio");

    // Assert
    expect(input).toBeChecked();

    await user.click(input);

    // Assert
    expect(setModalData).not.toHaveBeenCalled();
  });

  it("should not call setModalData when postal code exist", async () => {
    // Arrange
    const onChangeFunction = vi.fn();
    const item = deliveryOptions[0];
    const checkedStatus = true;

    const state = {
      ...initState,
      postalCode: "12-345",
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    const user = userEvent.setup();

    // Act
    render(
      <DeliveryOption
        item={item}
        onChangeFunction={onChangeFunction}
        checkedStatus={checkedStatus}
      />,
    );

    const input = screen.getByRole("radio");

    await user.click(input);

    // Assert
    expect(setModalData).not.toHaveBeenCalled();
  });

  it("should call onChange function", async () => {
    // Arrange
    const item1 = deliveryOptions[0];
    const item2 = deliveryOptions[1];
    const checkedInput: (typeof deliveryOptions)[number]["option"] | null =
      null;
    const onChangeFunction = vi.fn();

    const user = userEvent.setup();

    // Act
    render(
      <>
        <DeliveryOption
          item={item1}
          onChangeFunction={onChangeFunction}
          checkedStatus={checkedInput === item1.option}
        />
        <DeliveryOption
          item={item2}
          onChangeFunction={onChangeFunction}
          checkedStatus={checkedInput === item2.option}
        />
      </>,
    );

    const input1 = screen.getByRole("radio", { name: /dostawa do domu/i });
    const input2 = screen.getByRole("radio", { name: /opcje odbioru:/i });

    // Assert
    expect(input1).not.toBeChecked();
    expect(input2).not.toBeChecked();

    // Act - click input2
    await user.click(input2);

    // Assert
    expect(onChangeFunction).toHaveBeenCalledOnce();
  });
});
