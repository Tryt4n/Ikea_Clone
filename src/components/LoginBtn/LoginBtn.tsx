// React
import { ButtonHTMLAttributes } from "react";
// Custom Hooks
import useModal from "../../hooks/useModal";
// Icon
import AvatarIcon from "../../Icons/AvatarIcon";

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
    <button
      className={className ? className : undefined}
      {...props}
      onClick={openModal}
    >
      <AvatarIcon />
      <span className={short ? "visually-hidden" : undefined}>Hej! Zaloguj się</span>
    </button>
  );
}
