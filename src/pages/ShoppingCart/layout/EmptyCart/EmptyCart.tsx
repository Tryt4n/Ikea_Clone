// Import icons
import AvatarIcon from "../../../../Icons/AvatarIcon";
// Import styles
import "./index.scss";

/**
 * EmptyCart is a functional component that renders a section containing a prompt for the user to join or log in.
 * It includes a heading, a link for the user to join or log in, and an AvatarIcon component.
 *
 * @returns {JSX.Element} A section containing a prompt for the user to join or log in, and an AvatarIcon component.
 */

export default function EmptyCart() {
  return (
    <section className="empty-cart">
      <div className="empty-cart__inner-wrapper">
        <h3>Masz konto?</h3>
        <div>
          <a
            href="#"
            className="empty-cart__login-link"
          >
            Dołącz lub zaloguj się
          </a>
          &nbsp;aby szybko i sprawnie dokonywać zakupów i uzyskać dostęp do historii zamówień.
        </div>
      </div>

      <div className="empty-cart__svg-wrapper">
        <AvatarIcon />
      </div>
    </section>
  );
}
