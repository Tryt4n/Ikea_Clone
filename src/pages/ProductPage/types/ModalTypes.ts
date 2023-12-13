import type { Params } from "react-router-dom";
import type { ProductDataType } from "./ProductDataType";
import type { CardCollectionType } from "../../../layout/Articles/components/ImageCardCollection/ImageCardCollection";
import type { DisplayedImgType } from "../context/ProductContext";
import type { ShoppingCartType } from "../../../context/AppContext";

export type ModalDataChooseSizeType = {
  readonly type: "choose-size";
  productData: ProductDataType;
  path: Readonly<Params<string>>;
};

export type ModalDataChooseColorType = Omit<ModalDataChooseSizeType, "type"> & {
  readonly type: "choose-color";
};

export type ModalDataProductInformationType = {
  readonly type: "product-information";
};

export type ModalDataItemsIncludedType = {
  readonly type: "items-included";
};

export type ModalDataDimensionsType = {
  readonly type: "dimensions";
};

export type ModalDataRatingsType = {
  readonly type: "ratings";
};

export type ModalDataInstallmentPurchaseType = {
  readonly type: "installment-purchase";
};

export type ModalDataImagePreviewType = {
  readonly type: "image-preview";
  productData: {
    images: ProductDataType["images"];
    name: ProductDataType["name"];
    variant: ProductDataType["variant"];
  };
  index: number;
  path: Params<string>;
  displayedMainImg?: DisplayedImgType;
};

export type ModalImageWithProductsType = {
  readonly type: "image-with-products";
  productsData: CardCollectionType;
};

export type ModalPostalCodeType = {
  readonly type: "postal-code";
};

export type ModalChooseShopType = {
  readonly type: "choose-shop";
};

export type ModalPrefferedShopType = {
  readonly type: "preffered-shop";
};

export type ModalChosenShopType = {
  readonly type: "chosen-shop";
};

export type ModalLoginType = {
  readonly type: "log-in";
};

export type ModalMenuType = {
  readonly type: "menu";
};

export type ModalProductsMenuType = {
  readonly type: "products-menu";
};

export type ModalRoomsMenuType = {
  readonly type: "rooms-menu";
};

export type ShoppingCartAsideMenuInformationList = {
  readonly type: "refund" | "data-encryption";
};

export type ShoppingCartNextStep = {
  readonly type: "next-step";
};

export type ShoppingCartControlModal = {
  readonly type: "shopping-cart-control";
};

export type ShoppingCartProductControlModal = {
  readonly type: "product-control";
  product: ShoppingCartType;
};

export type AddProductByNumberModal = {
  readonly type: "add-product-by-number";
};

export type CreateListModal = {
  readonly type: "create-list";
  product?: ShoppingCartType;
};

export type ChangeListNameModal = {
  readonly type: "change-list-name";
};

export type FavouriteListControlModal = {
  readonly type: "list-control";
};

export type DeleteListConfirmationModal = {
  readonly type: "delete-list-confirmation";
};

export type SelectListModal = {
  readonly type: "select-list";
  product: ShoppingCartType;
  isProductAlreadyInAnyList?: boolean;
  previousModal?: ModalDataType;
};

export type SideModalLayoutType =
  | ModalDataChooseSizeType
  | ModalDataChooseColorType
  | ModalDataProductInformationType
  | ModalDataItemsIncludedType
  | ModalDataDimensionsType
  | ModalDataRatingsType
  | ModalDataInstallmentPurchaseType
  | ModalPostalCodeType
  | ModalChooseShopType
  | ModalPrefferedShopType
  | ModalChosenShopType
  | ModalLoginType
  | ShoppingCartAsideMenuInformationList
  | ShoppingCartNextStep
  | ShoppingCartControlModal
  | ShoppingCartProductControlModal
  | AddProductByNumberModal
  | CreateListModal
  | FavouriteListControlModal
  | ChangeListNameModal
  | DeleteListConfirmationModal
  | SelectListModal;

export type MenuLayoutType = ModalMenuType | ModalProductsMenuType | ModalRoomsMenuType;

export type ModalDataType =
  | SideModalLayoutType
  | MenuLayoutType
  | ModalDataImagePreviewType
  | ModalImageWithProductsType;
