import { Params } from "react-router-dom";
import { ProductDataType } from "./ProductDataType";
import { CardCollectionType } from "../../../layout/Articles/components/ImageCardCollection/ImageCardCollection";
import { DisplayedImgType } from "../context/ProductContext";

export type ModalDataChooseSizeType = {
  type: "choose-size";
  header: string;
  productData: ProductDataType;
  path: Readonly<Params<string>>;
};

export type ModalDataChooseColorType = Omit<ModalDataChooseSizeType, "type"> & {
  type: "choose-color";
};

export type ModalDataImagePreviewType = {
  type: "image-preview";
  productData: ProductDataType;
  index: number;
  path: Params<string>;
  displayedMainImg: DisplayedImgType;
};

export type ModalImageWithProductsType = {
  type: "image-with-products";
  productsData: CardCollectionType;
};

export type ModalDataType =
  | ModalDataChooseSizeType
  | ModalDataChooseColorType
  | ModalDataImagePreviewType
  | ModalImageWithProductsType;
