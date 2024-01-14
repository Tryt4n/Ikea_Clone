// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
// Import components
import ClubInfoDiscount from "../../../../components/ui/ClubInfoDiscount/ClubInfoDiscount";
import { Summary } from "../../components/ui/AsideMenuSummary/Summary";
import { FinalPrice } from "../../components/ui/AsideMenuFinalPrice/FinalPrice";
import { DiscountCodeFormAccordion } from "../../components/ui/AsideMenuDiscountCodeFormAccordion/DiscountCodeFormAccordion";
import { GoNextStep } from "../../components/ui/AsideMenuGoNextStep/GoNextStep";
import { AdditionalInformationsList } from "../../components/ui/AsideMenuAdditionalInformationList/AdditionalInformationList";
// Import styles
import "./index.scss";

/**
 * AsideMenu is a functional component that renders an aside menu.
 * The menu includes a summary of the order, the final price, a form for entering a discount code, a button for proceeding to the next step, and a list of additional information.
 * The total price of the order is calculated from the shopping cart in the application state.
 *
 * @returns {JSX.Element} An aside element that includes the order summary, final price, discount code form, next step button, and additional information list
 */

export default function AsideMenu() {
  const { state } = useApp(); // useApp hook is used to access the application state

  // Calculate the total price of the order from the shopping cart
  const calculatePrice = state.shoppingCart?.reduce((accumulator, product) => {
    const decimalValue = product.price.decimal
      ? product.price.decimal / 100
      : 0; // If the product price has a decimal value, divide it by 100
    const value = product.price.integer + decimalValue; // Add the integer and decimal values
    const result = value * product.quantity; // Multiply the price by the quantity of the product

    return accumulator + result; // Add the result to the accumulator
  }, 0); // The initial value of the accumulator is 0

  const totalPrice = calculatePrice ? calculatePrice.toLocaleString() : "-"; // Format the total price as a string

  return (
    <aside className="shopping-cart-menu">
      <h2 className="shopping-cart-menu__heading">Podsumowanie</h2>

      <Summary price={totalPrice} />

      <hr />

      <FinalPrice price={totalPrice} />

      <ClubInfoDiscount
        href="#"
        price={calculatePrice ? calculatePrice : 0} // if the price is not calculated, set it to 0
      />

      <DiscountCodeFormAccordion />

      <GoNextStep />

      <AdditionalInformationsList />
    </aside>
  );
}
