// Components
import { Btn } from "../../../../components/Btn/Btn";
// Styles
import "./index.scss";

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
