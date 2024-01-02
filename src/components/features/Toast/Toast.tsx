// Import React dependencies
import { useEffect } from "react";
// Import custom hooks
import useToast from "../../../hooks/useToast";
// Import components
import { Btn } from "../../ui/Btn/Btn";
// Import icons
import CloseIcon from "../../../Icons/CloseIcon";
// Import styles
import "./index.scss";

/**
 * Toast Component
 *
 * This component displays a toast notification with a message, a link, a button to restore the previous state, and a close button.
 *
 * @returns A dialog element with a class of "toast-notification" and "toast-notification--left" if the toast should be aligned to the left, and an open attribute if the toast is open, containing a paragraph element with the toast message, an a element with the class of "toast-notification__text-accent" and the link if provided, a button with the class of "toast-notification__text-accent" and the restore function if provided, and a Btn component with the shape of "circle" and the close function.
 */
export default function Toast() {
  const { toastData, closeToast } = useToast(); // Use the useToast hook to get the toast data and the close function
  const { open, text, link, alignLeft, prevState } = toastData; // Destructure the toast data

  // Use an effect to close the toast after 7.5 seconds if it's open
  useEffect(() => {
    let timer: number;

    if (open) {
      timer = setTimeout(() => {
        closeToast();
      }, 7500);
    }

    // Clear the timeout if the toast is closed
    return () => {
      clearTimeout(timer);
    };
  }, [closeToast, open]);

  // Define the restore function to restore the previous state and close the toast
  function restore() {
    if (prevState) {
      prevState();

      closeToast();
    }
  }

  return (
    <>
      {open && (
        <dialog
          className={`toast-notification${alignLeft ? " toast-notification--left" : ""}`}
          open={open}
        >
          <p>{text}</p>

          {/* If a link is provided, display it */}
          {link && (
            <a
              className="toast-notification__text-accent"
              href={link}
            >
              Pokaż
            </a>
          )}

          {/* If a previous state function is provided, display a button to restore it */}
          {prevState && (
            <button
              className="toast-notification__text-accent"
              onClick={restore}
            >
              Cofnij
            </button>
          )}

          <Btn
            shape="circle"
            onClick={closeToast}
          >
            <span className="visually-hidden">Zamknij</span>
            <CloseIcon />
          </Btn>
        </dialog>
      )}
    </>
  );
}
