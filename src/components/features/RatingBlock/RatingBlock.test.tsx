import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import RatingBlock from "./RatingBlock";

describe("RatingBlock", () => {
  it("should render the rating score and number of ratings when given a valid rating object", () => {
    // Arrange
    const rating = {
      rate: 4.5,
      quantity: 10,
    };

    // Act
    render(<RatingBlock rating={rating} />);

    // Assert
    expect(screen.getByText(`Ocena: ${rating.rate}`)).toBeInTheDocument();
    expect(screen.getByText(`Liczba ocen:`)).toBeInTheDocument();
    expect(screen.getByText(`${rating.quantity}`)).toBeInTheDocument();
  });

  it("should render the correct number of filled and empty stars based on the rating score", () => {
    // Arrange
    const rating = {
      rate: 3.5,
      quantity: 10,
    };

    // Act
    render(<RatingBlock rating={rating} />);
    const filledStars = screen.getAllByTestId("rating-star-icon");
    const emptyStars = screen.getAllByTestId("rating-star-empty-icon");
    const halfStar = screen.getByTestId("rating-star-half-icon");

    // Assert
    expect(filledStars.length).toBe(3);
    expect(emptyStars.length).toBe(1);
    expect(halfStar).toBeInTheDocument();
  });

  it("should render 5 empty stars if the rating score is 0", () => {
    // Arrange
    const rating = {
      rate: 0,
      quantity: 10,
    };

    // Act
    render(<RatingBlock rating={rating} />);

    // Assert
    const emptyStars = screen.getAllByTestId("rating-star-empty-icon");
    expect(emptyStars.length).toBe(5);
  });

  it("should render 5 filled stars if the rating score is 5", () => {
    // Arrange
    const rating = {
      rate: 5,
      quantity: 10,
    };

    // Act
    render(<RatingBlock rating={rating} />);

    // Assert
    const filledStars = screen.getAllByTestId("rating-star-icon");
    expect(filledStars.length).toBe(5);
  });

  it("should render long version of the rating when the longVersion prop is true", () => {
    // Arrange
    const rating = {
      rate: 3.5,
      quantity: 10,
    };

    // Act
    render(<RatingBlock rating={rating} longVersion={true} />);

    // Assert
    expect(screen.getByText(`${rating.quantity} recenzji`)).toBeInTheDocument();
  });
});
