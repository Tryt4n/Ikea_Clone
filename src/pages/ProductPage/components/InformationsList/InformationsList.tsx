// Import react dependencies
import type { ReactNode } from "react";
// Import custom hooks
import useModal from "../../../../hooks/useModal";
// Import components
import RatingBlock from "../../../../components/features/RatingBlock/RatingBlock";
// Import icons
import ArrowRightIcon from "../../../../Icons/ArrowRightIcon";
// Import types
import { ProductDataType } from "../../types/ProductDataType";
import {
  ModalDataDimensionsType,
  ModalDataInstallmentPurchaseType,
  ModalDataItemsIncludedType,
  ModalDataProductInformationType,
  ModalDataRatingsType,
} from "../../../../layout/Modal/types/ModalTypes";
// Import styles
import "./index.scss";

/**
 * InformationsList Component
 *
 * This is a React functional component. It displays a list of information items about a product, including product information, items included, dimensions, ratings, and installment purchase options.
 *
 * @param {ProductDataType["rating"]} rating - The rating of the product.
 *
 * @example
 * <InformationsList rating={productData.rating} />
 *
 * @returns A JSX element that consists of a `ul` with the class name `product-information`. Inside this `ul`, it renders `InformationItem` components for each type of information.
 */

export default function InformationsList({ rating }: { rating?: ProductDataType["rating"] }) {
  return (
    <ul className="product-information">
      <InformationItem heading="Informacje o produkcie" />

      <InformationItem heading="Elementy w zestawie" />

      <InformationItem heading="Wymiary" />

      {/* Render the ratings information item only if the product has a rating. */}
      {rating && (
        <InformationItem heading="Opinie">
          <RatingBlock rating={rating} />
        </InformationItem>
      )}

      <InformationItem heading="Na raty w IKEA" />
    </ul>
  );
}

/**
 * InformationItem Component
 *
 * This is a React functional component written in TypeScript. It displays an information item about a product, including a heading and optional children.
 *
 * @component
 * @param {string} heading - The heading of the information item.
 * @param {ReactNode} props.children - The children of the information item.
 *
 * @returns A JSX element that consists of a `li` containing a `button`. Inside this `button`, it renders a `div` containing a `h4` element that displays the heading and any children, and an `ArrowRightIcon` to indicate that more information is available.
 */

// Define the type of information item.
type TypeInformationItemType =
  | ModalDataProductInformationType["type"]
  | ModalDataItemsIncludedType["type"]
  | ModalDataDimensionsType["type"]
  | ModalDataRatingsType["type"]
  | ModalDataInstallmentPurchaseType["type"];

function InformationItem({ heading, children }: { heading: string; children?: ReactNode }) {
  const { modalID, setModalData } = useModal(); // Access the modalID and setModalData function to manage modal data.

  let type: TypeInformationItemType;

  // Function to open the modal for the corresponding type of information.
  function openModalByType() {
    switch (heading) {
      case "Informacje o produkcie":
        type = "product-information";
        break;

      case "Elementy w zestawie":
        type = "items-included";
        break;

      case "Wymiary":
        type = "dimensions";
        break;

      case "Opinie":
        type = "ratings";
        break;

      case "Na raty w IKEA":
        type = "installment-purchase";
        break;
    }

    setModalData({
      type,
    });
  }

  return (
    <li>
      <button
        type="button"
        className="product-information__btn"
        aria-controls={modalID} // Set the `aria-controls` attribute to the ID of the modal.
        onClick={openModalByType} // Open the modal when the button is clicked.
      >
        <div>
          <h4 className="product-information__heading">{heading}</h4>
          {children}
        </div>
        <ArrowRightIcon />
      </button>
    </li>
  );
}
