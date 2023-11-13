// Icons
import InfoIcon from "../../../../Icons/InfoIcon";
// Style
import "./index.scss";

export default function AdditionalInformation({
  additionalInformation,
}: {
  additionalInformation: string;
}) {
  return (
    <div className="additional-information">
      <InfoIcon />
      <p>{additionalInformation}</p>
    </div>
  );
}
