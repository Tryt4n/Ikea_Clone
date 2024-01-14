/**
 * ModalContext.tsx
 *
 * This file contains the definition of the context for the modal. This context contains information about the state of the modal,
 * such as the data to be displayed in the modal, functions to open and close the modal, and the modal ID.
 *
 * The context is provided by `ModalContextProvider`, which is a wrapper component.
 */

// Import react dependencies
import { createContext, useEffect, useMemo, useRef, useState } from "react";
// Import Modal component
import { Modal } from "../../layout/Modal/Modal";
// Import types
import type { ReactNode, MouseEvent, KeyboardEvent } from "react";
import type { ModalDataType } from "../../layout/Modal/types/ModalTypes";

// Define context type
type ModalContextType = {
  modalID: string; // ID of the modal
  closeModal: () => void; // Function to close the modal
  modalData: ModalDataType | undefined; // Data to be displayed in the modal
  setModalData: (data: ModalDataType | undefined) => void; // Function to set the modal data
};

// Create context
export const ModalContext = createContext<ModalContextType | null>(null);

/**
 * ModalContextProvider
 *
 * Component providing the modal context. Contains logic for opening and closing the modal,
 * as well as handling clicks and key presses.
 *
 * @param {ReactNode} children - The children of the component, which have access to the modal context.
 */
export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [modalData, setModalData] = useState<ModalDataType | undefined>();
  const [modalID] = useState("F2GA5G24SI"); // ID of the modal
  const modalRef = useRef<null | HTMLDialogElement>(null);

  /**
   * showModal
   *
   * Function to display the modal. Adds the "show" class to the modal.
   */
  function showModal() {
    if (!modalRef.current) return;

    modalRef.current.showModal();

    modalRef.current.classList.add("show");
  }

  /**
   * closeModal
   *
   * Function to close the modal. Removes the "show" class from the modal and after a short delay
   * due to hiding styles closes the modal and clears the modal data.
   */
  function closeModal() {
    if (!modalRef.current) return; // If the modal ref is not set, return

    modalRef.current.classList.remove("show");

    setTimeout(() => {
      if (!modalRef.current) return;

      modalRef.current.close();
      setModalData(undefined); // Clear the modal data
    }, 325); // Delay closing the modal to allow for hiding styles to be applied
  }

  /**
   * closeModalOnBackdropClick
   *
   * Function to close the modal on backdrop click with the {@link closeModal} function. Checks if the click occurred
   * outside the dialog area, and if so, closes the modal.
   *
   * @param {MouseEvent<HTMLDialogElement>} e - The click event object.
   */
  function closeModalOnBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.currentTarget !== e.target) return; // If the click did not occur on the backdrop, return

    const dialogDimensions = (
      e.target as HTMLDialogElement
    ).getBoundingClientRect(); // Get the dimensions of the dialog

    // If the click occurred outside the dialog area, close the modal
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  }

  /**
   * closeModalOnEscapeKey
   *
   * Function to close the modal on Escape key press. Prevents the default close behavior
   * and closes the modal with the {@link closeModal} function.
   *
   * @param {KeyboardEvent<HTMLDialogElement>} e - The key press event object.
   */
  function closeModalOnEscapeKey(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
  }

  // Show the modal when the modal data is set and hide it when it is cleared
  useEffect(() => {
    if (modalData && modalData.type !== undefined) {
      showModal();
    } else {
      closeModal();
    }
  }, [modalData]);

  // Create context values object to be passed to the provider
  const contextValues = useMemo(
    () => ({
      modalID,
      closeModal,
      modalData,
      setModalData,
    }),
    [modalID, modalData],
  );

  return (
    <ModalContext.Provider value={contextValues}>
      <>
        {children}
        {/* Render the modal */}
        <Modal
          ref={modalRef} // Ref to the modal
          onClickFunction={closeModalOnBackdropClick} // Function to close the modal on backdrop click
          onKeyDownFunction={closeModalOnEscapeKey} // Function to close the modal on escape key press
        />
      </>
    </ModalContext.Provider>
  );
}
