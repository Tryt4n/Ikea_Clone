// Importing icons
import InstagramIcon from "../../../../Icons/InstagramIcon";

// Defining the type for the props of the InstagramBadge component
type InstagramBadgeType = {
  // The children prop is used to pass a string to be rendered inside the InstagramBadge component
  children: string;
  // The nickVisible prop is an optional boolean that can be used to specify whether the nickname should be visible in the InstagramBadge component
  nickVisible?: boolean;
};

/**
 * InstagramBadge component
 *
 * This component is a wrapper for a div element with the class of "article__instagram-badge".
 * It contains an InstagramIcon component and a div element with the class of "article__instagram-nickname", which contains a span element with the passed string.
 * The nickVisible prop can be used to add the class of "article__instagram-nickname--hide" to the div element, which hides the nickname.
 *
 * @param children - The string to be rendered inside the InstagramBadge component.
 * @param nickVisible - Whether the nickname should be visible in the InstagramBadge component. Defaults to true.
 *
 * @returns A div element with the class of "article__instagram-badge", containing an InstagramIcon component and a div element with the class of "article__instagram-nickname" (and optionally "article__instagram-nickname--hide"), which contains a span element with the passed string.
 */

export function InstagramBadge({ children, nickVisible = true }: InstagramBadgeType) {
  return (
    <div
      className="article__instagram-badge"
      aria-label="Użytkownik Instagram"
    >
      <InstagramIcon />
      <div
        className={`article__instagram-nickname${
          !nickVisible ? ` article__instagram-nickname--hide` : ""
        }`}
      >
        <span>{children}</span>
      </div>
    </div>
  );
}
