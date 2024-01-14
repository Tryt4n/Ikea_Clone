// Import react dependencies
import { useState } from "react";
// Import components
import { Btn } from "../../../../../components/ui/Btn/Btn";
import Input from "../../../../../components/features/Input/Input";
// Import icons
import DiscountIcon from "../../../../../Icons/DiscountIcon";
import ChevronRightSmall from "../../../../../Icons/ChevronRightSmall";

/**
 * DiscountCodeFormAccordion is a functional component that renders a discount code form inside an accordion.
 * The accordion can be opened and closed by clicking on a button.
 * The form includes an input for the discount code and a button to apply the code.
 *
 * @returns {JSX.Element} A section that includes a button to open/close the accordion and a form for the discount code.
 */

export function DiscountCodeFormAccordion() {
  const [accordionOpen, setAccordionOpen] = useState(false); // Define a state for the accordion

  // The component returns a section that includes a button to open/close the accordion and a form for the discount code
  return (
    <section className="shopping-cart-menu__discount-code-container">
      <button
        type="button"
        className="shopping-cart-menu__discount-code-btn"
        onClick={() => setAccordionOpen(!accordionOpen)} // When the button is clicked, the accordionOpen state is toggled
      >
        <div className="shopping-cart-menu__discount-code-inner-wrapper">
          <DiscountIcon />
          <h3>Masz kod rabatowy?</h3>
        </div>
        <div>
          <ChevronRightSmall />
        </div>
      </button>

      <form
        onSubmit={(e) => e.preventDefault()} // Prevent the default form submission
        className="shopping-cart-menu__discount-code-hidden-content-container"
        aria-hidden={!accordionOpen} // The form is hidden when the accordion is closed
      >
        <div>
          <p
            id="discount-code-label"
            className="shopping-cart-menu__discount-code-label"
          >
            W jednym zamówieniu można użyć tylko jednego kuponu/kodu. Wpisz kod
            bez spacji między znakami i zwróć uwagę na wielkość liter. Masz
            kartę upominkową? Możesz ją wykorzystać na dalszym etapie.
          </p>

          <div className="shopping-cart-menu__discount-code-form-inner-wrapper">
            <Input
              id="discount-code" // The id is used to associate the input with the label
              type="text" // The input type is "text"
              label="W jednym zamówieniu można użyć tylko jednego kuponu/kodu. Wpisz kod bez spacji między
                        znakami i zwróć uwagę na wielkość liter. Masz kartę upominkową? Możesz ją wykorzystać na
                        dalszym etapie." // The label as paragraph element above the input
              labelProps={{
                className: "visually-hidden", // The label is hidden and replaced by the paragraph element above the input
                "aria-hidden": true, // The label is hidden for screen readers
                "aria-labelledby": "discount-code-label", // The label is associated with the input
              }}
              inputProps={{
                tabIndex: !accordionOpen ? -1 : 0, // The input is not focusable when the accordion is closed
              }}
            />

            <Btn
              variant="white-with-border"
              type="button"
              tabIndex={!accordionOpen ? -1 : 0} // The button is not focusable when the accordion is closed
            >
              Zastosuj
            </Btn>
          </div>
        </div>
      </form>
    </section>
  );
}
