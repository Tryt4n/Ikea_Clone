// Icons
import SoftnessIndexIcon from "../../../../Icons/SoftnessIndexIcon";
// Type
import { SoftnessIndexType } from "../../../../types/softnessVariants";
// Style
import "./index.scss";

export default function SoftnessInformation({
  softnessIndex,
}: {
  softnessIndex: SoftnessIndexType;
}) {
  return (
    <div className="softness-information">
      <SoftnessIndexIcon />
      <span className="softness-information__text">{softnessIndex}</span>
    </div>
  );
}
