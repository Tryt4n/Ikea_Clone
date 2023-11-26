// Types
import { ModalMenuType } from "../../../../pages/ProductPage/types/ModalTypes";

type MenuLayoutType = {
  data: ModalMenuType;
};

export default function MenuLayout({ data }: MenuLayoutType) {
  return <>{data && <header></header>}</>;
}
