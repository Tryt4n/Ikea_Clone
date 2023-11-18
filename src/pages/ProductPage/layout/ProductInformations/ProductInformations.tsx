// Components
import Summary from "../../components/Summary/Summary";
import InformationsList from "../../components/InformationsList/InformationsList";
import SustainableDevelopment from "../../components/SustainableDevelopment/SustainableDevelopment";
import AdditionalDescriptionInformation from "../../components/AdditionalDescriptionInformation/AdditionalDescriptionInformation";
// Types
import { ProductDataType } from "../../types/ProductDataType";

export default function ProductInformations({ data }: { data: ProductDataType }) {
  const { description, productNumber, rating, additionalInfo, sustainableDevelopment } = data;

  return (
    <section className="product-summary">
      <h3 className="visually-hidden">Dodatkowe informacje</h3>
      <Summary
        description={description}
        productNumber={productNumber}
      />

      <InformationsList rating={rating} />

      {sustainableDevelopment && <SustainableDevelopment />}

      {additionalInfo && <AdditionalDescriptionInformation infoData={additionalInfo} />}
    </section>
  );
}
