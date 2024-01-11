// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
import useModal from "../../../../hooks/useModal/useModal";
// Import components
import InformationBox from "../../../../components/ui/InformationBox/InformationBox";
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import inner components
import { Hours } from "./InnerComponents/Hours/Hours";
// Import helpers functions
import { startViewTransition } from "../../../../utils/helpers";
// Import constants
import { nextTradingSunday } from "../../../../constants/shopsList";
// Import styles
import "./index.scss";

/**
 * ChosenShop is a React component that renders information about the chosen shop.
 * The information includes the opening hours, the non-standard opening hours, the address, and the next trading Sunday.
 * The component uses the useApp and useModal custom hooks, and the startViewTransition utility function.
 *
 * @returns {JSX.Element} - The component that displays information about the chosen shop.
 */

export default function ChosenShop() {
  const { state } = useApp(); // Use the useApp custom hook to get the state of the app.
  const { setModalData } = useModal(); // Use the useModal custom hook to get the setModalData function.

  const { chosenShop } = state; // Destructure the chosenShop property from the state object.

  // Open the choose-shop modal.
  function chooseOtherShop() {
    startViewTransition(() => {
      setModalData({
        type: "choose-shop",
      });
    });
  }

  // Calculate the opening hours of the shop.
  function calculateOpeningHours(
    openingHours: Record<string, string>,
    nonStandardOpeningHours: Record<string, string>
  ): string {
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" }); // Get the day of the week.
    const hours = openingHours[dayOfWeek]; // Get the opening hours for the day of the week.

    if (hours === "Zamknięte") {
      // If regular hours indicate that the shop is closed, check non-standard hours
      const nonStandardHours = nonStandardOpeningHours[today.toLocaleDateString("en-US")]; // Get the non-standard hours for today.
      if (nonStandardHours) {
        return `Czynne do ${nonStandardHours.split(" - ")[1]}`; // If non-standard hours are available, return the closing time.
      } else {
        return "Dzisiaj zamknięte";
      }
    }

    const [opening, closing] = hours.split(" - "); // Split the opening hours into opening and closing hours.
    const openingTime = new Date(today.toDateString() + " " + opening); // Create a new Date object for the opening time.
    const closingTime = new Date(today.toDateString() + " " + closing); // Create a new Date object for the closing time.

    // Check if the shop is open.
    if (today >= openingTime && today <= closingTime) {
      return `Czynne do ${closing}`;
    } else {
      return "Dzisiaj zamknięte";
    }
  }

  return (
    <div className="chosen-shop">
      <section className="chosen-shop__header">
        {/* visually-hidden is a class that hides the element from the screen but keeps it visible to screen readers and SEO purposes. */}
        <h3 className="visually-hidden">Informacje</h3>

        <strong>
          {calculateOpeningHours(
            chosenShop!.openingHoursPerDay,
            chosenShop!.nonStandardOpeningHours
          )}
        </strong>
        <p>{chosenShop!.address}</p>
      </section>

      <section>
        <h3 className="chosen-shop__subheading">Godziny otwarcia</h3>
        <Hours hoursObject={chosenShop!.openingHours} />
      </section>

      <section>
        <h3 className="chosen-shop__subheading">Niestandardowe godziny otwarcia</h3>
        <Hours hoursObject={chosenShop!.nonStandardOpeningHours} />
      </section>

      <InformationBox
        information={`Najbliższa niedziela handlowa: ${nextTradingSunday}`}
        className="chosen-shop__information"
      />

      <div className="chosen-shop__btns-wrapper">
        <Btn>Odwiedź stronę sklepu</Btn>
        <Btn
          variant="white-with-border"
          onClick={chooseOtherShop} // Open the choose-shop modal.
        >
          Wybierz inny sklep
        </Btn>
      </div>
    </div>
  );
}
