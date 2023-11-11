import { Params } from "react-router-dom";
import { ProductDataType } from "./ProductDataType";
import { CardCollectionType } from "../../../layout/Articles/components/ImageCardCollection/ImageCardCollection";

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
  imgSrc: string;
  imgSrcSet: string;
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
