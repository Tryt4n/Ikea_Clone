import type { ProductType } from "../../layout/Articles/components/CollectionProductsList/CollectionProductsList";

export const exampleProducts: ProductType[] = [
  {
    id: "1",
    placement: {
      top: "0",
      right: "0",
      bottom: "auto",
      left: "auto",
    },
    descriptionPlacement: "bottom-center",
    productHeading: "Product 1",
    productSubHeading: "Product 1 Subheading",
    productLink: "/products/product-1",
    productPriceInteger: 8,
    productQuantity: 1,
    productSizeInMeters: 2.45,
  },
  {
    id: "2",
    placement: {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto",
    },
    newTag: {
      variant: "red",
    },
    topSellerTag: {
      variant: "orange",
    },
    newPriceTag: {
      lastItemPriceInteger: 99,
      variant: "white",
    },
    descriptionPlacement: "bottom-left",
    productHeading: "Product 2",
    productSubHeading: "Product 2 Subheading",
    productLink: "/products/product-2",
    productPriceInteger: 89,
    productQuantity: 2,
    productSizeInMeters: 2.45,
  },
  {
    id: "3",
    placement: {
      top: "auto",
      right: "auto",
      bottom: "0",
      left: "0",
    },
    newTag: {
      variant: "black",
    },
    topSellerTag: {
      variant: "blue",
    },
    newPriceTag: {
      lastItemPriceInteger: 24,
      lastItemPriceDecimal: 99,
      variant: "gray",
    },
    descriptionPlacement: "top-center",
    productHeading: "Product 3",
    productSubHeading: "Product 3 Subheading",
    productLink: "/products/product-3",
    productPriceInteger: 22,
    productPriceDecimal: 89,
    productQuantity: 1,
    productSizeInMeters: 2.45,
    hideOnMobile: true,
  },
  {
    id: "4",
    placement: {
      top: "25%",
      right: "160px",
      bottom: "auto",
      left: "auto",
      topMobile: "10em",
      rightMobile: "2rem",
      bottomMobile: "auto",
      leftMobile: "auto",
    },
    descriptionPlacement: "bottom-center",
    productHeading: "Product 1",
    productSubHeading: "Product 1 Subheading",
    productLink: "/products/product-1",
    productPriceInteger: 8,
    productPriceDecimal: 25,
    productQuantity: 1,
    productSizeInMeters: 2.45,
  },
];
