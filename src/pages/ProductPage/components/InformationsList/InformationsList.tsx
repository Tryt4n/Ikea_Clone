// React
import { ReactNode } from "react";
// Custom Hooks
import useModal from "../../../../hooks/useModal";
// Components
import RatingBlock from "../../../../components/RatingBlock/RatingBlock";
// Icons
import ArrowRightIcon from "../../../../Icons/ArrowRightIcon";
// Type
import { ProductDataType } from "../../types/ProductDataType";
import {
  ModalDataDimensionsType,
  ModalDataInstallmentPurchaseType,
  ModalDataItemsIncludedType,
  ModalDataProductInformationType,
  ModalDataRatingsType,
} from "../../types/ModalTypes";
// Styles
import "./index.scss";

export default function InformationsList({ rating }: { rating?: ProductDataType["rating"] }) {
  return (
    <ul className="product-information">
      <InformationItem heading="Informacje o produkcie" />

      <InformationItem heading="Elementy w zestawie" />

      <InformationItem heading="Wymiary" />

      <InformationItem heading="Opinie">
        {rating && <RatingBlock rating={rating} />}
      </InformationItem>

      <InformationItem heading="Na raty w IKEA" />
    </ul>
  );
}

type TypeInformationItemType =
  | ModalDataProductInformationType["type"]
  | ModalDataItemsIncludedType["type"]
  | ModalDataDimensionsType["type"]
  | ModalDataRatingsType["type"]
  | ModalDataInstallmentPurchaseType["type"];

function InformationItem({ heading, children }: { heading: string; children?: ReactNode }) {
  const { modalID, setIsModalOpen, setModalData } = useModal();

  let type: TypeInformationItemType;
  function openModal() {
    setIsModalOpen(true);

    switch (heading) {
      case "Informacje o produkcie":
        type = "product-information";
        break;

      case "Elementy w zestawie":
        type = "items-included";
        break;

      case "Wymiary":
        type = "dimensions";
        break;

      case "Opinie":
        type = "ratings";
        break;

      case "Na raty w IKEA":
        type = "installment-purchase";
        break;
    }

    setModalData({
      type,
      header: heading,
    });
  }

  return (
    <li>
      <button
        type="button"
        className="product-information__btn"
        aria-controls={modalID}
        onClick={openModal}
      >
        <div>
          <h4 className="product-information__heading">{heading}</h4>
          {children}
        </div>
        <ArrowRightIcon />
      </button>
    </li>
  );
}
