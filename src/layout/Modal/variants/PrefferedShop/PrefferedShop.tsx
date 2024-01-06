// Import react dependencies
import { useState, type ChangeEvent } from "react";
// Import custom hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Import components
import Input from "../../../../components/features/Input/Input";
import LocationBtn from "../../components/LocationBtn/LocationBtn";
// Import constants
import { ShopType, shopsList } from "../../../../constants/shopsList";
// Import helpers functions
import { startViewTransition } from "../../../../utils/helpers";
// Import icons
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";
// Import styles
import "./index.scss";

/**
 * `PrefferedShop` is a React component that allows the user to search for and select a preferred IKEA shop.
 * It uses several custom hooks to interact with the application state and modals.
 * It also uses the `Input` and `LocationBtn` components for the search field and location button, respectively.
 * The component handles search term change and shop selection.
 *
 * @component
 * @returns {JSX.Element} The rendered `PrefferedShop` component.
 */

export default function PrefferedShop() {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  // Handle search term change
  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    // Start view transition and set the search term to the lowercased input value
    startViewTransition(() => setSearchTerm(e.target.value.toLowerCase()));
  }

  return (
    <div className="preffered-shop">
      <Input
        type="search" // Set input type to search
        id="shop-searching"
        label="Wpisz miasto" // Set input label
        inputProps={{
          onChange: handleSearchChange, // Handle search term change
          "aria-label": "Wpisz wyszukiwane miasto",
        }}
      />
      <LocationBtn className="preffered-shop__location-btn" />

      <ShopsList searchTerm={searchTerm} />
    </div>
  );
}

/**
 * `ShopsList` is a React component that displays a list of IKEA shops filtered by the search term.
 * It uses the `useApp` and `useModal` custom hooks to interact with the application state and modals.
 * The component handles shop selection.
 *
 * @param {string} props.searchTerm - The search term to filter the shops by.
 * @returns {JSX.Element} The rendered `ShopsList` component.
 */
function ShopsList({ searchTerm }: { searchTerm: string }) {
  const { dispatch } = useApp(); // Get dispatch from AppContext

  const { setModalData } = useModal(); // Get setModalData from ModalContext

  // Filter the shops by the search term
  const filteredShops = shopsList.filter((shop) => shop.name.toLowerCase().includes(searchTerm));

  // Handle shop selection
  function selectShop(shop: ShopType) {
    // Start view transition, set the modal data, and dispatch the chooseShop action with the selected shop
    startViewTransition(() => {
      setModalData({
        type: "chosen-shop",
      });
      dispatch({ type: "chooseShop", payload: shop });
    });
  }

  return (
    <>
      {/* If there are filtered shops, display them in a list */}
      {filteredShops.length > 0 ? (
        <ul>
          {filteredShops.map((shop) => (
            <li
              key={shop.name}
              className="preffered-shop__list-item"
            >
              <button
                type="button"
                className="preffered-shop__list-item-btn"
                onClick={() => selectShop(shop)} // Pass the selected shop to the selectShop function
              >
                <div className="preffered-shop__list-item-text-wrapper">
                  <strong>{shop.name}</strong>
                  <small>{shop.address}</small>
                </div>

                <ChevronRightSmall />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        // If there are no filtered shops, display a no results message
        <em className="preffered-shop__no-result-text">
          Niestety, nie udało nam się znaleźć sklepu IKEA na podstawie tego, co zostało wpisane.
        </em>
      )}
    </>
  );
}
