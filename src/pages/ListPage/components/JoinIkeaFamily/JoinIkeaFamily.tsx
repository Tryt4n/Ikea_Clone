// Components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Style
import "./index.scss";

export default function JoinIkeaFamily() {
  return (
    <li className="join-family">
      <section className="join-family__inner-wrapper">
        <h3 className="tx-blue">Zapisz swoje postępy i korzystaj ze zniżek IKEA Family</h3>

        <p>
          Twoje listy są tylko tymczasowe. Zaloguj się, aby skorzystać ze zniżek członkowskich i
          upewnić się, że Twoje listy nadal tu są, gdy wrócisz.
        </p>

        <Btn variant="blue">Dołącz lub zaloguj się</Btn>
      </section>
    </li>
  );
}
