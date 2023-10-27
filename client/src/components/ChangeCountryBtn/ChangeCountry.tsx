// React
import React, { HTMLProps } from "react";
// Icons
import GlobeIcon from "../../Icons/GlobeIcon";
// Style
import "./index.scss";

export default function ChangeCountry({ ...props }: HTMLProps<HTMLAnchorElement>) {
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
