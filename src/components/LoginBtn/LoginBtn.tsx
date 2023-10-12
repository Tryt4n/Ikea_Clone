// Icon
import AvatarIcon from "../../Icons/AvatarIcon";

type LoginBtnPropsType = {
  className?: string;
  short?: boolean;
};

export default function LoginBtn({ className, short }: LoginBtnPropsType) {
  return (
    <a
      href="#"
      className={className ? className : undefined}
    >
      <AvatarIcon />
      <span className={short ? "visually-hidden" : undefined}>Hej! Zaloguj się</span>
    </a>
  );
}
