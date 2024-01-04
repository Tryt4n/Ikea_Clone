// React
import {
  ReactNode,
  MouseEvent,
  KeyboardEvent,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// Components
import { Modal } from "../layout/Modal/Modal";
// Types
import type { ModalDataType } from "../layout/Modal/types/ModalTypes";

type ModalContextType = {
  modalID: string;
  closeModal: () => void;
  modalData: ModalDataType | undefined;
  setModalData: (data: ModalDataType | undefined) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [modalData, setModalData] = useState<ModalDataType | undefined>();

  const modalRef = useRef<null | HTMLDialogElement>(null);
  const modalID = "F2GA5G24SI";

  function showModal() {
    if (!modalRef.current) return;

    modalRef.current.showModal();

    modalRef.current.classList.add("show");
  }

  function closeModal() {
    if (!modalRef.current) return;

    modalRef.current.classList.remove("show");

    setTimeout(() => {
      if (!modalRef.current) return;

      modalRef.current.close();
      setModalData(undefined);
    }, 325);
  }

  function closeModalOnBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.currentTarget !== e.target) return;

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

  function closeModalOnEscapeKey(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
  }

  useEffect(() => {
    if (modalData && modalData.type !== undefined) {
      showModal();
    } else {
      closeModal();
    }
  }, [modalData]);

  const contextValues = useMemo(
    () => ({
      modalID,
      closeModal,
      modalData,
      setModalData,
    }),
    [modalID, modalData]
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
