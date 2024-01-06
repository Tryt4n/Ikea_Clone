// Import components
import ListItem from "../../../../components/ui/ListItem/ListItem";
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import icons
import ChevronRightIcon from "../../../../Icons/ChevronRightIcon";
import DiscountIcon from "../../../../Icons/DiscountIcon";
// Import styles
import "./index.scss";

/**
 * Login is a React component that renders a login modal.
 * The modal includes a header with a greeting and a login button, and a list of links.
 * The links include joining IKEA Family, joining IKEA Business Network, checking the latest IKEA Family offers, your discount codes, finding your purchases, tracking and managing your order, creating a shopping list, and planning tools.
 * The component uses the ListItem and Btn components, and the ChevronRightIcon and DiscountIcon icons.
 *
 * @returns {JSX.Element} - The component that displays a login modal.
 */

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
