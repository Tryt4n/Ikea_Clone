// Components
import Btn from "../../../../components/Btn/Btn";
// Icons
import TripleDotsMenuIcon from "../../../../Icons/TripleDotsMenuIcon";
// Style
import "./index.scss";

export default function Header({ text }: { text: string }) {
  function openModal() {}

  return (
    <header className="shopping-cart-header">
      <h2>{text}</h2>

      <Btn
        shape="circle"
        variant="light"
        //TODO ADD MODAL FUNCTIONALITY
        onClick={openModal}
      >
        <span className="visually-hidden">Otwórz menu koszyka</span>
        <TripleDotsMenuIcon />
      </Btn>
    </header>
  );
}
