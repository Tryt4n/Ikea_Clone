// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
import useList from "../../context/useList";
import useToast from "../../../../hooks/useToast/useToast";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import icons
import ShoppingCartAddIcon from "../../../../Icons/ShoppingCartAddIcon";
// Import constants
import { getClubDiscount } from "../../../../constants/clubDiscount";
// Import styles
import "./index.scss";

/**
 * ListProductsSummary is a functional component that uses the useApp, useList, and useToast custom hooks to manage the application state, list state, and toast state respectively.
 * It defines a calculateDiscount function to calculate the discount for a given price.
 * It calculates the total price of all products in the list.
 * It defines an addProductsToShoppingCart function to add all products in the list to the shopping cart and display a toast notification.
 * It renders a section with two divs displaying the price for IKEA Family members and other customers, and a button to add all products to the shopping cart.
 *
 * @returns {JSX.Element} A section with two divs displaying the price for IKEA Family members and other customers, and a button to add all products to the shopping cart.
 */

export default function ListProductsSummary() {
  const { dispatch } = useApp(); // Destructure the dispatch variable from the useApp custom hook.
  const { listState } = useList(); // Destructure the listState variable from the useList custom hook.
  const { setToastData } = useToast(); // Destructure the setToastData variable from the useToast custom hook.

  // Define a calculateDiscount function to calculate the discount for a given price.
  function calculateDiscount(price: number) {
    const savingsMath = getClubDiscount(price); // Calculate the discount for a given price.
    return savingsMath;
  }

  // Calculate the total price of all products in the list.
  const totalPrice = listState?.products
    ? listState.products.reduce(
        (acc, product) => {
          let totalInteger = acc[0] + product.quantity * product.price.integer; // Calculate the total integer price of all products in the list.
          let totalDecimal =
            acc[1] + product.quantity * (product.price.decimal ? product.price.decimal : 0); // Calculate the total decimal price of all products in the list.

          // If the total decimal price is greater than 100, add the integer part to the total integer price and set the total decimal price to the remainder.
          if (totalDecimal >= 100) {
            totalInteger += Math.floor(totalDecimal / 100);
            totalDecimal = totalDecimal % 100;
          }

          return [totalInteger, totalDecimal]; // Return the total integer and decimal price.
        },
        [0, 0] // Set the initial total integer and decimal price to 0.
      )
    : [0, 0]; // If there is no list, set the total price to 0.

  const totalPriceInteger = totalPrice[0]; // Destructure the total integer price from the totalPrice array.
  const totalPriceDecimal = totalPrice[1]; // Destructure the total decimal price from the totalPrice array.

  // Calculate the discount
  const discount = calculateDiscount(Number(`${totalPriceInteger}.${totalPriceDecimal}`));

  // Calculate the total price with discount by subtracting the discount from the total price.
  const totalPriceWithDiscount =
    Number(`${totalPriceInteger}.${totalPriceDecimal}`) - Number(discount);

  // Split the totalPriceWithDiscount into integer and decimal parts.
  const [totalPriceWithDiscountInteger, totalPriceWithDiscountDecimal] = totalPriceWithDiscount
    .toFixed(2)
    .split(".");

  // Define an addProductsToShoppingCart function to add all products in the list to the shopping cart and display a toast notification.
  function addProductsToShoppingCart() {
    if (!listState?.products) return; // If there is no list, return.

    const productsNames = listState.products.map((product) => product.collection); // Get the names of all products in the list.

    dispatch({ type: "addToShoppingCart", payload: listState?.products }); // Add all products in the list to the shopping cart.

    setToastData({
      open: true,
      text: `${
        productsNames.length > 1 ? productsNames.join(", ") : productsNames[0]
      } dodano to koszyka.`,
      link: "/shoppingcart",
    }); // Display a toast notification.
  }

  return (
    <section className="list-products-summary">
      {/* Set the title of the section to visually-hidden for accessibility. */}
      <h3 className="visually-hidden">Podsumowanie</h3>

      {/* Display the price with discount for IKEA Family members. */}
      <div className="list-products-summary__wrapper">
        <span>Cena dla Klubowiczów IKEA Family</span>
        <strong>
          {/* {totalPriceInteger} */}
          {totalPriceWithDiscountInteger}
          <sup>
            {/* <small>,{totalPriceDecimal}</small> */}
            <small>,{totalPriceWithDiscountDecimal}</small>
          </sup>
        </strong>
      </div>

      {/* Display the price without discount. */}
      <div className="list-products-summary__wrapper">
        <span>Cena dla pozostałych klientów</span>
        {/* <em>{totalPriceWithDiscount}</em> */}
        <em>
          {totalPriceInteger}
          {totalPriceDecimal ? `,${totalPriceDecimal}` : ""}
        </em>
      </div>

      {/* Button with functionality of adding all products to shopping cart. */}
      <Btn
        variant="blue"
        size="big"
        className="list-products-summary__btn"
        onClick={addProductsToShoppingCart}
      >
        <ShoppingCartAddIcon />
        Dodaj wszystko do koszyka
      </Btn>
    </section>
  );
}
