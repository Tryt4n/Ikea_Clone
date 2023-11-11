// React
import { ReactNode, createContext, useEffect, useRef, useState } from "react";
// Components
import { Modal } from "../components/Modal/Modal";
// Types
import { ModalDataType } from "../pages/ProductPage/types/ModalTypes";

type ModalContextType = {
  modalID: string;
  closeModal: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
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

  const contextValues = {
    modalID,
    closeModal,
    isModalOpen,
    setIsModalOpen,
    modalData,
    setModalData,
  };

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
