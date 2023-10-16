// React
import { useMemo } from "react";
// Components
import { FeatureSection } from "./components/FeatureSection/FeatureSection";
import { Accordions } from "./components/Accordions/Accordions";
import { NavList } from "./components/NavList/NavList";
import ChangeCountry from "../../components/ChangeCountryBtn/ChangeCountry";
// Constants
import { footerLinksList, footerPaymentsList } from "../../constants/footerLists";
// Style
import "./index.scss";
import SubList from "./components/SubList/SubList";

export default function Footer() {
  const date = useMemo(() => {
    return new Date().getFullYear().toString();
  }, []);

  return (
    <footer className="page-container footer">
      <h2 className="visually-hidden">Stopka</h2>
      <div className="main-layout">
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
            Poznaj korzyści dedykowane dla małych i dużych przedsiębiorców, dzięki którym stworzysz
            jeszcze lepsze miejsce pracy dla siebie i innych. Dołącz do Klubu IKEA Business Network.
          </FeatureSection.Body>
          <FeatureSection.Footer />
        </FeatureSection>
      </div>

      <nav className="main-layout">
        <h3 className="visually-hidden">Nawigacja Stópki</h3>
        <Accordions />
      </nav>

      <div className="main-layout footer__icons-links-container">
        <div className="footer__icons-links-inner-container">
          <nav>
            <h3 className="visually-hidden">Nawigacja Socialów</h3>
            <NavList
              list={footerLinksList}
              iconsRounded
            />
          </nav>
          <nav>
            <h3 className="visually-hidden">Nawigacja Systemów Płatności</h3>
            <NavList list={footerPaymentsList} />
          </nav>
        </div>
        <ChangeCountry className="footer__change-country" />
      </div>

      <div className="main-layout footer__sub-list-container">
        <small className="footer__copyright">&copy; Inter IKEA Systems B.V 1999-{date}</small>
        <SubList />
      </div>
    </footer>
  );
}
