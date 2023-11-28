// React
import { Suspense, lazy } from "react";
// Hooks
import useModal from "../../../../hooks/useModal";
import useApp from "../../../../hooks/useApp";
// Modal Variants
const ChooseSize = lazy(() => import("../../variants/ChooseSize/ChooseSize"));
const ChooseColor = lazy(() => import("../../variants/ChooseColor/ChooseColor"));
const PostalCode = lazy(() => import("../../variants/PostalCode/PostalCode"));
const PrefferedShop = lazy(() => import("../../variants/PrefferedShop/PrefferedShop"));
const ChosenShop = lazy(() => import("../../variants/ChosenShop/ChosenShop"));
const Login = lazy(() => import("../../variants/Login/Login"));
// Components
import Btn from "../../../../components/Btn/Btn";
import LoadingSpinner from "../../../../components/LazyLoadLoadingSpinner/LoadingSpinner";
// Types
import {
  ModalChooseShopType,
  ModalChosenShopType,
  ModalDataChooseColorType,
  ModalDataChooseSizeType,
  ModalDataDimensionsType,
  ModalDataInstallmentPurchaseType,
  ModalDataItemsIncludedType,
  ModalDataProductInformationType,
  ModalDataRatingsType,
  ModalLoginType,
  ModalPostalCodeType,
  ModalPrefferedShopType,
} from "../../../../pages/ProductPage/types/ModalTypes";
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";
import ArrowLeftIcon from "../../../../Icons/ArrowLeftIcon";
// Style
import "./index.scss";

type SideModalLayoutType = {
  data:
    | ModalDataChooseSizeType
    | ModalDataChooseColorType
    | ModalDataProductInformationType
    | ModalDataItemsIncludedType
    | ModalDataDimensionsType
    | ModalDataRatingsType
    | ModalDataInstallmentPurchaseType
    | ModalPostalCodeType
    | ModalChooseShopType
    | ModalPrefferedShopType
    | ModalChosenShopType
    | ModalLoginType;
};

export default function SideModalLayout({ data }: SideModalLayoutType) {
  const { setModalData, closeModal } = useModal();
  const { state } = useApp();

  let header = null;

  switch (data.type) {
    case "choose-size":
      header = "Wybierz rozmiar";
      break;
    case "choose-color":
      header = "Wybierz kolor";
      break;
    case "choose-shop":
      header = "Znajdź swój preferowany sklep";
      break;
    case "postal-code":
      header = "Użyj swojej lokalizacji";
      break;
    case "preffered-shop":
      header = "Wybierz swój preferowany sklep";
      break;
    case "chosen-shop":
      header = state.chosenShop?.name;
      break;
    case "log-in":
      header = "Zaloguj się";
      break;
    case "product-information":
      header = "Informacje o produkcie";
      break;
    case "items-included":
      header = "Elementu w zestawie";
      break;
    case "dimensions":
      header = "Wymiary";
      break;
    case "ratings":
      header = "Opinie";
      break;
    case "installment-purchase":
      header = "Na raty w IKEA";
      break;

    default:
      break;
  }

  return (
    <>
      {data && (
        <>
          <header className="side-modal__header">
            <div className="side-modal__btns-wrapper">
              {data.type === "preffered-shop" && (
                <Btn
                  variant="light"
                  shape="circle"
                  className="side-modal__go-back-btn"
                  onClick={() => setModalData({ type: "choose-shop" })}
                >
                  <ArrowLeftIcon />
                </Btn>
              )}
              <Btn
                variant="light"
                shape="circle"
                className="side-modal__close-btn"
                type="button"
                onClick={closeModal}
              >
                <span className="visually-hidden">Zamknij</span>
                <CloseIcon />
              </Btn>
            </div>
            <h2
              className={`side-modal__heading${data.type === "log-in" ? ` visually-hidden` : ""}`}
            >
              {header}
            </h2>
          </header>

          <div className="side-modal__content-wrapper scrollbar-style">
            <Suspense fallback={<LoadingSpinner />}>
              {data.type === "choose-size" && <ChooseSize data={data} />}
              {data.type === "choose-color" && <ChooseColor data={data} />}
              {data.type === "choose-shop" && <PostalCode modalType={data.type} />}
              {data.type === "postal-code" && <PostalCode modalType={data.type} />}
              {data.type === "preffered-shop" && <PrefferedShop />}
              {data.type === "chosen-shop" && <ChosenShop />}
              {data.type === "log-in" && <Login />}
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
