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

  const type = modalData?.type;

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
    "next-step": "side-modal",
    "image-preview": "image-modal",
    "image-with-products": "image-with-products-modal",
    menu: "menu-modal",
    "products-menu": "menu-modal",
    "rooms-menu": "menu-modal",
  };

  const modalClass = type ? typeToClassMap[type] : undefined;

  return (
    <dialog
      ref={ref}
      id={modalID}
      className={modalClass}
      onClick={onClickFunction}
      onKeyDown={onKeyDownFunction}
    >
      {modalData &&
        (((type === "choose-color" ||
          type === "choose-size" ||
          type === "product-information" ||
          type === "items-included" ||
          type === "dimensions" ||
          type === "ratings" ||
          type === "installment-purchase" ||
          type === "postal-code" ||
          type === "choose-shop" ||
          type === "preffered-shop" ||
          type === "chosen-shop" ||
          type === "log-in" ||
          type === "refund" ||
          type === "data-encryption" ||
          type === "next-step") && (
          <>
            <SideModalLayout data={modalData} />
          </>
        )) ||
          (type === "image-preview" && (
            <>
              <ImagePreview data={modalData} />
            </>
          )) ||
          (type === "image-with-products" && (
            <>
              <ImageWithProducts data={modalData} />
            </>
          )) ||
          ((type === "menu" || type === "products-menu" || type === "rooms-menu") && (
            <>
              <MenuLayout data={modalData} />
            </>
          )))}
    </dialog>
  );
}

export const Modal = forwardRef(InnerComponent);
