import { HTMLProps } from "react";

type ListElementPropsType = {
  text?: string;
  link?: string;
  className?: string;
} & HTMLProps<HTMLAnchorElement>;

export default function ListElement({
  text,
  link = "#",
  className,
  ...props
}: ListElementPropsType) {
  return (
    <li>
      <a
        href={link}
        className={className}
        {...props}
      >
        {text}
      </a>
    </li>
  );
}
