import { ReactNode, createContext, useState } from "react";
import Modal from "../components/Modal/Modal";
import { ProductDataType } from "../pages/ProductPage/types/ProductDataType";
import { Params } from "react-router-dom";

type ModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  modalData: ModalDataType | undefined;
  setModalData: (data: ModalDataType | undefined) => void;
};

export type ModalDataType = {
  type: ModalVariants;
  header: string;
  productData: ProductDataType;
  path: Readonly<Params<string>>;
};

type ModalVariants = "choose-size" | "choose-color" | "choose-shop" | "postal-code";

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalDataType | undefined>();

  const contextValues = {
    isModalOpen,
    setIsModalOpen,
    modalData,
    setModalData,
  };

  return (
    <ModalContext.Provider value={contextValues}>
      <>
        {children}
        <Modal />
      </>
    </ModalContext.Provider>
  );
}
