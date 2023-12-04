// Components
import Tag from "../../pages/ProductPage/components/Tag/Tag";
// Icons
import AvatarIcon from "../../Icons/AvatarIcon";
// Style
import "./index.scss";

export default function ClubInfoDiscount() {
  return (
    <a
      href="#"
      className="club-info-discount"
    >
      <div className="club-info-discount__text-wrapper">
        <Tag variant="blue">Oferty dla Klubowiczów IKEA Family</Tag>
        <strong>Dołącz lub zaloguj się i zaoszczędź 16,50</strong>
      </div>

      <div className="club-info-discount__icon-wrapper">
        <AvatarIcon />
      </div>
    </a>
  );
}
