// React
import { ReactNode, Suspense, lazy } from "react";
// Custom Hooks
import useModal from "../../../../hooks/useModal";
import useWindowSize from "../../../../hooks/useWindowSize";
// Modal Variants
const MainMenu = lazy(() => import("../../variants/MainMenu/MainMenu"));
const ProductsMenu = lazy(() => import("../../variants/ProductsMenu/ProductsMenu"));
const RoomsMenu = lazy(() => import("../../variants/RoomsMenu/RoomsMenu"));
// Components
import LoadingSpinner from "../../../../components/LazyLoadLoadingSpinner/LoadingSpinner";
import Btn from "../../../../components/Btn/Btn";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Types
import type { MenuLayoutType } from "../../../../pages/ProductPage/types/ModalTypes";
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";
import IkeaLogo from "../../../../Icons/IkeaLogo";
import ArrowLeftIcon from "../../../../Icons/ArrowLeftIcon";
// Style
import "./index.scss";

export type MenuLayoutTypePropsType = {
  data: MenuLayoutType;
};

export default function MenuLayout({ data }: MenuLayoutTypePropsType) {
  const { closeModal } = useModal();
  const { width } = useWindowSize();

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

            {(data.type === "menu" ||
              ((data.type === "products-menu" || data.type === "rooms-menu") && width >= 900)) && (
              <a
                href="/"
                aria-label="Idź na stronę główną"
              >
                <span className="visually-hidden">Strona główna</span>
                <IkeaLogo />
              </a>
            )}
          </header>

          <div className="menu-modal__wrapper scrollbar-style">
            <Suspense fallback={<LoadingSpinner />}>
              {data.type === "menu" && <MainMenu />}

              {data.type === "products-menu" && (
                <ModalInnerWrapper title="Produkty">
                  <ProductsMenu className={data.type} />
                </ModalInnerWrapper>
              )}

              {data.type === "rooms-menu" && (
                <ModalInnerWrapper title="Pomieszczenia">
                  <RoomsMenu className={data.type} />
                </ModalInnerWrapper>
              )}
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}

type ModalInnerWrapperPropsType = {
  title: string;
  children: ReactNode;
};

function ModalInnerWrapper({ title, children }: ModalInnerWrapperPropsType) {
  const { setModalData } = useModal();

  function goBack() {
    startViewTransition(() => {
      setModalData({
        type: "menu",
      });
    });
  }

  return (
    <>
      <Btn
        variant="light"
        shape="circle"
        className="menu-modal__go-back-btn"
        onClick={goBack}
      >
        <span className="visually-hidden">Wstecz</span>
        <ArrowLeftIcon />
      </Btn>

      <strong className="menu-modal__inner-wrapper-heading">{title}</strong>

      {children}
    </>
  );
}
