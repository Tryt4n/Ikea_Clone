// Import styles
import "./index.scss";

/**
 * LoadingSpinner component
 *
 * This component displays a loading spinner with a visually hidden "Ładowanie" label for accessibility.
 *
 * @returns A div element with a "loading-spinner-wrapper" class, containing a span with a "loading-spinner" class and a visually hidden "Ładowanie" label.
 */
export default function LoadingSpinner() {
  return (
    <div
      className="loading-spinner-wrapper"
      role="presentation" // Set the role to "presentation" to indicate that this div is purely presentational and should not be read out by screen readers
    >
      <span className="loading-spinner" />

      {/* // Render a visually hidden "Ładowanie" label for accessibility */}
      <span className="visually-hidden">Ładowanie</span>
    </div>
  );
}
