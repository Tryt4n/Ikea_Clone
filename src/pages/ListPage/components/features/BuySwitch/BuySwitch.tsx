// Import custom hooks
import useList from "../../../context/useList";
// Import components
import Switch from "../../../../../components/features/Switch/Switch";
// Import constants
import { listDisplays } from "../../../context/constants";

/**
 * BuySwitch is a component that renders a switch with two options: "buy-online" and "shopping-list".
 * It uses the useList custom hook to get and set the selected display.
 *
 * When the "buy-online" button is clicked, the selected display is set to "buy-online" and the button is disabled.
 * When the "shopping-list" button is clicked, the selected display is set to "shopping-list" and the button is disabled.
 *
 * @returns A Switch component with two buttons: "Kup przez internet" and "Lista zakupów".
 */

export default function BuySwitch() {
  const { selectedDisplay, setSelectedDisplay } = useList(); // Use the useList hook to get the selected display and the function to set the selected display

  // Define the function to handle button clicks
  function handleButtonClick(value: (typeof listDisplays)[number]) {
    setSelectedDisplay(value); // Set the selected display to the value
  }

  return (
    <Switch
      // Pass common props to the Switch component
      props={{
        variant: "light", // Set the variant to "light"
      }}
      // Pass the props to the first button of the Switch component
      firstPropertyProps={{
        disabled: selectedDisplay === "buy-online", // Disable the button if the selected display is "buy-online"
        onClick: () => handleButtonClick("buy-online"), // Set the onClick handler to handleButtonClick with the value "buy-online"
        variant: selectedDisplay === "buy-online" ? "light" : "gray", // Set the variant to "light" if the selected display is "buy-online", otherwise set it to "gray"
        children: "Kup przez internet", // Set the children to text
      }}
      // Pass the props to the second button of the Switch component
      secondPropertyProps={{
        variant: selectedDisplay === "shopping-list" ? "light" : "gray", // Set the variant to "light" if the selected display is "shopping-list", otherwise set it to "gray"
        disabled: selectedDisplay === "shopping-list", // Disable the button if the selected display is "shopping-list"
        onClick: () => handleButtonClick("shopping-list"), // Set the onClick handler to handleButtonClick with the value "shopping-list"
        children: "Lista zakupów", // Set the children to text
      }}
    />
  );
}
