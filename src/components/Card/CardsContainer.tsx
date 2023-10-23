import { HTMLProps, ReactNode } from "react";

type CardContainerPropsType = {
  children: ReactNode;
  breakOnMobile?: boolean;
} & HTMLProps<HTMLDivElement>;

export default function CardsContainer({
  children,
  breakOnMobile = false,
}: CardContainerPropsType) {
  return (
    <div className={`cards-container${breakOnMobile ? ` breakOnMobile` : ""}`}>{children}</div>
  );
}
