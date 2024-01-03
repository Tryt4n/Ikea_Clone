// Import components
import JoinIkeaFamily from "../../components/ui/JoinIkeaFamily/JoinIkeaFamily";
import { BuyOnlineGrid } from "../BuyOnlineGrid/BuyOnlineGrid";
// Import styles
import "./index.scss";

/**
 * ProductsGrid is a functional component that renders an unordered list containing two components:
 * - JoinIkeaFamily: A component that displays a prompt for the user to join the Ikea Family program.
 * - BuyOnlineGrid: A component that displays a grid of products available for online purchase.
 *
 * @returns {JSX.Element} An unordered list containing the JoinIkeaFamily and BuyOnlineGrid components.
 */

export default function ProductsGrid() {
  return (
    <ul className="products-grid">
      <JoinIkeaFamily />

      <BuyOnlineGrid />
    </ul>
  );
}
