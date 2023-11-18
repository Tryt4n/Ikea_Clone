// Types
import { ProductDataType } from "../../types/ProductDataType";
// Style
import "./index.scss";

type AdditionalDescriptionInformationPropsType = {
  infoData: NonNullable<ProductDataType["additionalInfo"]>;
};

export default function AdditionalDescriptionInformation({
  infoData,
}: AdditionalDescriptionInformationPropsType) {
  return (
    <div className="">
      {infoData.map((section) => (
        <section key={section.title}>
          <header>
            <h2 className={`tx-${section.variant}` || undefined}>{section.title}</h2>
            <strong>{section.header}</strong>
          </header>
          <div>
            <p>{section.description}</p>
            {section.subDescription && <p>{section.subDescription}</p>}
          </div>
        </section>
      ))}
    </div>
  );
}
