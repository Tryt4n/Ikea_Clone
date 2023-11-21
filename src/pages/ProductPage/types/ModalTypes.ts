import { Params } from "react-router-dom";
import { ProductDataType } from "./ProductDataType";
import { CardCollectionType } from "../../../layout/Articles/components/ImageCardCollection/ImageCardCollection";
import { DisplayedImgType } from "../context/ProductContext";

export type ModalDataChooseSizeType = {
  readonly type: "choose-size";
  header: string;
  productData: ProductDataType;
  path: Readonly<Params<string>>;
};

export type ModalDataChooseColorType = Omit<ModalDataChooseSizeType, "type"> & {
  readonly type: "choose-color";
  header: string;
};

export type ModalDataProductInformationType = {
  readonly type: "product-information";
  header: string;
};

export type ModalDataItemsIncludedType = {
  readonly type: "items-included";
  header: string;
};

export type ModalDataDimensionsType = {
  readonly type: "dimensions";
  header: string;
};

export type ModalDataRatingsType = {
  readonly type: "ratings";
  header: string;
};

export type ModalDataInstallmentPurchaseType = {
  readonly type: "installment-purchase";
  header: string;
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
  header: string;
};

export type ModalChooseShopType = {
  readonly type: "choose-shop";
  header: string;
};

export type ModalPrefferedShopType = {
  readonly type: "preffered-shop";
  header: string;
};

export type ModalDataType =
  | ModalDataChooseSizeType
  | ModalDataChooseColorType
  | ModalDataImagePreviewType
  | ModalImageWithProductsType
  | ModalDataProductInformationType
  | ModalDataItemsIncludedType
  | ModalDataDimensionsType
  | ModalDataRatingsType
  | ModalDataInstallmentPurchaseType
  | ModalPostalCodeType
  | ModalChooseShopType
  | ModalPrefferedShopType;
