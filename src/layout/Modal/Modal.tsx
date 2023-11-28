// React
import { forwardRef, ForwardedRef } from "react";
// Context
import useModal from "../../hooks/useModal";
// Modal
import SideModalLayout from "./layout/SideModalLayout/SideModalLayout";
import MenuLayout from "./layout/MenuLayout/MenuLayout";
import ImagePreview from "./variants/ImagePreview/ImagePreview";
import ImageWithProducts from "./variants/ImageWithProducts/ImageWithProducts";

type ModalPropsType = {
  onClickFunction: (e: React.MouseEvent<HTMLDialogElement>) => void;
  onKeyDownFunction: (e: React.KeyboardEvent<HTMLDialogElement>) => void;
};

function InnerComponent(
  { onKeyDownFunction, onClickFunction }: ModalPropsType,
  ref: ForwardedRef<HTMLDialogElement>
) {
  const { modalID, modalData } = useModal();

  const typeToClassMap: Record<string, string> = {
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
    "image-preview": "image-modal",
    "image-with-products": "image-with-products-modal",
    menu: "menu-modal",
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
          modalData.type === "log-in") && (
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
          (modalData.type === "menu" && (
            <>
              <MenuLayout data={modalData} />
            </>
          )))}
    </dialog>
  );
}

export const Modal = forwardRef(InnerComponent);
