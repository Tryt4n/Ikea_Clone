import HamburgerButton from "../../components/HamburgerBtn/HamburgerButton";
import Navbar from "../Navbar/Navbar";

import "./header.scss";

export default function Header() {
  return (
    <header>
      <div className="header__messages">
        <p aria-label="Messages">
          Przepraszam za niedogodności! Mamy problem techniczny, który uniemożliwia członkom rodziny
          robienie zakupów z wykorzystaniem korzyści wynikających z karty rodzinnej, ale nadal
          możemy kontynuować zakupy jako gość!
        </p>
      </div>

      <HamburgerButton />

      <Navbar />
    </header>
  );
}
