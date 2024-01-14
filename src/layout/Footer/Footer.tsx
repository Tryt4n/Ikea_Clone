/**
 * Footer.tsx
 *
 * This file contains the definition of the Footer component. This component serves as the footer
 * for the application and is responsible for rendering various sections including feature sections,
 * accordions, navigation lists, and a sub-list.
 *
 * The Footer component uses the `useMemo` hook from React to compute the current year for the copyright notice.
 *
 * The component uses several child components, including `FeatureSection`, `FooterAccordions`, `NavList`, `ChangeCountry`, and `SubList`.
 *
 * The `footerLinksList` and `footerPaymentsList` constants from the `footerLists` module are used to provide the data for the navigation lists.
 */

// Import react dependencies
import { useMemo } from "react";
// Import components
import { FeatureSection } from "./components/FeatureSection/FeatureSection";
import { FooterAccordions } from "./components/FooterAccordions/FooterAccordions";
import { NavList } from "./components/NavList/NavList";
import ChangeCountry from "../../components/ui/ChangeCountryBtn/ChangeCountry";
import SubList from "./components/SubList/SubList";
// Import constants
import {
  footerLinksList,
  footerPaymentsList,
} from "../../constants/footerLists";
// Import styles
import "./index.scss";

/**
 * Footer
 *
 * Component that serves as the footer for the application. It renders various sections including feature sections,
 * accordions, navigation lists, and a sub-list.
 *
 * @returns {JSX.Element} The Footer component.
 */

export default function Footer() {
  const date = useMemo(() => {
    return new Date().getFullYear().toString();
  }, []);

  return (
    <footer className="footer">
      <div className="page-container">
        {/* The `visually-hidden` class is used to hide the heading from the screen readers and SEO */}
        <h2 className="visually-hidden">Stopka</h2>

        <div className="main-layout footer__features-container">
          {/* The `FeatureSection` compound component is used to render the feature sections */}
          <FeatureSection>
            <FeatureSection.Header>Klub IKEA Family</FeatureSection.Header>
            <FeatureSection.Body>
              Spełnij marzenie o stylowych i funkcjonalnych wnętrzach dzięki
              specjalnym ofertom i inspiracjom, które czekają na ciebie w IKEA
              Family. Dołącz do Klubu i poczuj się jak w domu.
            </FeatureSection.Body>
            <FeatureSection.Footer />
          </FeatureSection>
          <FeatureSection>
            <FeatureSection.Header>IKEA Business Network</FeatureSection.Header>
            <FeatureSection.Body>
              Poznaj korzyści dedykowane dla małych i dużych przedsiębiorców,
              dzięki którym stworzysz jeszcze lepsze miejsce pracy dla siebie i
              innych. Dołącz do Klubu IKEA Business Network.
            </FeatureSection.Body>
            <FeatureSection.Footer />
          </FeatureSection>
        </div>

        <nav
          className="main-layout footer__accordions-container"
          aria-labelledby="main-nav-footer"
        >
          {/* The `visually-hidden` class is used to hide the heading from the screen readers and SEO */}
          <h3 id="main-nav-footer" className="visually-hidden">
            Główna Nawigacja Stópki
          </h3>

          <FooterAccordions />
        </nav>

        <div className="main-layout footer__icons-links-container">
          <div className="footer__icons-links-inner-container">
            <nav aria-labelledby="socials">
              {/* The `visually-hidden` class is used to hide the heading from the screen readers and SEO */}
              <h3 id="socials" className="visually-hidden">
                Sociale
              </h3>

              <NavList list={footerLinksList} iconsRounded />
            </nav>

            <nav aria-labelledby="payments">
              {/* The `visually-hidden` class is used to hide the heading from the screen readers and SEO */}
              <h3 id="payments" className="visually-hidden">
                Systemy Płatności
              </h3>

              <NavList list={footerPaymentsList} />
            </nav>
          </div>

          <ChangeCountry href="#" className="footer__change-country" />
        </div>

        <div className="main-layout footer__sub-list-container">
          <small className="footer__copyright">
            &copy; Inter IKEA Systems B.V 1999-{date}
          </small>
          <SubList />
        </div>
      </div>
    </footer>
  );
}
