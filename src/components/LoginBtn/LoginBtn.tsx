// Icon
import { HTMLProps } from "react";
import AvatarIcon from "../../Icons/AvatarIcon";

type LoginBtnPropsType = {
  className?: string;
  short?: boolean;
};

type CustomAnchorProps = HTMLProps<HTMLAnchorElement> & LoginBtnPropsType;

export default function LoginBtn({ className, short, ...props }: CustomAnchorProps) {
  return (
    <a
      href="#"
      className={className ? className : undefined}
      {...props}
    >
      <AvatarIcon />
      <span className={short ? "visually-hidden" : undefined}>Hej! Zaloguj się</span>
    </a>
  );
}
