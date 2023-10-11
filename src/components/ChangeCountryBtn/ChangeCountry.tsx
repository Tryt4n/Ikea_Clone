import GlobeIcon from "../../Icons/GlobeIcon";
import "./index.scss";

export default function ChangeCountry() {
  return (
    <a
      href="#"
      className="change-country"
    >
      <GlobeIcon />
      <span>Zmień kraj</span>
    </a>
  );
}
