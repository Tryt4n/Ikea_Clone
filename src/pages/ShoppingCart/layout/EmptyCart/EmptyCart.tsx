import AvatarIcon from "../../../../Icons/AvatarIcon";
import "./index.scss";

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
