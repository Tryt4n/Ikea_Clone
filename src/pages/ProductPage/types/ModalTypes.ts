import { Params } from "react-router-dom";
import { ProductDataType } from "./ProductDataType";
import { CardCollectionType } from "../../../layout/Articles/components/ImageCardCollection/ImageCardCollection";
import { DisplayedImgType } from "../context/ProductContext";

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
  productData: ProductDataType;
  index: number;
  path: Params<string>;
  displayedMainImg: DisplayedImgType;
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
  readonly type: "product-control" | "shopping-cart-control";
};

export type AddProductByNumberModal = {
  readonly type: "add-product-by-number";
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
  | AddProductByNumberModal;

export type MenuLayoutType = ModalMenuType | ModalProductsMenuType | ModalRoomsMenuType;

export type ModalDataType =
  | SideModalLayoutType
  | MenuLayoutType
  | ModalDataImagePreviewType
  | ModalImageWithProductsType;
