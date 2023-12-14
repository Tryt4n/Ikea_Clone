// React
import { useState } from "react";
// Components
import Btn from "../../../../components/Btn/Btn";
// Styles
import "./index.scss";

type SwitchType = "buy-online" | "shopping-list";

export default function Switch() {
  const [selected, setSelected] = useState<SwitchType>("buy-online");

  function handleButtonClick(value: SwitchType) {
    setSelected(value);
  }

  return (
    <div className="switch-wrapper">
      <Btn
        size="big"
        variant={selected === "buy-online" ? "light" : "gray"}
        disabled={selected === "buy-online"}
        onClick={() => handleButtonClick("buy-online")}
      >
        Kup przez internet
      </Btn>
      <Btn
        size="big"
        variant={selected === "shopping-list" ? "light" : "gray"}
        disabled={selected === "shopping-list"}
        onClick={() => handleButtonClick("shopping-list")}
      >
        Lista zakupów
      </Btn>
    </div>
  );
}
