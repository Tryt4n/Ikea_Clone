/**
 * FinalPrice is a functional component that renders the final price of the products.
 * The price is passed as a prop to the component.
 *
 * @param {string} props.price - The final price of the products.
 *
 * @returns {JSX.Element} A div that includes a paragraph and a strong element for the price
 *
 * @example
 * return (
 *   <FinalPrice price="100.00" />
 * )
 *
 * @example
 * return (
 *  <FinalPrice price="221.57" />
 * )
 */

export function FinalPrice({ price }: { price: string }) {
  return (
    <div className="shopping-cart-menu__price-wrapper shopping-cart-menu__price-wrapper--big">
      <p>Wartość produktów</p>
      <strong>{price}</strong>
    </div>
  );
}
