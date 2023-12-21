// Custom Hooks
import useList from "../../context/useList";
import useModal from "../../../../hooks/useModal";
// Components
import BtnsControl from "../../../../components/BtnsControl/BtnsControl";
import { Btn } from "../../../../components/Btn/Btn";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Types
import type { ReducerActionsType, SortingTypes } from "../../context/ListContext";

export default function ProductSortingFilters() {
  const { setModalData } = useModal();

  function openSortingOptionsModal() {
    setModalData({ type: "list-sorting" });
  }

  return (
    <BtnsControl>
      <Btn
        variant="gray"
        onClick={openSortingOptionsModal}
      >
        Sortuj
      </Btn>

      <SortingButton
        variant="recent"
        dispatchAction={{ type: "sortByDate", payload: "recent" }}
      >
        Ostatnio dodane
      </SortingButton>

      <SortingButton
        variant="name"
        dispatchAction={{ type: "sortByName" }}
      >
        Nazwa
      </SortingButton>

      <SortingButton
        variant="priceAscending"
        dispatchAction={{ type: "sortByPrice", payload: "priceAscending" }}
      >
        Cena - od najniższej
      </SortingButton>

      <SortingButton
        variant="priceDescending"
        dispatchAction={{ type: "sortByPrice", payload: "priceDescending" }}
      >
        Cena - od najwyższej
      </SortingButton>
    </BtnsControl>
  );
}

type SortingButtonProps = {
  variant: SortingTypes;
  dispatchAction: ReducerActionsType;
  children: string;
};

function SortingButton({ variant, dispatchAction, children }: SortingButtonProps) {
  const { listState, listDispatch } = useList();

  return (
    <>
      {listState && (
        <Btn
          variant={listState.listSorting === variant ? "light-with-border" : "gray"}
          onClick={() =>
            startViewTransition(() => {
              listState.listSorting === variant
                ? listDispatch({ type: "sortByDate", payload: "oldest" })
                : listDispatch(dispatchAction);
            })
          }
        >
          {children}
        </Btn>
      )}
    </>
  );
}