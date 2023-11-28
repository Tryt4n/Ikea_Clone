// React
import React from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Components
import InformationBox from "../../../../components/InformationBox/InformationBox";
import Btn from "../../../../components/Btn/Btn";
// Constants
import { nextTradingSunday } from "../../../../constants/shopsList";

export default function ChosenShop() {
  const { state } = useApp();
  const { setModalData } = useModal();

  const { chosenShop } = state;

  function chooseOtherShop() {
    setModalData({
      type: "choose-shop",
    });
  }

  function calculateOpeningHours(
    openingHours: Record<string, string>,
    nonStandardOpeningHours: Record<string, string>
  ): string {
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });
    const hours = openingHours[dayOfWeek];

    if (hours === "Zamknięte") {
      //? If regular hours indicate that the shop is closed, check non-standard hours
      const nonStandardHours = nonStandardOpeningHours[today.toLocaleDateString("en-US")];
      if (nonStandardHours) {
        return `Czynne do ${nonStandardHours.split(" - ")[1]}`;
      } else {
        return "Dzisiaj zamknięte";
      }
    }

    const [opening, closing] = hours.split(" - ");
    const openingTime = new Date(today.toDateString() + " " + opening);
    const closingTime = new Date(today.toDateString() + " " + closing);

    if (today >= openingTime && today <= closingTime) {
      return `Czynne do ${closing}`;
    } else {
      return "Dzisiaj zamknięte";
    }
  }

  return (
    <div className="chosen-shop">
      <section className="chosen-shop__header">
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
          onClick={chooseOtherShop}
        >
          Wybierz inny sklep
        </Btn>
      </div>
    </div>
  );
}

function Hours({ hoursObject }: { hoursObject: Record<string, string> }) {
  return (
    <dl className="chosen-shop__hours-list">
      {Object.entries(hoursObject).map(([day, hours]) => (
        <React.Fragment key={day}>
          <dt>{day}</dt>
          <dd>{hours}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
