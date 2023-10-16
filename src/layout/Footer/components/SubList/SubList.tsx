// Constants
import { subFooterList } from "../../../../constants/footerLists";
// Style
import "./index.scss";

export default function SubList() {
  return (
    <ul className="main-layout sub-footer-list">
      {subFooterList.map((link) => (
        <li key={link}>
          <a href="#">{link}</a>
        </li>
      ))}
    </ul>
  );
}
