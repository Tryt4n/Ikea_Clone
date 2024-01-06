// Import types
import type { FC, SVGProps } from "react";
// Import icons
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
// Import styles
import "./index.scss";

// Type for the icon components
type IconType = {
  [key: string]: FC<SVGProps<SVGSVGElement>>; // The key is a string and the value is a function component that returns an SVG element
};

// Type for the props of the NavList component
type NavListPropsType = {
  list: string[]; // The list of link names
  iconsRounded?: boolean; // Whether the icons should be rounded
};

// Object that contains the icon components
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

/**
 * NavList
 *
 * Component that serves as a navigation list for the footer of the application. It renders a list of links with associated icons.
 *
 * @param {string[]} props.list - The list of link names.
 * @param {boolean} props.iconsRounded - Whether the icons should be rounded.
 * @param {JSX.IntrinsicElements["a"]} props.props - The rest of the props are spread on the `a` element.
 * @returns {JSX.Element} The NavList component.
 */

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
              {...props} // Spread the rest of the props
            >
              {/* The `visually-hidden` class is used to hide the heading from the screen readers and SEO */}
              <span className="visually-hidden">{link}</span>
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
