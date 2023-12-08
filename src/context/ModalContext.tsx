// React
import { ReactNode, createContext, useEffect, useMemo, useRef, useState } from "react";
// Components
import { Modal } from "../layout/Modal/Modal";
// Types
import type { ModalDataType } from "../pages/ProductPage/types/ModalTypes";

type ModalContextType = {
  modalID: string;
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  modalData: ModalDataType | undefined;
  setModalData: (data: ModalDataType | undefined) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalDataType | undefined>();

  const modalRef = useRef<null | HTMLDialogElement>(null);
  const modalID = "F2GA5G24SI";

  function showModal() {
    if (!modalRef.current) return;

    modalRef.current.showModal();
    setIsModalOpen(true);

    modalRef.current.classList.add("show");
  }

  function openModal() {
    setIsModalOpen(true);
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

  const contextValues = useMemo(
    () => ({
      modalID,
      closeModal,
      openModal,
      isModalOpen,
      modalData,
      setModalData,
    }),
    [modalID, isModalOpen, modalData]
  );

  return (
    <ModalContext.Provider value={contextValues}>
      <>
        {children}
        <Modal
          ref={modalRef}
          onClickFunction={closeModalOnBackdropClick}
          onKeyDownFunction={closeModalOnEscapeKey}
        />
      </>
    </ModalContext.Provider>
  );
}
