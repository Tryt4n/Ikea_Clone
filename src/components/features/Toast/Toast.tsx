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

  const { open, text, link } = toastData;

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

  return (
    <>
      {open && (
        <dialog
          className="toast-notification"
          open={open}
        >
          <p>{text}</p>
          <a href={link}>Pokaż</a>
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
