// Components
import Tag from "../Tag/Tag";
// Icons
import AvatarIcon from "../../Icons/AvatarIcon";
// Style
import "./index.scss";

export default function ClubInfoDiscount({ price }: { price: number }) {
  const savingsMath = Math.round(price * 0.035 * 2) / 2;
  const formattedSavings = savingsMath.toLocaleString("pl-PL");

  const savings = Number.isInteger(savingsMath) ? `${formattedSavings},-` : `${formattedSavings}`;

  return (
    <a
      href="#"
      className="club-info-discount"
    >
      <div className="club-info-discount__text-wrapper">
        <Tag variant="blue">Oferty dla Klubowiczów IKEA Family</Tag>
        <strong>Dołącz lub zaloguj się i zaoszczędź {savings}</strong>
      </div>

      <div className="club-info-discount__icon-wrapper">
        <AvatarIcon />
      </div>
    </a>
  );
}
