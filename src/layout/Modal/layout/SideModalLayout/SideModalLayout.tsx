// React
import { Suspense } from "react";
// Hooks
import useModal from "../../../../hooks/useModal";
// Modal Variants
import ChooseSize from "../../variants/ChooseSize/ChooseSize";
import ChooseColor from "../../variants/ChooseColor/ChooseColor";
import PostalCode from "../../variants/PostalCode/PostalCode";
// Components
import Btn from "../../../../components/Btn/Btn";
// Types
import {
  ModalChooseShopType,
  ModalDataChooseColorType,
  ModalDataChooseSizeType,
  ModalDataDimensionsType,
  ModalDataInstallmentPurchaseType,
  ModalDataItemsIncludedType,
  ModalDataProductInformationType,
  ModalDataRatingsType,
  ModalZipCodeType,
} from "../../../../pages/ProductPage/types/ModalTypes";
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";
import ChooseShop from "../../variants/ChooseShop/ChooseShop";

export default function SideModalLayout({
  data,
}: {
  data:
    | ModalDataChooseSizeType
    | ModalDataChooseColorType
    | ModalDataProductInformationType
    | ModalDataItemsIncludedType
    | ModalDataDimensionsType
    | ModalDataRatingsType
    | ModalDataInstallmentPurchaseType
    | ModalZipCodeType
    | ModalChooseShopType;
}) {
  const { closeModal } = useModal();

  return (
    <>
      {data && (
        <>
          <div className="side-modal__header">
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
            <h2 className="side-modal__heading">{data.header}</h2>
          </div>

          <div className="side-modal__content-wrapper scrollbar-style">
            <Suspense fallback="Loading...">
              {data.type === "choose-size" && <ChooseSize data={data} />}
              {data.type === "choose-color" && <ChooseColor data={data} />}
              {data.type === "zip-code" && <PostalCode />}
              {data.type === "choose-shop" && <ChooseShop />}
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
