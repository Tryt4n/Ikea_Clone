import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { SortingButton } from "./SortingButton";
import useList from "../../../hooks/useList";
import { exampleList } from "../../../../../setup-test/test-constants/exampleList";
import type {
  ListReducerActionsType,
  SortingTypes,
} from "../../../context/ListContext";

vi.mock("../../../hooks/useList");

describe("ListProductSortingButton", () => {
  const listState = exampleList;
  const listDispatch = vi.fn();

  beforeEach(() => {
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: listState,
      listDispatch: listDispatch,
    });
  });

  it("should render a component", () => {
    // Arrange
    const btnText = "Button";
    const dispatchAction: ListReducerActionsType = { type: "sortByName" };
    const variant: SortingTypes = "name";

    // Act
    render(
      <SortingButton dispatchAction={dispatchAction} variant={variant}>
        {btnText}
      </SortingButton>,
    );

    const btn = screen.getByRole("button", { name: btnText });

    // Assert
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("btn--gray");
  });

  it("should add `light-with-border` button type if list sorting type is the same as button variant", () => {
    // Arrange
    const btnText = "Button";
    const dispatchAction: ListReducerActionsType = { type: "sortByName" };
    const variant: SortingTypes = "name";

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: {
        ...listState,
        listSorting: variant,
      },
    });

    // Act
    render(
      <SortingButton dispatchAction={dispatchAction} variant={variant}>
        {btnText}
      </SortingButton>,
    );

    const btn = screen.getByRole("button", { name: btnText });

    // Assert
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("btn--light-with-border");
  });

  it("should sort list based on action type", async () => {
    // Arrange
    const btnText = "Button";
    const dispatchAction: ListReducerActionsType = { type: "sortByName" };
    const variant: SortingTypes = "name";

    const user = userEvent.setup();

    // Act
    render(
      <SortingButton dispatchAction={dispatchAction} variant={variant}>
        {btnText}
      </SortingButton>,
    );

    const btn = screen.getByRole("button", { name: btnText });

    await user.click(btn);

    // Assert
    expect(listDispatch).toHaveBeenCalledOnce();
    expect(listDispatch).toHaveBeenCalledWith(dispatchAction);
  });

  it("should restore the list sorting to basic", async () => {
    // Arrange
    const btnText = "Button";
    const dispatchAction: ListReducerActionsType = { type: "sortByName" };
    const variant: SortingTypes = "name";

    const user = userEvent.setup();

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      listState: {
        ...listState,
        listSorting: variant,
      },
      listDispatch: listDispatch,
    });

    // Act
    render(
      <SortingButton dispatchAction={dispatchAction} variant={variant}>
        {btnText}
      </SortingButton>,
    );

    const btn = screen.getByRole("button", { name: btnText });

    await user.click(btn);

    // Assert
    expect(listDispatch).toHaveBeenCalledOnce();
    expect(listDispatch).toHaveBeenCalledWith({
      type: "sortByDate",
      payload: "oldest",
    });
  });
});
