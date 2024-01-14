import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import Switch, { type SwitchType } from "./Switch";

describe("Switch", () => {
  it("should render two buttons with common and respective props", () => {
    // Arrange
    const firstBtnText = "Button 1";
    const secondBtnText = "Button 2";

    const firstPropertyProps: SwitchType["firstPropertyProps"] = {
      children: firstBtnText,
      type: "button",
    };
    const secondPropertyProps: SwitchType["secondPropertyProps"] = {
      children: secondBtnText,
      type: "reset",
    };
    const props: SwitchType["props"] = { variant: "light" };

    // Act
    render(
      <Switch
        firstPropertyProps={firstPropertyProps}
        secondPropertyProps={secondPropertyProps}
        props={props}
      />,
    );

    const firstBtn = screen.getByRole("button", { name: firstBtnText });
    const secondBtn = screen.getByRole("button", { name: secondBtnText });

    // Assert
    expect(firstBtn).toBeInTheDocument();
    expect(firstBtn).toHaveClass("btn--light");
    expect(firstBtn).toHaveAttribute("type", "button");

    expect(secondBtn).toBeInTheDocument();
    expect(secondBtn).toHaveClass("btn--light");
    expect(secondBtn).toHaveAttribute("type", "reset");
  });
});
