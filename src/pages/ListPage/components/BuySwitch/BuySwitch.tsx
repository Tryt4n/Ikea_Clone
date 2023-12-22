// Custom Hooks
import useList from "../../context/useList";
// Components
import Switch from "../../../../components/features/Switch/Switch";
// Utils
import { listDisplays } from "../../context/utils";

export default function BuySwitch() {
  const { selectedDisplay, setSelectedDisplay } = useList();

  function handleButtonClick(value: (typeof listDisplays)[number]) {
    setSelectedDisplay(value);
  }

  return (
    <Switch
      props={{
        variant: "light",
      }}
      firstPropertyProps={{
        disabled: selectedDisplay === "buy-online",
        onClick: () => handleButtonClick("buy-online"),
        variant: selectedDisplay === "buy-online" ? "light" : "gray",
        children: "Kup przez internet",
      }}
      secondPropertyProps={{
        variant: selectedDisplay === "shopping-list" ? "light" : "gray",
        disabled: selectedDisplay === "shopping-list",
        onClick: () => handleButtonClick("shopping-list"),
        children: "Lista zakupów",
      }}
    />
  );
}
