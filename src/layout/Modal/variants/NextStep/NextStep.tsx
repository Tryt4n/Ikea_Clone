// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import styles
import "./index.scss";

/**
 * `NextStep` is a React component that displays a list of benefits and two buttons for the user to continue with an IKEA Family card or as a guest.
 * It uses the `Btn` component to create the buttons.
 *
 * @returns {JSX.Element} The rendered `NextStep` component.
 */

export default function NextStep() {
  return (
    <div className="next-step">
      <strong className="next-step__list-heading">Dołącz już dziś</strong>
      <ul className="next-step__list">
        <li>Oszczędzaj z kartą IKEA Family</li>
        <li>Zwracaj zakupy bez paragonu</li>
        <li>Daj się zaskoczyć specjalnymi ofertami</li>
      </ul>

      <div className="next-step__btns-container">
        <Btn variant="white-with-border">Kontynuuj z kartą IKEA Family</Btn>
        <span className="next-step__btns-divider">lub</span>
        <Btn>Kontynuuj jako gość</Btn>
      </div>
    </div>
  );
}
