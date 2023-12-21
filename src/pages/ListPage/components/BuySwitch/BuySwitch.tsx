import { useState } from "react";
import Switch from "../../../../components/features/Switch/Switch";

const switchTypes = ["buy-online", "shopping-list"] as const;

export default function BuySwitch() {
  const [selected, setSelected] = useState<(typeof switchTypes)[number]>("buy-online");

  function handleButtonClick(value: (typeof switchTypes)[number]) {
    setSelected(value);
  }

  return (
    <Switch
      props={{
        variant: "light",
      }}
      firstPropertyProps={{
        disabled: selected === "buy-online",
        onClick: () => handleButtonClick("buy-online"),
        variant: selected === "buy-online" ? "light" : "gray",
        children: "Kup przez internet",
      }}
      secondPropertyProps={{
        variant: selected === "shopping-list" ? "light" : "gray",
        disabled: selected === "shopping-list",
        onClick: () => handleButtonClick("shopping-list"),
        children: "Lista zakupów",
      }}
    />
  );
}
