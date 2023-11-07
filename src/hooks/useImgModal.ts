import { useContext } from "react";
import { ImgModalContext } from "../context/ImgModalContext";

export default function useImgModal() {
  const modal = useContext(ImgModalContext);

  if (modal == null) {
    throw new Error("useImgModal must be used within ModalContextProvider");
  }

  return modal;
}
