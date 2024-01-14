// Import components
import Summary from "../../components/Summary/Summary";
import InformationsList from "../../components/InformationsList/InformationsList";
import SustainableDevelopment from "../../components/SustainableDevelopment/SustainableDevelopment";
import AdditionalDescriptionInformation from "../../components/AdditionalDescriptionInformation/AdditionalDescriptionInformation";
// Import types
import type { ProductDataType } from "../../types/ProductDataType";

/**
 * ProductInformations Component
 *
 * This is a React functional component. It displays various information about a product, such as a summary, a list of information, sustainable development information, and additional description information. The summary is rendered by the `Summary` component, the list of information is rendered by the `InformationsList` component, the sustainable development information is rendered by the `SustainableDevelopment` component, and the additional description information is rendered by the `AdditionalDescriptionInformation` component.
 *
 * @param {ProductDataType} data - The data for the product.
 *
 * @example
 * <ProductInformations data={productData} />
 *
 * @returns A JSX element that consists of a `section` with the class name `product-summary`. Inside this `section`, it renders a `h3` element that is visually hidden for accessibility and SEO purposes, the `Summary` component with the `description` and `productNumber` props from the `data` prop, the `InformationsList` component with the `rating` prop from the `data` prop, the `SustainableDevelopment` component if the `sustainableDevelopment` property of the `data` prop is truthy, and the `AdditionalDescriptionInformation` component with the `infoData` prop from the `data` prop if the `additionalInfo` property of the `data` prop is truthy.
 */

export default function ProductInformations({
  data,
}: {
  data: ProductDataType;
}) {
  const {
    description,
    productNumber,
    rating,
    additionalInfo,
    sustainableDevelopment,
  } = data; // Destructure the data prop

  return (
    <section className="product-summary">
      {/* Hide the heading for accessibility and SEO purposes */}
      <h3 className="visually-hidden">Dodatkowe informacje</h3>

      <Summary description={description} productNumber={productNumber} />

      <InformationsList rating={rating} />

      {/* Render the SustainableDevelopment component if the sustainableDevelopment property of the data prop is truthy */}
      {sustainableDevelopment && <SustainableDevelopment />}

      {/* Render the AdditionalDescriptionInformation component if the additionalInfo property of the data prop is truthy */}
      {additionalInfo && (
        <AdditionalDescriptionInformation infoData={additionalInfo} />
      )}
    </section>
  );
}
