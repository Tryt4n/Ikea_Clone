import type { ReactNode } from "react";

export function ListItemHeadingContainer({ children }: { children: ReactNode }) {
  return <h3 className="collection-list__item-heading-container">{children}</h3>;
}
