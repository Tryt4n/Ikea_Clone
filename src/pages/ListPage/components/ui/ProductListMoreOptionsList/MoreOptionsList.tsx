// Import custom hooks
import useModal from "../../../../../hooks/useModal";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext";

/**
 * MoreOptionsList is a functional component that receives a product of type ShoppingCartType as a prop.
 * It uses the useModal custom hook to manage modal data.
 * It renders a list of options related to the product, such as checking delivery and pickup options, showing included items, and opening a modal for more options.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ShoppingCartType} props.product - The product for which the options are to be displayed.
 *
 * @returns {JSX.Element} A list of options related to the product.
 */

export function MoreOptionsList({ product }: { product: ShoppingCartType }) {
  const { setModalData } = useModal(); // Destructure setModalData from the useModal hook.

  // openMoreOptionsModal is a function that sets the modal data to display more options for the product in the list.
  function openMoreOptionsModal() {
    setModalData({ type: "more-options-for-product-in-list", products: [product] });
  }

  return (
    <ul className="list-product__more-options-list">
      <li>
        <button className="list-product__more-options-btn">Sprawdź opcje dostawy i odbioru</button>
      </li>

      <li>
        <button className="list-product__more-options-btn">Pokaż dołączone elementy</button>
      </li>

      <li>
        <button
          className="list-product__more-options-btn"
          onClick={openMoreOptionsModal}
        >
          Więcej opcji
        </button>
      </li>
    </ul>
  );
}
