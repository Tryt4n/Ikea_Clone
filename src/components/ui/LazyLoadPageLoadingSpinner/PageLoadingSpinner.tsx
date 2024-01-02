// Import components
import LoadingSpinner from "../LazyLoadLoadingSpinner/LoadingSpinner";
// Import styles
import "./index.scss";

/**
 * PageLoadingSpinner component
 *
 * This component displays a full page loading spinner with a visually hidden "Ładowanie strony" label for accessibility.
 *
 * @returns A div element with a "page-loading-spinner" class, containing another div with a "page-loading-spinner__spinner-wrapper" class, a visually hidden "Ładowanie strony" heading, and a LoadingSpinner component.
 */
export default function PageLoadingSpinner() {
  return (
    <div className="page-loading-spinner">
      <div className="page-loading-spinner__spinner-wrapper">
        {/* // Render a visually hidden "Ładowanie strony" heading for accessibility */}
        <h2 className="visually-hidden">Ładowanie strony</h2>
        <LoadingSpinner />
      </div>
    </div>
  );
}
