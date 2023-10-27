import React, { HTMLProps } from "react";
import useSideMenu from "../../hooks/useSideMenu";

type ListElementPropsType = {
  text?: string;
  link?: string;
  className?: string;
  menuOpen: boolean;
} & HTMLProps<HTMLAnchorElement>;

export function ListElement({
  text,
  link = "#",
  className,
  menuOpen,
  ...props
}: ListElementPropsType) {
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
