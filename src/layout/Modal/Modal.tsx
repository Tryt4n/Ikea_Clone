// React
import { forwardRef, ForwardedRef } from "react";
// Context
import useModal from "../../hooks/useModal";
// Modal
import SideModalLayout from "./layout/SideModalLayout/SideModalLayout";
import MenuLayout from "./layout/MenuLayout/MenuLayout";
import ImagePreview from "./variants/ImagePreview/ImagePreview";
import ImageWithProducts from "./variants/ImageWithProducts/ImageWithProducts";
// Types
import type { ModalDataType } from "../../pages/ProductPage/types/ModalTypes";

type ModalPropsType = {
  onClickFunction: (e: React.MouseEvent<HTMLDialogElement>) => void;
  onKeyDownFunction: (e: React.KeyboardEvent<HTMLDialogElement>) => void;
};

export type ModalTypes = "side-modal" | "image-modal" | "image-with-products-modal" | "menu-modal";

function InnerComponent(
  { onKeyDownFunction, onClickFunction }: ModalPropsType,
  ref: ForwardedRef<HTMLDialogElement>
) {
  const { modalID, modalData } = useModal();

  const typeToClassMap: Record<ModalDataType["type"], ModalTypes> = {
    "choose-color": "side-modal",
    "choose-size": "side-modal",
    "product-information": "side-modal",
    "items-included": "side-modal",
    dimensions: "side-modal",
    ratings: "side-modal",
    "installment-purchase": "side-modal",
    "postal-code": "side-modal",
    "choose-shop": "side-modal",
    "preffered-shop": "side-modal",
    "chosen-shop": "side-modal",
    "log-in": "side-modal",
    refund: "side-modal",
    "data-encryption": "side-modal",
    "image-preview": "image-modal",
    "image-with-products": "image-with-products-modal",
    menu: "menu-modal",
    "products-menu": "menu-modal",
    "rooms-menu": "menu-modal",
  };

  const modalClass = modalData ? typeToClassMap[modalData?.type] : undefined;

  return (
    <dialog
      ref={ref}
      id={modalID}
      className={modalClass}
      onClick={onClickFunction}
      onKeyDown={onKeyDownFunction}
    >
      {modalData &&
        (((modalData.type === "choose-color" ||
          modalData.type === "choose-size" ||
          modalData.type === "product-information" ||
          modalData.type === "items-included" ||
          modalData.type === "dimensions" ||
          modalData.type === "ratings" ||
          modalData.type === "installment-purchase" ||
          modalData.type === "postal-code" ||
          modalData.type === "choose-shop" ||
          modalData.type === "preffered-shop" ||
          modalData.type === "chosen-shop" ||
          modalData.type === "log-in" ||
          modalData.type === "refund" ||
          modalData.type === "data-encryption") && (
          <>
            <SideModalLayout data={modalData} />
          </>
        )) ||
          (modalData.type === "image-preview" && (
            <>
              <ImagePreview data={modalData} />
            </>
          )) ||
          (modalData.type === "image-with-products" && (
            <>
              <ImageWithProducts data={modalData} />
            </>
          )) ||
          ((modalData.type === "menu" ||
            modalData.type === "products-menu" ||
            modalData.type === "rooms-menu") && (
            <>
              <MenuLayout data={modalData} />
            </>
          )))}
    </dialog>
  );
}

export const Modal = forwardRef(InnerComponent);
