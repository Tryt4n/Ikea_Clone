// Custom Hooks
import useModal from "../../../../hooks/useModal";
// Components
import Btn from "../../../../components/Btn/Btn";
// Icons
import TripleDotsMenuIcon from "../../../../Icons/TripleDotsMenuIcon";
// Style
import "./index.scss";

export default function Header({ text }: { text: string }) {
  const { openModal, setModalData } = useModal();

  function openShoppingCartControlModal() {
    openModal();
    setModalData({
      type: "shopping-cart-control",
    });
  }

  return (
    <header className="shopping-cart-header">
      <h2>{text}</h2>

      <Btn
        shape="circle"
        variant="light"
        onClick={openShoppingCartControlModal}
      >
        <span className="visually-hidden">Otwórz menu koszyka</span>
        <TripleDotsMenuIcon />
      </Btn>
    </header>
  );
}
