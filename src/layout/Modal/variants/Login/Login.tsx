// Components
import ListItem from "../../../../components/ListItem/ListItem";
import Btn from "../../../../components/Btn/Btn";
// Icons
import ChevronRightIcon from "../../../../Icons/ChevronRightIcon";
import DiscountIcon from "../../../../Icons/DiscountIcon";
// Style
import "./index.scss";

export default function Login() {
  return (
    <div className="login-modal">
      <div className="login-modal__header">
        <strong>Hej!</strong>
        <Btn>Zaloguj się</Btn>
      </div>

      <ul>
        <ListItem
          link="#"
          className="login-modal__link-with-border-wrapper"
        >
          Dołącz do IKEA Family
          <span className="login-modal__join-link-icon-wrapper">
            <ChevronRightIcon />
          </span>
        </ListItem>
        <ListItem
          link="#"
          className="login-modal__link-with-border-wrapper"
        >
          Dołącz do IKEA Business Network
          <span className="login-modal__join-link-icon-wrapper">
            <ChevronRightIcon />
          </span>
        </ListItem>

        <ListItem
          link="#"
          className="login-modal__family-offer-link"
        >
          <div className="login-modal__family-offer-link-inner-wrapper">
            <DiscountIcon />
            <span>Sprawdź najnowsze oferty IKEA Family</span>
            <ChevronRightIcon />
          </div>
        </ListItem>

        <ListItem
          link="#"
          className="login-modal__link-wrapper"
        >
          Twoje kody rabatowe
        </ListItem>
        <ListItem
          link="#"
          className="login-modal__link-wrapper"
        >
          Znajdź swoje zakupy
        </ListItem>
        <ListItem
          link="#"
          className="login-modal__link-wrapper"
        >
          Śledź i zarządzaj zamówieniem
        </ListItem>
        <ListItem
          link="#"
          className="login-modal__link-wrapper"
        >
          Utwórz listę zakupów
        </ListItem>
        <ListItem
          link="#"
          className="login-modal__link-wrapper"
        >
          Narzędzia do planowania
        </ListItem>
      </ul>
    </div>
  );
}
