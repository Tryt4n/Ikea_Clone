// React
import { FC } from "react";
// Icons
import FacebookIcon from "../../../../Icons/FacebookIcon";
import InstagramIcon from "../../../../Icons/InstagramIcon";
import PinterestIcon from "../../../../Icons/PinterestIcon";
import TwitterIcon from "../../../../Icons/TwitterIcon";
import YoutubeIcon from "../../../../Icons/YoutubeIcon";
import LinkedInIcon from "../../../../Icons/LinkedInIcon";
import BlikIcon from "../../../../Icons/BlikIcon";
import Przelewy24Icon from "../../../../Icons/Przelewy24Icon";
import MastercardIcon from "../../../../Icons/MastercardIcon";
import VisaIcon from "../../../../Icons/VisaIcon";
import IkanoIcon from "../../../../Icons/IkanoIcon";
import ApplePayIcon from "../../../../Icons/ApplePayIcon";
import GiftBoxIcon from "../../../../Icons/GiftBoxIcon";
// Style
import "./index.scss";

type IconType = {
  [key: string]: FC<React.SVGProps<SVGSVGElement>>;
};

type NavListPropsType = {
  list: string[];
  iconsRounded?: boolean;
};

const iconComponents: IconType = {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TwitterIcon,
  YoutubeIcon,
  LinkedInIcon,
  BlikIcon,
  Przelewy24Icon,
  MastercardIcon,
  VisaIcon,
  IkanoIcon,
  ApplePayIcon,
  GiftBoxIcon,
};

export function NavList({ list, iconsRounded, ...props }: NavListPropsType) {
  return (
    <ul className="footer__nav-links-list">
      {list.map((link) => {
        const Icon = iconComponents[`${link}Icon`];

        return (
          <li
            key={link}
            className={iconsRounded ? "icons-rounded" : undefined}
          >
            <a
              href="#"
              {...props}
            >
              <span className="visually-hidden">{link}</span>
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
