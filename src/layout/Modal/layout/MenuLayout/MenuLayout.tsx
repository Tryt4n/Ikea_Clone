// React
import { Suspense, lazy } from "react";
// Custom Hooks
import useModal from "../../../../hooks/useModal";
// Modal Variants
const MainMenu = lazy(() => import("../../variants/MainMenu/MainMenu"));
const ProductsMenu = lazy(() => import("../../variants/ProductsMenu/ProductsMenu"));
const RoomsMenu = lazy(() => import("../../variants/RoomsMenu/RoomsMenu"));
// Components
import LoadingSpinner from "../../../../components/LazyLoadLoadingSpinner/LoadingSpinner";
import Btn from "../../../../components/Btn/Btn";
// Types
import {
  ModalMenuType,
  ModalProductsMenuType,
  ModalRoomsMenuType,
} from "../../../../pages/ProductPage/types/ModalTypes";
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";
import IkeaLogo from "../../../../Icons/IkeaLogo";
// Style
import "./index.scss";

type MenuLayoutType = {
  data: ModalMenuType | ModalProductsMenuType | ModalRoomsMenuType;
};

export default function MenuLayout({ data }: MenuLayoutType) {
  const { closeModal } = useModal();

  return (
    <>
      {data && (
        <>
          <header className="menu-modal__header">
            <h2 className="visually-hidden">Menu Poboczne</h2>
            <Btn
              variant="light"
              shape="circle"
              onClick={closeModal}
            >
              <CloseIcon />
              <span className="visually-hidden">Zamknij Menu</span>
            </Btn>
            <a
              href="/"
              aria-label="Idź na stronę główną"
            >
              <span className="visually-hidden">Strona główna</span>
              <IkeaLogo />
            </a>
          </header>

          <Suspense fallback={<LoadingSpinner />}>
            {data.type === "menu" && <MainMenu />}
            {data.type === "products-menu" && <ProductsMenu />}
            {data.type === "rooms-menu" && <RoomsMenu />}
          </Suspense>
        </>
      )}
    </>
  );
}
