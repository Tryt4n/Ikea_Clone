import { ReactNode, createContext, useEffect, useRef, useState } from "react";

type ModalContextType = {
  modalId: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  imgSrc: string;
  setImgSrc: (src: string) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("someText");

  const modalRef = useRef<null | HTMLDialogElement>(null);
  const modalId = "kh9ngakrff";

  function showModal() {
    if (!modalRef.current) return;

    modalRef.current.showModal();
    setIsModalOpen(true);
  }

  function closeModal() {
    if (!modalRef.current) return;

    modalRef.current.close();
    setIsModalOpen(false);
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
    setImgSrc,
    imgSrc,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      <>
        <dialog
          id={modalId}
          ref={modalRef}
          onClick={closeModalOnBackdropClick}
          onKeyDown={closeModalOnEscapeKey}
        >
          <button
            type="button"
            onClick={closeModal}
            autoFocus
          >
            X
          </button>
          <p>Przykładowy dialog</p>
          <img
            src={imgSrc}
            alt=""
          />
        </dialog>
        {children}
      </>
    </ModalContext.Provider>
  );
}
