// Import components
import BtnsControl from "../../../../../components/features/BtnsControl/BtnsControl";
import { Btn } from "../../../../../components/ui/Btn/Btn";
import { SortingButton } from "../../ui/SortingButton/SortingButton";

/**
 * ProductSortingFilters is a component that renders a set of sorting buttons for a product list.
 *
 * It uses the BtnsControl component to group the buttons together, and the Btn and SortingButton components to render the buttons.
 *
 * The sorting buttons include options to sort by recent additions, name, price ascending, and price descending.
 *
 * @returns A `BtnsControl` component with the sorting buttons.
 */

export default function ProductSortingFilters() {
  return (
    // BtnsControl component groups the buttons together
    <BtnsControl>
      <Btn variant="gray">Sortuj</Btn>

      {/* Sort by recent additions */}
      <SortingButton
        variant="recent"
        dispatchAction={{ type: "sortByDate", payload: "recent" }}
      >
        Ostatnio dodane
      </SortingButton>

      {/* Sort by name */}
      <SortingButton variant="name" dispatchAction={{ type: "sortByName" }}>
        Nazwa
      </SortingButton>

      {/* Sort by price ascending */}
      <SortingButton
        variant="priceAscending"
        dispatchAction={{ type: "sortByPrice", payload: "priceAscending" }}
      >
        Cena - od najniższej
      </SortingButton>

      {/* Sort by price descending */}
      <SortingButton
        variant="priceDescending"
        dispatchAction={{ type: "sortByPrice", payload: "priceDescending" }}
      >
        Cena - od najwyższej
      </SortingButton>
    </BtnsControl>
  );
}
