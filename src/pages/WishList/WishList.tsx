// Custom Hooks
import useModal from "../../hooks/useModal";
// Components
import Btn from "../../components/Btn/Btn";
// Icons
import HeartIcon from "../../Icons/HeartIcon";
// Style
import "./index.scss";

export default function WishList() {
  const { setIsModalOpen, setModalData } = useModal();

  function openCreateModal() {
    setIsModalOpen(true);
    setModalData({ type: "create-list" });
  }

  return (
    <article className="wish-list">
      <hgroup className="wish-list__header">
        <h2>Hej!</h2>
        <p>Zacznij organizować swoją wymarzoną przestrzeń.</p>
      </hgroup>

      <section className="wish-list__content-wrapper">
        <HeartIcon />

        <h3>Wiele list, jeden dom</h3>

        <p>
          Znajdź wszystkie swoje listy w jednym miejscu. Podziel swoje ulubione listy na kategorie i
          zapisz je tutaj.
        </p>
        <p>Nie możesz znaleźć swoich list? Upewnij się, że jesteś zalogowany.</p>

        <div className="wish-list__btns-wrapper">
          <Btn onClick={openCreateModal}>Stwórz listę</Btn>
          <Btn variant="white-with-border">Zaloguj się</Btn>
        </div>
      </section>
    </article>
  );
}
