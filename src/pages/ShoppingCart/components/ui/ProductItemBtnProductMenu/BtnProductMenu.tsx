// Import custom hooks
import useModal from "../../../../../hooks/useModal";
// Import components
import { Btn } from "../../../../../components/ui/Btn/Btn";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";
// Import icons
import TripleDotsMenuIcon from "../../../../../Icons/TripleDotsMenuIcon";

/**
 * BtnProductMenu is a functional component that takes in a product as a prop.
 * It uses the useModal custom hook to get the setModalData function.
 * It renders a Btn component with a "circle" shape, a "light" variant, and a "shopping-cart-product-item__menu-btn" class.
 * The Btn component calls the openMenu function when it is clicked, which sets the modal data to a "product-control" type and the product.
 * Inside the Btn component, it renders a span with a visually hidden description and a TripleDotsMenuIcon component.
 *
 * @param {ShoppingCartType} product The product passed to the BtnProductMenu component.
 * @returns {JSX.Element} A Btn component with a "circle" shape, a "light" variant, and a "shopping-cart-product-item__menu-btn" class.
 */

export function BtnProductMenu({ product }: { product: ShoppingCartType }) {
  const { setModalData } = useModal(); // Get the setModalData function using the useModal custom hook.

  // Define a function to open the product control menu.
  function openMenu() {
    // Set the modal data to a "product-control" type and pass the product.
    setModalData({
      type: "product-control",
      product: product,
    });
  }

  return (
    <Btn
      shape="circle"
      variant="light"
      className="shopping-cart-product-item__menu-btn"
      onClick={openMenu}
    >
      <span className="visually-hidden">Otwórz menu produktu</span>
      <TripleDotsMenuIcon />
    </Btn>
  );
}
