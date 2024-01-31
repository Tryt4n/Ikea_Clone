import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../../setup-test/test-utils";
import { LongDescriptionSections } from "./LongDescriptionSections";
import userEvent from "@testing-library/user-event";

describe("ProductPage AdditionalInfo LongDescriptionSections", () => {
  it("should render component with additional sections", () => {
    // Arrange
    const additionalInfo = {
      title: "Additional Information",
      variant: "red",
      header: "Header",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iusto.",
      additionalSections: [
        {
          header: "Section 1",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iusto.",
        },
        {
          header: "Section 2",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iusto.",
        },
      ],
    };

    // Act
    // @ts-expect-error - data does not have all the required properties for AdditionalInfo type
    render(<LongDescriptionSections data={additionalInfo} />);

    const showMoreBtn = screen.getByRole("button");

    // Assert
    expect(
      screen.getByText(additionalInfo.additionalSections[0].header),
    ).toBeInTheDocument();
    expect(
      screen.getByText(additionalInfo.additionalSections[1].header),
    ).toBeInTheDocument();

    expect(showMoreBtn).toBeInTheDocument();
    expect(showMoreBtn).toHaveTextContent(/dowiedz się więcej/i);
    expect(showMoreBtn).toHaveAttribute(
      "aria-label",
      "Naciśnij aby pokazać więcej",
    );
  });

  it(`should toggle container open status`, async () => {
    // Arrange
    const additionalInfo = {
      title: "Additional Information",
      variant: "red",
      header: "Header",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iusto.",
      additionalSections: [
        {
          header: "Section 1",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iusto.",
        },
        {
          header: "Section 2",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iusto.",
        },
      ],
    };

    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    const user = userEvent.setup();

    // Act
    // @ts-expect-error - data does not have all the required properties for AdditionalInfo type
    render(<LongDescriptionSections data={additionalInfo} />);

    const showMoreBtn = screen.getByRole("button");
    const longDescriptionContainer = screen.getByTestId(
      "product-page-long-description-sections",
    );

    // Assert
    expect(longDescriptionContainer).not.toHaveClass("showMore");

    expect(showMoreBtn).toBeInTheDocument();
    expect(showMoreBtn).toHaveTextContent(/dowiedz się więcej/i);
    expect(showMoreBtn).toHaveAttribute(
      "aria-label",
      "Naciśnij aby pokazać więcej",
    );

    // Act - click on showMoreBtn to open additional sections
    await user.click(showMoreBtn);

    // Assert - should be open
    expect(longDescriptionContainer).toHaveClass("showMore");

    expect(showMoreBtn).toHaveTextContent(/pokaż mniej/i);
    expect(showMoreBtn).toHaveAttribute("aria-label", "Naciśnij aby schować");

    // Act - click on showMoreBtn to close additional sections
    await user.click(showMoreBtn);

    // Assert - should be closed
    expect(longDescriptionContainer).not.toHaveClass("showMore");

    expect(showMoreBtn).toHaveTextContent(/dowiedz się więcej/i);
    expect(showMoreBtn).toHaveAttribute(
      "aria-label",
      "Naciśnij aby pokazać więcej",
    );

    expect(scrollToMock).toHaveBeenCalledOnce();
    expect(scrollToMock).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: "smooth",
    });
  });

  it(`should scroll to the top when container is open and showMoreBtn is clicked with "auto" behavior`, async () => {
    // Arrange
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: true })); // mock user's system prefers reduced motion

    const additionalInfo = {
      title: "Additional Information",
      variant: "red",
      header: "Header",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iusto.",
      additionalSections: [
        {
          header: "Section 1",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iusto.",
        },
        {
          header: "Section 2",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, iusto.",
        },
      ],
    };

    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    const user = userEvent.setup();

    // Act
    // @ts-expect-error - data does not have all the required properties for AdditionalInfo type
    render(<LongDescriptionSections data={additionalInfo} />);

    const showMoreBtn = screen.getByRole("button");
    const longDescriptionContainer = screen.getByTestId(
      "product-page-long-description-sections",
    );

    // Assert
    expect(longDescriptionContainer).not.toHaveClass("showMore");

    expect(showMoreBtn).toBeInTheDocument();
    expect(showMoreBtn).toHaveTextContent(/dowiedz się więcej/i);
    expect(showMoreBtn).toHaveAttribute(
      "aria-label",
      "Naciśnij aby pokazać więcej",
    );

    // Act - click on showMoreBtn to open additional sections
    await user.click(showMoreBtn);

    // Assert - should be open
    expect(longDescriptionContainer).toHaveClass("showMore");

    expect(showMoreBtn).toHaveTextContent(/pokaż mniej/i);
    expect(showMoreBtn).toHaveAttribute("aria-label", "Naciśnij aby schować");

    // Act - click on showMoreBtn to close additional sections
    await user.click(showMoreBtn);

    // Assert - should be closed
    expect(longDescriptionContainer).not.toHaveClass("showMore");

    expect(showMoreBtn).toHaveTextContent(/dowiedz się więcej/i);
    expect(showMoreBtn).toHaveAttribute(
      "aria-label",
      "Naciśnij aby pokazać więcej",
    );

    expect(scrollToMock).toHaveBeenCalledOnce();
    expect(scrollToMock).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: "auto",
    });
  });
});
