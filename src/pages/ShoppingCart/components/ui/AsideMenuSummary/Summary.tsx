/**
 * Summary is a functional component that renders a summary of the order.
 * The summary includes the total price of the products and a note about the delivery cost.
 * The price is passed as a prop to the component.
 *
 * @param {string} props.price - The total price of the products.
 *
 * @returns {JSX.Element} A fragment that includes a div for the price and a div for the delivery note
 *
 * @example
 * return (
 *   <Summary price="100.00" />
 * )
 *
 * @example
 * return (
 *  <FinalPrice price="221.57" />
 * )
 */

export function Summary({ price }: { price: string }) {
  return (
    <>
      <div className="shopping-cart-menu__price-wrapper">
        <span>Wartość produktów</span>
        <strong>{price}</strong>
      </div>

      <div className="shopping-cart-menu__delivery-text-wrapper">
        <div>
          <span>Dostawa</span>
          <span>-</span>
        </div>
        <small>Koszt dostawy poznasz na dalszym etapie zamówienia</small>
      </div>
    </>
  );
}
