import type { ReactNode } from "react";

export function ListItemHeading({ children }: { children: ReactNode }) {
  return <span className="collection-list__item-heading">{children}</span>;
}
