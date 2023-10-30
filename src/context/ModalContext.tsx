// React
import { ReactNode, createContext, useEffect, useRef, useState } from "react";
// Components
import { ImgModalWithProducts } from "../components/ImgModalWithProducts/ImgModalWithProducts";
// Types
import { CardCollectionType } from "../layout/Articles/components/ImageCardCollection/ImageCardCollection";

type ModalContextType = {
  modalId: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setModalData: (data: CardCollectionType) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<CardCollectionType>();

  const modalRef = useRef<null | HTMLDialogElement>(null);
  const modalId = "kh9ngakrff";

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
    e.preventDefault();

    if (e.key === "Escape" && isModalOpen) {
      closeModal();
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      showModal();
    } else {
      closeModal();
    }
  }, [isModalOpen]);

  const contextValue = {
    modalId,
    isModalOpen,
    setIsModalOpen,
    setModalData,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      <>
        {children}
        <ImgModalWithProducts
          id={modalId}
          closeModal={closeModal}
          onClickFunction={closeModalOnBackdropClick}
          onKeyDownFunction={closeModalOnEscapeKey}
          modalData={modalData}
          ref={modalRef}
        />
      </>
    </ModalContext.Provider>
  );
}
