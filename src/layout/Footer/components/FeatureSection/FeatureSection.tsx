// Import react dependencies
import { ReactNode } from "react";
// Import components
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import styles
import "./index.scss";

/**
 * FeatureSection
 *
 * Component that serves as a section for the footer of the application. It renders the header, body, and footer of the section.
 *
 * @param {ReactNode} props.children - The children of the component.
 * @returns {JSX.Element} The FeatureSection component.
 */

export function FeatureSection({ children }: { children: ReactNode }) {
  return <section className="footer__features">{children}</section>;
}

// Export the components of the FeatureSection component
FeatureSection.Header = Header;
FeatureSection.Body = InnerText;
FeatureSection.Footer = Navigation;

/**
 * Header
 *
 * Component that renders a `h3` element.
 *
 * @param {string} props.children - The children of the component.
 * @returns {JSX.Element} The Header component.
 */
function Header({ children }: { children: string }) {
  return <h3>{children}</h3>;
}

/**
 * InnerText
 *
 * Component that renders a `p` element.
 *
 * @param {string} props.children - The children of the component.
 * @returns {JSX.Element} The InnerText component.
 */
function InnerText({ children }: { children: string }) {
  return <p>{children}</p>;
}

/**
 * Navigation
 *
 * Component that renders a `LearnMoreLink` component and a `Btn` component.
 *
 * @returns {JSX.Element} The Navigation component.
 */
function Navigation() {
  return (
    <>
      <LearnMoreLink />
      <Btn>Dołącz lub zaloguj się</Btn>
    </>
  );
}

/**
 * LearnMoreLink
 *
 * Component that renders an `a` element with the class "footer__learn-more".
 *
 * @returns {JSX.Element} The LearnMoreLink component.
 */
function LearnMoreLink() {
  return (
    <a
      href="#"
      className="footer__learn-more"
    >
      Dowiedz się więcej
    </a>
  );
}
