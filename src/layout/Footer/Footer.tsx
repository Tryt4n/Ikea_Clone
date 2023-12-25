// React
import { useMemo } from "react";
// Components
import { FeatureSection } from "./components/FeatureSection/FeatureSection";
import { FooterAccordions } from "./components/FooterAccordions/FooterAccordions";
import { NavList } from "./components/NavList/NavList";
import ChangeCountry from "../../components/ui/ChangeCountryBtn/ChangeCountry";
import SubList from "./components/SubList/SubList";
// Constants
import { footerLinksList, footerPaymentsList } from "../../constants/footerLists";
// Style
import "./index.scss";

export default function Footer() {
  const date = useMemo(() => {
    return new Date().getFullYear().toString();
  }, []);

  return (
    <footer className="footer">
      <div className="page-container">
        <h2 className="visually-hidden">Stopka</h2>
        <div className="main-layout footer__features-container">
          <FeatureSection>
            <FeatureSection.Header>Klub IKEA Family</FeatureSection.Header>
            <FeatureSection.Body>
              Spełnij marzenie o stylowych i funkcjonalnych wnętrzach dzięki specjalnym ofertom i
              inspiracjom, które czekają na ciebie w IKEA Family. Dołącz do Klubu i poczuj się jak w
              domu.
            </FeatureSection.Body>
            <FeatureSection.Footer />
          </FeatureSection>
          <FeatureSection>
            <FeatureSection.Header>IKEA Business Network</FeatureSection.Header>
            <FeatureSection.Body>
              Poznaj korzyści dedykowane dla małych i dużych przedsiębiorców, dzięki którym
              stworzysz jeszcze lepsze miejsce pracy dla siebie i innych. Dołącz do Klubu IKEA
              Business Network.
            </FeatureSection.Body>
            <FeatureSection.Footer />
          </FeatureSection>
        </div>

        <nav
          className="main-layout footer__accordions-container"
          aria-labelledby="main-nav-footer"
        >
          <h3
            id="main-nav-footer"
            className="visually-hidden"
          >
            Główna Nawigacja Stópki
          </h3>
          <FooterAccordions />
        </nav>

        <div className="main-layout footer__icons-links-container">
          <div className="footer__icons-links-inner-container">
            <nav aria-labelledby="socials">
              <h3
                id="socials"
                className="visually-hidden"
              >
                Sociale
              </h3>
              <NavList
                list={footerLinksList}
                iconsRounded
              />
            </nav>
            <nav aria-labelledby="payments">
              <h3
                id="payments"
                className="visually-hidden"
              >
                Systemy Płatności
              </h3>
              <NavList list={footerPaymentsList} />
            </nav>
          </div>
          <ChangeCountry className="footer__change-country" />
        </div>

        <div className="main-layout footer__sub-list-container">
          <small className="footer__copyright">&copy; Inter IKEA Systems B.V 1999-{date}</small>
          <SubList />
        </div>
      </div>
    </footer>
  );
}
