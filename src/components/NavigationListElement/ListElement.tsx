import { HTMLProps } from "react";
import useSideMenu from "../../hooks/useSideMenu";

type ListElementPropsType = {
  text?: string;
  link?: string;
  className?: string;
  menuOpen: boolean;
};

type ListElementType = HTMLProps<HTMLAnchorElement> & ListElementPropsType;

export function ListElement({ text, link = "#", className, menuOpen, ...props }: ListElementType) {
  const { isMenuOpen } = useSideMenu();

  return (
    <li>
      <a
        href={link}
        tabIndex={!menuOpen ? (isMenuOpen ? 0 : -1) : isMenuOpen ? -1 : 0}
        className={className}
        {...props}
      >
        {text}
      </a>
    </li>
  );
}
