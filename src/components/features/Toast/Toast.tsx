// React
import { useEffect } from "react";
// Custom Hooks
import useToast from "../../../hooks/useToast";
// Components
import { Btn } from "../../ui/Btn/Btn";
// Icons
import CloseIcon from "../../../Icons/CloseIcon";
// Style
import "./index.scss";

export default function Toast() {
  const { toastData, closeToast } = useToast();
  const { open, text, link, alignLeft, prevState } = toastData;

  useEffect(() => {
    let timer: number;

    if (open) {
      timer = setTimeout(() => {
        closeToast();
      }, 7500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [closeToast, open]);

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

          {link && (
            <a
              className="toast-notification__text-accent"
              href={link}
            >
              Pokaż
            </a>
          )}

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
