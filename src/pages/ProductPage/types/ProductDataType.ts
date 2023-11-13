import { TextVariants } from "../../../types/colorsVariantsType";

export type ProductDataType = {
  collection: string;
  name: string;
  nameToDisplay: string;
  productNumber: string;
  size: string;
  price: {
    integer: number;
    decimal?: number;
    quantity?: number;
    sizeInMeters?: number;
  };
  oldPriceTag: {
    variant: TextVariants;
    integer: number;
    decimal?: number;
    quantity?: number;
    sizeInMeters?: number;
  };
  newTag: {
    variant: TextVariants;
  };
  variants: string[];
  variantsName: string[];
  variant: string;
  variantName: string;
  relatedProducts?: {
    sizes?: Record<string, string>;
    variants?: Record<string, string>;
  };
  description: string;
  rating?: {
    rate: number;
    quantity: number;
  };
  topSeller?: boolean;
  forKidsBadge?: boolean;
  guarantee?: number;
  thumbnails: Record<string, string>;
  images: Record<string, string>;
  additionalInformation?: string;
  additionalInfo?: {
    history?: {
      sections: {
        header: string;
        description: string;
      }[];
    };
    material: {
      header: string;
      description: string;
    };
  };
};
