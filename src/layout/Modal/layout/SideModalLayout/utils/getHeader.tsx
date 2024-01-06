// Import components
import Tag from "../../../../../components/ui/Tag/Tag";
// Import types
import type { ReactElement } from "react";
import type { ReducerStateType } from "../../../../../context/AppContext/AppContext";
import type { SideModalLayoutType } from "../../../types/ModalTypes";

/**
 * `getHeader` is a function that generates the header text or component based on the `type` argument.
 * It uses the `type`, `modalData`, and `state` arguments to determine the appropriate header.
 *
 * @function
 * @param {string} type - The type of the modal.
 * @param {SideModalLayoutType} modalData - The data of the modal.
 * @param {ReducerStateType} state - The state of the application.
 * @returns {string | ReactElement} The header text or component.
 */

export function getHeader(
  type: string,
  modalData: SideModalLayoutType,
  state: ReducerStateType
): string | ReactElement {
  let header: string | ReactElement;

  // Generate the header for the "product-control" type
  const productControlHeader =
    modalData.type === "product-control"
      ? // If the product is in the shopping cart, then use the collection from the shopping cart
        (state.shoppingCart || []).find((product) => {
          return product.productNumber === modalData.product.productNumber;
        })?.collection
      : "";

  // Generate the header for the "more-options-for-product-in-list" type
  const moreOptionsForProductInListHeader =
    modalData.type === "more-options-for-product-in-list"
      ? `Więcej możliwości dla ${modalData.products[0].collection}`
      : "";

  // Determine the header based on the type
  switch (type) {
    case "choose-size":
      header = "Wybierz rozmiar";
      break;
    case "choose-color":
      header = "Wybierz kolor";
      break;
    case "choose-shop":
      header = "Znajdź swój preferowany sklep";
      break;
    case "postal-code":
      header = "Użyj swojej lokalizacji";
      break;
    case "preffered-shop":
      header = "Wybierz swój preferowany sklep";
      break;
    case "chosen-shop":
      header = state.chosenShop ? state.chosenShop.name : "";
      break;
    case "log-in":
      header = "Zaloguj się";
      break;
    case "product-information":
      header = "Informacje o produkcie";
      break;
    case "items-included":
      header = "Elementu w zestawie";
      break;
    case "dimensions":
      header = "Wymiary";
      break;
    case "ratings":
      header = "Opinie";
      break;
    case "installment-purchase":
      header = "Na raty w IKEA";
      break;
    case "refund":
      header = "W zmianie zdania nie ma nic złego!";
      break;
    case "data-encryption":
      header = "Ta strona jest bezpieczna";
      break;
    case "product-control":
      header = productControlHeader ? productControlHeader : "";
      break;
    case "shopping-cart-control":
      header = "Koszyk";
      break;
    case "add-product-by-number":
      header = "Dodaj produkt, wpisując jego numer";
      break;
    case "next-step":
      header = (
        <>
          <>Oszczędzaj 16,50 dzięki</>
          &nbsp;
          <Tag
            variant="blue"
            className="side-modal__header-tag"
          >
            Oferty dla Klubowiczów IKEA Family
          </Tag>
        </>
      );
      break;
    case "create-list":
      header = "Nadaj swojej liście nazwę";
      break;
    case "create-list-with-products":
      header = "Nadaj swojej liście nazwę";
      break;
    case "list-control":
      header = "Ustawienia";
      break;
    case "change-list-name":
      header = "Zmień nazwę listy";
      break;
    case "delete-list-confirmation":
      header = "Usuń swoją listę";
      break;
    case "select-list":
      header = "Zapisz na swojej liście";
      break;
    case "move-to-other-list":
    case "move-product-from-one-list-to-another":
    case "select-list-with-products":
      header = "Przenieś do innej listy";
      break;
    case "more-options-for-product-in-list":
      header = moreOptionsForProductInListHeader;
      break;
    case "manage-products-in-list":
      header = "Zarządzaj swoimi wyborami";
      break;
    default:
      throw new Error("A case has been defined that does not exist.");
  }

  return header;
}
