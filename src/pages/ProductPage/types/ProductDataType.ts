import { TextVariants } from "../../../types/colorsVariantsType";
import { SoftnessIndexType } from "../../../types/softnessVariants";

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
  newTag?: {
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
  limitedEdition?: boolean;
  forKidsBadge?: boolean;
  guarantee?: number;
  softnessIndex?: SoftnessIndexType;
  thumbnails: Record<string, string>;
  images: Record<string, string>;
  additionalInformation?: string;
  sustainableDevelopment?: boolean;
  additionalInfo?: AdditionalInfo[];
};

export type AdditionalInfo = {
  title: string;
  header: string;
  description: string;
  subDescription?: string;
  variant?: TextVariants;
  backgroundImage?: string;
  additionalSections?: AdditionalInfoSection[];
};

type AdditionalInfoSection = {
  description: string;
  header: string;
};
