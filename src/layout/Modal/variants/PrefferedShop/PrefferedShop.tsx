// React
import { ChangeEvent, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
// Components
import Input from "../../../../components/Input/Input";
import LocationBtn from "../../components/LocationBtn/LocationBtn";
// Constants
import { ShopType, shopsList } from "../../../../constants/shopsList";
// Icons
import ChevronRightSmall from "../../../../Icons/ChevronRightSmall";

export default function PrefferedShop() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  return (
    <div className="preffered-shop">
      <Input
        type="search"
        id="shop-searching"
        label="Wpisz miasto"
        inputProps={{
          onChange: handleSearchChange,
          "aria-label": "Wpisz wyszukiwane miasto",
        }}
      />

      <LocationBtn className="preffered-shop__location-btn" />

      <ShopsList searchTerm={searchTerm} />
    </div>
  );
}

function ShopsList({ searchTerm }: { searchTerm: string }) {
  const { dispatch } = useApp();
  const { setModalData } = useModal();
  const filteredShops = shopsList.filter((shop) => shop.name.toLowerCase().includes(searchTerm));

  function selectShop(shop: ShopType) {
    setModalData({
      type: "chosen-shop",
      header: shop.name,
    });
    dispatch({ type: "chooseShop", payload: shop });
  }

  return (
    <>
      {filteredShops.length > 0 ? (
        <ul>
          {filteredShops.map((shop) => {
            return (
              <li
                key={shop.name}
                className="preffered-shop__list-item"
              >
                <button
                  type="button"
                  className="preffered-shop__list-item-btn"
                  onClick={() => selectShop(shop)}
                >
                  <div className="preffered-shop__list-item-text-wrapper">
                    <strong>{shop.name}</strong>
                    <small>{shop.address}</small>
                  </div>
                  <ChevronRightSmall />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <em className="preffered-shop__no-result-text">
          Niestety, nie udało nam się znaleźć sklepu IKEA na podstawie tego, co zostało wpisane.
        </em>
      )}
    </>
  );
}
