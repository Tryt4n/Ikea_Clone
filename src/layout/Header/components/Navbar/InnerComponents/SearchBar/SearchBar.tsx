// Import icons
import MagnifierIcon from "../../../../../../Icons/MagnifierIcon";

/**
 * SearchBar
 *
 * Component that serves as the search bar for the application. It renders a form with a search input field.
 *
 * The component uses the `form` HTML element to group the search input and the associated label.
 * It also uses the `MagnifierIcon` component to display a magnifier icon in the search bar.
 *
 * The form has the `autoComplete` attribute set to "off" to prevent the browser from automatically filling in the input field.
 * The form's `onSubmit` event handler prevents the default form submission behavior.
 *
 * @returns {JSX.Element} The SearchBar component.
 */

export function SearchBar() {
  return (
    <form
      className="navbar__searchbar-wrapper searchbar"
      autoComplete="off" // Prevent the browser from automatically filling in the input field
      onSubmit={(e) => e.preventDefault()} // Prevent the default form submission behavior
    >
      {/* Label with the `visually-hidden` class to hide it. For accessibility purposes and SEO */}
      <label htmlFor="search-product" className="visually-hidden">
        Czego szukasz?
      </label>

      <div className="navbar__searchbar-icon">
        <MagnifierIcon />
      </div>

      <input
        type="search"
        name="search-product"
        id="search-product"
        className="navbar__searchbar"
        placeholder="Czego szukasz?"
      />
    </form>
  );
}
