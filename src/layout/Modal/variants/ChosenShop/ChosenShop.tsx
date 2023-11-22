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
      header: "Znajdź swój preferowany sklep",
    });
  }

  return (
    <div className="chosen-shop">
      <section className="chosen-shop__header">
        <h3 className="visually-hidden">Informacje</h3>
        {/* //! Change to proper hour */}
        <strong>Czynne do 22:00</strong>
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
