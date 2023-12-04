// React
import { useState } from "react";
import { createPortal } from "react-dom";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Constants
import { deliveryOptions } from "../../../../constants/deliveryOptions";
// Icons
import InfoIcon from "../../../../Icons/InfoIcon";
// Style
import "./index.scss";

export default function DeliveryOptions() {
  const [deliveryOption, setDeliveryOption] = useState<
    (typeof deliveryOptions)[number]["option"] | null
  >(null);

  return (
    <fieldset className="delivery-options">
      <legend className="visually-hidden">Opcje dostawy</legend>

      {deliveryOptions.map((item) => (
        <DeliveryOption
          key={item.option}
          item={item}
          checkedStatus={deliveryOption === item.option}
          onChangeFunction={() => setDeliveryOption(item.option)}
        />
      ))}

      {deliveryOption === "otherOptions" && <InfoMessage />}
    </fieldset>
  );
}

type DeliveryOptionPropsType = {
  item: (typeof deliveryOptions)[number];
  checkedStatus: boolean;
  onChangeFunction: () => void;
};

function DeliveryOption({ item, checkedStatus, onChangeFunction }: DeliveryOptionPropsType) {
  const { state } = useApp();
  const { setIsModalOpen, setModalData } = useModal();

  function openPostalCodeModal() {
    setIsModalOpen(true);
    setModalData({ type: "postal-code" });
  }

  function onInputClickFunction() {
    if (item.option === "homeDelivery" && state.postalCode === "") {
      openPostalCodeModal();
    }
  }

  return (
    <>
      <label className="delivery-options__box">
        <input
          type="radio"
          name="deliveryOption"
          className="visually-hidden"
          checked={checkedStatus}
          onChange={onChangeFunction}
          onClick={onInputClickFunction}
        />

        <span className="delivery-options__box-inner-wrapper">
          {item.icon}
          <strong>{item.text}</strong>
        </span>
      </label>
    </>
  );
}

function InfoMessage() {
  const container = document.getElementById("info-message-container");

  if (container)
    return createPortal(
      <div className="delivery-options__info">
        <InfoIcon />
        <p>Przejdź dalej, aby sprawdzić dostępność opcji odbioru</p>
      </div>,
      container
    );
}
