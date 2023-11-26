// React
import { Suspense } from "react";
// Hooks
import useModal from "../../../../hooks/useModal";
// Modal Variants
import ChooseSize from "../../variants/ChooseSize/ChooseSize";
import ChooseColor from "../../variants/ChooseColor/ChooseColor";
import PostalCode from "../../variants/PostalCode/PostalCode";
import PrefferedShop from "../../variants/PrefferedShop/PrefferedShop";
import ChosenShop from "../../variants/ChosenShop/ChosenShop";
import Login from "../../variants/Login/Login";
// Components
import Btn from "../../../../components/Btn/Btn";
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

  function goBack() {
    setModalData({
      type: "choose-shop",
      header: "Znajdź swój preferowany sklep",
    });
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
                  onClick={goBack}
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
              {data.header}
            </h2>
          </header>

          <div className="side-modal__content-wrapper scrollbar-style">
            <Suspense fallback="Loading...">
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
