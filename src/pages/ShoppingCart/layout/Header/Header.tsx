// Import custom hooks
import useModal from "../../../../hooks/useModal/useModal";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import icons
import TripleDotsMenuIcon from "../../../../Icons/TripleDotsMenuIcon";
// Import styles
import "./index.scss";

/**
 * Header is a functional component that takes in a text prop.
 * It uses the useModal custom hook to get the setModalData function.
 * It defines a function to open the shopping cart control modal.
 * It renders a header containing a heading with the text prop and a button that opens the shopping cart control modal when clicked.
 *
 * @param {string} text The text to be displayed in the heading.
 * @returns {JSX.Element} A header containing a heading and a button.
 */

export default function Header({ text }: { text: string }) {
  const { setModalData } = useModal(); // Get the setModalData function using the useModal custom hook.

  // Define a function to open the shopping cart control modal.
  function openShoppingCartControlModal() {
    // Set the modal data to display the shopping cart control modal.
    setModalData({
      type: "shopping-cart-control",
    });
  }

  return (
    <header className="shopping-cart-header">
      <h2>{text}</h2>

      {/* Render a button that opens the shopping cart control modal when clicked. */}
      <Btn
        shape="circle"
        variant="light"
        onClick={openShoppingCartControlModal}
      >
        {/* Add text with visually-hidden class for accessibility. */}
        <span className="visually-hidden">Otwórz menu koszyka</span>
        <TripleDotsMenuIcon />
      </Btn>
    </header>
  );
}
