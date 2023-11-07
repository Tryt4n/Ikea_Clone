// React
import { useEffect, useRef, lazy, Suspense } from "react";
// Context
import useModal from "../../hooks/useModal";
// Modal Variants
// import ChooseSize from "./variants/ChooseSize/ChooseSize";
const ChooseSize = lazy(() => import("./variants/ChooseSize/ChooseSize"));
const ChooseColor = lazy(() => import("./variants/ChooseColor/ChooseColor"));
// const ChooseSize = lazy(() => wait(1000).then(() => import("./variants/ChooseSize/ChooseSize")));
// Icons
import CloseIcon from "../../Icons/CloseIcon";
// Style
import "./index.scss";

//!
// function wait(duration: number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// }
//!

export default function Modal() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const { isModalOpen, setIsModalOpen, modalData, setModalData } = useModal();

  function showModal() {
    if (!modalRef.current) return;

    modalRef.current.showModal();
    setIsModalOpen(true);

    modalRef.current.classList.add("show");
  }

  function closeModal() {
    if (!modalRef.current) return;

    modalRef.current.classList.remove("show");

    setTimeout(() => {
      if (!modalRef.current) return;

      modalRef.current.close();
      setIsModalOpen(false);
      setModalData(undefined);
    }, 325);
  }

  function closeModalOnBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (!e.target) return;

    const dialogDimensions = (e.target as HTMLDialogElement).getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  }

  function closeModalOnEscapeKey(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "Escape" && isModalOpen) {
      e.preventDefault();
      closeModal();
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      showModal();
    } else {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  useEffect(() => {
    console.log(modalData);
  }, [modalData]);

  return (
    <>
      {modalData && (
        <dialog
          ref={modalRef}
          className="side-modal"
          onClick={closeModalOnBackdropClick}
          onKeyDown={closeModalOnEscapeKey}
        >
          <button
            type="button"
            onClick={closeModal}
          >
            <span className="visually-hidden">Zamknij</span>
            <CloseIcon />
          </button>
          <h2>{modalData.header}</h2>

          <div>
            <Suspense fallback="Loading...">
              {modalData.type === "choose-size" && <ChooseSize data={modalData} />}
              {modalData.type === "choose-color" && <ChooseColor data={modalData} />}
            </Suspense>
          </div>
        </dialog>
      )}
    </>
  );
}
