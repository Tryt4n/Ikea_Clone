// Import custom hooks
import useModal from "../../../../hooks/useModal/useModal";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import icons
import HeartIcon from "../../../../Icons/HeartIcon";

/**
 * ListCreation is a functional component that renders a section for creating a new list.
 *
 * It uses the custom hook useModal to access the modal state and actions.
 *
 * The component renders a section element containing a HeartIcon, headings, paragraphs, and buttons.
 *
 * The first button is used to open the create list modal. When clicked, it calls the openCreateListModal function,
 * which sets the modal data to { type: "create-list" }.
 *
 * @returns {JSX.Element} A section element with a HeartIcon, headings, paragraphs, and buttons.
 */

export function ListCreation() {
  const { setModalData } = useModal(); // Use the custom hook useModal to access the modal state and actions

  // Function to open the create list modal
  function openCreateListModal() {
    setModalData({ type: "create-list" });
  }

  return (
    <section className="favourite-lists__content-wrapper">
      <HeartIcon />

      <h3>Wiele list, jeden dom</h3>

      <p>
        Znajdź wszystkie swoje listy w jednym miejscu. Podziel swoje ulubione listy na kategorie i
        zapisz je tutaj.
      </p>

      <p>Nie możesz znaleźć swoich list? Upewnij się, że jesteś zalogowany.</p>

      <div className="favourite-lists__btns-wrapper">
        <Btn onClick={openCreateListModal}>Stwórz listę</Btn>
        <Btn variant="white-with-border">Zaloguj się</Btn>
      </div>
    </section>
  );
}
