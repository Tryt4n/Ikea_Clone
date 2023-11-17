// Components
import AdditionalDescriptionInformation from "../../components/AdditionalDescriptionInformation/AdditionalDescriptionInformation";
import InformationsList from "../../components/InformationsList/InformationsList";
import Summary from "../../components/Summary/Summary";
// Types
import { ProductDataType } from "../../types/ProductDataType";

export default function ProductInformations({ data }: { data: ProductDataType }) {
  return (
    <div className="product-summary">
      <Summary
        description={data.description}
        productNumber={data.productNumber}
      />

      <InformationsList rating={data.rating} />

      <AdditionalDescriptionInformation />
    </div>
  );
}
