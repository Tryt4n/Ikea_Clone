// React
import { Suspense } from "react";
// Hooks
import useModal from "../../../../hooks/useModal";
// Modal Variants
import ChooseSize from "../../variants/ChooseSize/ChooseSize";
import ChooseColor from "../../variants/ChooseColor/ChooseColor";
// Types
import {
  ModalDataChooseColorType,
  ModalDataChooseSizeType,
} from "../../../../pages/ProductPage/types/ModalTypes";
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";

export default function SideModal({
  data,
}: {
  data: ModalDataChooseSizeType | ModalDataChooseColorType;
}) {
  const { closeModal } = useModal();

  return (
    <>
      {data && (
        <>
          <div className="side-modal__header">
            <button
              className="side-modal__close-btn"
              type="button"
              onClick={closeModal}
            >
              <span className="visually-hidden">Zamknij</span>
              <CloseIcon />
            </button>
            <h2 className="side-modal__heading">{data.header}</h2>
          </div>

          <div className="side-modal__content-wrapper scrollbar-style">
            <Suspense fallback="Loading...">
              {data.type === "choose-size" && <ChooseSize data={data} />}
              {data.type === "choose-color" && <ChooseColor data={data} />}
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
