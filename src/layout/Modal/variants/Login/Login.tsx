// Components
import Btn from "../../../../components/Btn/Btn";
// Icons
import ChevronRightIcon from "../../../../Icons/ChevronRightIcon";
import DiscountIcon from "../../../../Icons/DiscountIcon";

export default function Login() {
  return (
    <div className="login-modal">
      <div className="login-modal__header">
        <strong>Hej!</strong>
        <Btn>Zaloguj się</Btn>
      </div>

      <ul>
        <li className="login-modal__link-with-border-wrapper">
          <a
            href="#"
            className="login-modal__join-link"
          >
            Dołącz do IKEA Family
            <span className="login-modal__join-link-icon-wrapper">
              <ChevronRightIcon />
            </span>
          </a>
        </li>
        <li className="login-modal__link-with-border-wrapper">
          <a
            href="#"
            className="login-modal__join-link"
          >
            Dołącz do IKEA Business Network
            <span className="login-modal__join-link-icon-wrapper">
              <ChevronRightIcon />
            </span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="login-modal__family-offer-link"
          >
            <div className="login-modal__family-offer-link-inner-wrapper">
              <DiscountIcon />
              <span>Sprawdź najnowsze oferty IKEA Family</span>
              <ChevronRightIcon />
            </div>
          </a>
        </li>
        <li className="login-modal__link-wrapper">
          <a href="#">Twoje kody rabatowe</a>
        </li>
        <li className="login-modal__link-wrapper">
          <a href="#">Znajdź swoje zakupy</a>
        </li>
        <li className="login-modal__link-wrapper">
          <a href="#">Śledź i zarządzaj zamówieniem</a>
        </li>
        <li className="login-modal__link-wrapper">
          <a href="#">Utwórz listę zakupów</a>
        </li>
        <li className="login-modal__link-wrapper">
          <a href="#">Narzędzia do planowania</a>
        </li>
      </ul>
    </div>
  );
}
