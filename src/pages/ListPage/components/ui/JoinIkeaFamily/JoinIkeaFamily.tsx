// Import components
import { Btn } from "../../../../../components/ui/Btn/Btn";
// Import styles
import "./index.scss";

/**
 * JoinIkeaFamily is a component that renders a section inviting the user to join the IKEA Family.
 *
 * It displays a title, a paragraph of text, and a button. The button is rendered using the Btn component.
 *
 * @returns A li element with a section containing a title, a paragraph of text, and a button.
 */

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
