// Import constants
import { subFooterList } from "../../../../constants/footerLists";
// Import styles
import "./index.scss";

/**
 * SubList
 *
 * Component that serves as a sub-list for the footer of the application. It renders a list of links.
 *
 * The component uses the `subFooterList` constant from the `footerLists` module to provide the data for the links.
 *
 * @returns {JSX.Element} The SubList component.
 */

export default function SubList() {
  return (
    <ul className="sub-footer-list">
      {/* Map through the `subFooterList` constant and render the links */}
      {subFooterList.map((link) => (
        <li key={link}>
          <a href="#">{link}</a>
        </li>
      ))}
    </ul>
  );
}
