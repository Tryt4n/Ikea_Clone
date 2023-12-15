// React
import { ReactNode } from "react";
// Components
import { Btn } from "../../../../components/Btn/Btn";
// Style
import "./index.scss";

export function FeatureSection({ children }: { children: ReactNode }) {
  return <section className="footer__features">{children}</section>;
}
FeatureSection.Header = Header;
FeatureSection.Body = InnerText;
FeatureSection.Footer = Navigation;

function Header({ children }: { children: string }) {
  return <h3>{children}</h3>;
}
function InnerText({ children }: { children: string }) {
  return <p>{children}</p>;
}
function Navigation() {
  return (
    <>
      <LearnMoreLink />
      <Btn>Dołącz lub zaloguj się</Btn>
    </>
  );
}

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
