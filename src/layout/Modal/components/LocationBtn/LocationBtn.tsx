import { HTMLProps } from "react";
import "./index.scss";

type LocationBtnPropsType = {
  className?: string;
} & HTMLProps<HTMLButtonElement>;

export default function LocationBtn({ className }: LocationBtnPropsType) {
  return (
    <button
      type="button"
      className={`current-location-btn${className ? ` ${className}` : ""}`}
    >
      Użyj obecnej lokalizacji
    </button>
  );
}
