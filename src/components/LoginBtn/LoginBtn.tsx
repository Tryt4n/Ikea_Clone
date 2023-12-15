// React
import { ButtonHTMLAttributes } from "react";
// Custom Hooks
import useModal from "../../hooks/useModal";
// Types
import type { BtnShapesType } from "../../types/btnTypes";
// Components
import { Btn } from "../Btn/Btn";
// Icon
import AvatarIcon from "../../Icons/AvatarIcon";
// Style
import "./index.scss";

type LoginBtnPropsType = {
  className?: string;
  short?: boolean;
  shape?: BtnShapesType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function LoginBtn({
  className,
  short,
  shape = "oval",
  ...props
}: LoginBtnPropsType) {
  const { setModalData } = useModal();

  function openLoginModal() {
    setModalData({
      type: "log-in",
    });
  }

  return (
    <Btn
      variant="light"
      shape={shape}
      onClick={openLoginModal}
      className={`login-btn${className ? ` ${className}` : undefined}`}
      {...props}
    >
      <AvatarIcon />
      <span className={short ? "visually-hidden" : undefined}>Hej! Zaloguj się</span>
    </Btn>
  );
}
