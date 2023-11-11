// React
import { forwardRef, ForwardedRef } from "react";
// Context
import useModal from "../../hooks/useModal";
// Modal
import SideModal from "./layout/SideModal/SideModal";
import ImagePreview from "./variants/ImagePreview/ImagePreview";
import ImageWithProducts from "./variants/ImageWithProducts/ImageWithProducts";
// Styles
import "./styles/index.scss";

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
    "image-preview": "image-modal",
    "image-with-products": "image-with-products-modal",
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
        (((modalData.type === "choose-color" || modalData.type === "choose-size") && (
          <>
            <SideModal data={modalData} />
          </>
        )) ||
          (modalData.type === "image-preview" && (
            <>
              <ImagePreview />
            </>
          )) ||
          (modalData.type === "image-with-products" && (
            <>
              <ImageWithProducts data={modalData} />
            </>
          )))}
    </dialog>
  );
}

export const Modal = forwardRef(InnerComponent);
