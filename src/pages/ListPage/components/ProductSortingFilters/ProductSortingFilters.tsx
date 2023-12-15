// React
import { useState } from "react";
// Custom Hooks
import useList from "../../context/useList";
import useModal from "../../../../hooks/useModal";
// Components
import BtnsControl from "../../../../components/BtnsControl/BtnsControl";
import { Btn } from "../../../../components/Btn/Btn";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Types
import type { ShoppingCartType } from "../../../../context/AppContext";

const btns = ["date", "name", "priceAscending", "priceDescending"] as const;

export default function ProductSortingFilters() {
  const { setModalData } = useModal();
  const { list, setList } = useList();
  const [activeBtn, setActiveBtn] = useState<(typeof btns)[number] | undefined>();

  function sortListByDate(time: "recent" | "oldest") {
    setSortedList((a, b) => {
      return (
        new Date(time === "recent" ? b.addedDate : a.addedDate).getTime() -
        new Date(time === "recent" ? a.addedDate : b.addedDate).getTime()
      );
    });
    setActiveBtn("date");
  }

  function sortListByName() {
    setSortedList((a, b) => {
      return a.collection.localeCompare(b.collection);
    });
    setActiveBtn("name");
  }

  function sortListByPrice(order: "ascending" | "descending") {
    setSortedList((a, b) => {
      const integerA = a.price.integer;
      const decimalA = a.price.decimal ? a.price.decimal : 0;
      const priceA = integerA + parseFloat(`0.${decimalA}`);
      const integerB = b.price.integer;
      const decimalB = b.price.decimal ? b.price.decimal : 0;
      const priceB = integerB + parseFloat(`0.${decimalB}`);

      if (order === "ascending") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
    setActiveBtn(order === "ascending" ? "priceAscending" : "priceDescending");
  }

  function resetFilters() {
    sortListByDate("oldest");
    setActiveBtn(undefined);
  }

  function setSortedList(comparator: (a: ShoppingCartType, b: ShoppingCartType) => number) {
    if (!list?.products) return;

    const sortedList = list.products.sort(comparator);

    startViewTransition(() => {
      setList({
        ...list,
        products: sortedList,
      });
    });
  }

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

      <Btn
        variant={activeBtn === "date" ? "light-with-border" : "gray"}
        onClick={() => (activeBtn === "date" ? resetFilters() : sortListByDate("recent"))}
      >
        Ostatnio dodane
      </Btn>

      <Btn
        variant={activeBtn === "name" ? "light-with-border" : "gray"}
        onClick={activeBtn === "name" ? resetFilters : sortListByName}
      >
        Nazwa
      </Btn>

      <Btn
        variant={activeBtn === "priceAscending" ? "light-with-border" : "gray"}
        onClick={() =>
          activeBtn === "priceAscending" ? resetFilters() : sortListByPrice("ascending")
        }
      >
        Cena - od najniższej
      </Btn>

      <Btn
        variant={activeBtn === "priceDescending" ? "light-with-border" : "gray"}
        onClick={() =>
          activeBtn === "priceDescending" ? resetFilters() : sortListByPrice("descending")
        }
      >
        Cena - od najwyższej
      </Btn>
    </BtnsControl>
  );
}
