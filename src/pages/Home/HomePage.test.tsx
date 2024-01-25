import { describe, expect, it, vi } from "vitest";
import { render, renderWithRoutes, screen } from "../../setup-test/test-utils";
import useFetch from "../../hooks/useFetch/useFetch";
import HomePage from "./HomePage";
import type { ArticlesType } from "../../layout/Articles/types/ArticleTypes";
import { articles } from "../../setup-test/test-constants/articles";

vi.mock("../../hooks/useFetch/useFetch");

describe("HomePage", () => {
  it("should render a component with loading state at start", () => {
    // Arrange
    (useFetch as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    // Act
    render(<HomePage />);

    const loadingSpinner = screen.getByRole("heading", {
      name: /ładowanie/i,
      level: 2,
    });

    // Assert
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("should render a component with error state if an error has occurred", () => {
    // Arrange
    (useFetch as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
    });

    // Act
    render(<HomePage />);

    const errorFallback = screen.getByRole("heading", {
      name: /nie można załadować strony/i,
      level: 2,
    });

    // Assert
    expect(errorFallback).toBeInTheDocument();
  });

  it("should render a component with data if the data has loaded successfully", () => {
    // Arrange
    const { mock } = (
      useFetch as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { id: "some id", articles } as ArticlesType,
    });

    // Act
    // Render with routes because <ScrollRestoration /> is used in HomePage and it needs to be rendered inside a <Router /> component instead od <MemoryRouter>
    renderWithRoutes(<HomePage />);

    const articlesContainer = screen.getByTestId("home-page-articles");

    // Assert
    expect(articlesContainer).toBeInTheDocument();
    expect(articlesContainer.children).toHaveLength(
      mock.results[0].value.data.articles.length,
    );
  });
});
