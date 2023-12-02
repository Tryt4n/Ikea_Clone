// React
import { useState } from "react";
// Components
import { deliveryOptions } from "../../../../constants/deliveryOptions";
// Style
import "./index.scss";

export default function DeliveryOptions() {
  const [deliveryOption, setDeliveryOption] = useState<string | null>(null);

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
    </fieldset>
  );
}

type DeliveryOptionPropsType = {
  item: (typeof deliveryOptions)[number];
  checkedStatus: boolean;
  onChangeFunction: () => void;
};

function DeliveryOption({ item, checkedStatus, onChangeFunction }: DeliveryOptionPropsType) {
  return (
    <>
      <label className="delivery-options__box">
        <input
          type="radio"
          name="deliveryOption"
          className="visually-hidden"
          checked={checkedStatus}
          onChange={onChangeFunction}
        />

        <span className="delivery-options__box-inner-wrapper">
          {item.icon}
          <strong>{item.text}</strong>
        </span>
      </label>
    </>
  );
}
