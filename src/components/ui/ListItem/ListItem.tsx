import { ReactNode } from "react";

type ListItemPropsType = {
  as?: "a" | "button";
  link?: string;
  className?: string;
  children: ReactNode;
  onClickFunction?: () => void;
};

export default function ListItem({
  as = "a",
  link = "#",
  children,
  className,
  onClickFunction,
}: ListItemPropsType) {
  const Element = as;

  return (
    <li className={className ? className : undefined}>
      <Element
        href={as === "a" ? link : undefined}
        onClick={onClickFunction}
      >
        {children}
      </Element>
    </li>
  );
}
