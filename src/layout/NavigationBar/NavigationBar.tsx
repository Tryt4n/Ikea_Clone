// Hooks
import useWindowSize from "../../hooks/useWindowSize";
// Icons
import ShopIcon from "../../Icons/ShopIcon";
import TruckIcon from "../../Icons/TruckIcon";
// Style
import "./index.scss";

export default function NavigationBar() {
  const { width } = useWindowSize();

  return (
    <div className="page-container navigation-bar">
      {width >= 1200 && (
        <nav className="navigation-bar__nav">
          <ul className="">
            <li>
              <a
                href="#"
                autoFocus
              >
                Produkty
              </a>
            </li>
            <li>
              <a href="#">Pomieszczenia</a>
            </li>
            <li>
              <a href="#">Oferty</a>
            </li>
            <li>
              <a href="#">Nowości</a>
            </li>
            <li>
              <a href="#">Przechowywanie w całym domu</a>
            </li>
          </ul>
        </nav>
      )}
      <div className="navigation-bar__btns-container">
        <button className="navigation-bar__btn-wrapper">
          <TruckIcon />
          <span>Wpisz kod pocztowy</span>
        </button>
        <button className="navigation-bar__btn-wrapper">
          <ShopIcon />
          <span>Wybierz sklep</span>
        </button>
      </div>
    </div>
  );
}
