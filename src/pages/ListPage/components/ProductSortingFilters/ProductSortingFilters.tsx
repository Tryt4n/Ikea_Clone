// Components
import BtnsControl from "../../../../components/BtnsControl/BtnsControl";
import { Btn } from "../../../../components/Btn/Btn";

export default function ProductSortingFilters() {
  return (
    <BtnsControl>
      <Btn variant="gray">Sortuj</Btn>
      <Btn variant="gray">Ostatnio dodane</Btn>
      <Btn variant="gray">Nazwa</Btn>
      <Btn variant="gray">Cena - od najniższej</Btn>
      <Btn variant="gray">Cena - od najwyższej</Btn>
    </BtnsControl>
  );
}
