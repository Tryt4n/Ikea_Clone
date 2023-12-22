// Components
import JoinIkeaFamily from "../../components/JoinIkeaFamily/JoinIkeaFamily";
import { BuyOnlineGrid } from "../BuyOnlineGrid/BuyOnlineGrid";
// Styles
import "./index.scss";

export default function ProductsGrid() {
  return (
    <ul className="products-grid">
      <JoinIkeaFamily />

      <BuyOnlineGrid />
    </ul>
  );
}
