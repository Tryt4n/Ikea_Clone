// React
import { ButtonHTMLAttributes } from "react";
// Custom Hooks
import useModal from "../../hooks/useModal";
// Components
import Btn from "../Btn/Btn";
// Icon
import AvatarIcon from "../../Icons/AvatarIcon";
// Style
import "./index.scss";

type LoginBtnPropsType = {
  className?: string;
  short?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function LoginBtn({ className, short, ...props }: LoginBtnPropsType) {
  const { setIsModalOpen, setModalData } = useModal();

  function openModal() {
    setIsModalOpen(true);
    setModalData({
      type: "log-in",
    });
  }

  return (
    <Btn
      variant="light"
      onClick={openModal}
      className={`login-btn${className ? ` ${className}` : undefined}`}
      {...props}
    >
      <AvatarIcon />
      <span className={short ? "visually-hidden" : undefined}>Hej! Zaloguj się</span>
    </Btn>
  );
}
