import { AnchorHTMLAttributes } from "react";
import GlobeIcon from "../../../Icons/GlobeIcon";

import "./index.scss";

export default function ChangeCountry({ ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href="#"
      className="change-country"
      {...props}
    >
      <GlobeIcon />
      <span>Zmień kraj</span>
    </a>
  );
}
