import type { ProductDataType } from "../../pages/ProductPage/types/ProductDataType";

export const exampleFetchedProductData: ProductDataType = {
  collection: "collection",
  name: "product-name",
  nameToDisplay: "name to display",
  productNumber: "111111111",
  size: "120x42x74 cm",
  price: {
    integer: 14,
    decimal: 99,
    quantity: 2,
    sizeInMeters: 1.2,
  },
  oldPriceTag: {
    variant: "red",
    integer: 15,
    decimal: 99,
  },
  variants: ["variant-1", "variant-2", "variant-3"],
  variantsName: ["variant 1", "variant 2", "variant3"],
  variant: "variant-1",
  variantName: "variant 1",
  relatedProducts: {
    variants: {
      "variant-1": "111111111",
      "variant-2": "222222222",
      "variant-3": "333333333",
    },
  },
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quidem voluptatem incidunt aperiam, laboriosam aliquam doloribus nostrum eum nesciunt voluptate.",
  additionalInformation: "Lorem ipsum dolor sit amet.",
  rating: {
    rate: 5,
    quantity: 3,
  },
  thumbnails: {
    variant_1: "variant_1.jpg",
    variant_2: "variant_2.jpg",
    variant_3: "variant_3.jpg",
  },
  images: {
    main: "0494338_pe626953_s5.jpg",
    imgHover: "0999147_pe823299_s5.jpg",
    image_1: "0999146_pe823263_s5.jpg",
    image_2: "0842991_pe535505_s5.jpg",
  },
  additionalInfo: [
    {
      title: "some title",
      header: "some additional info header",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex odio molestiae itaque cupiditate aliquid fugit esse et ipsam culpa harum, accusantium laborum, dolorem recusandae veniam nostrum voluptatum voluptate est a!",
      backgroundImage: "backgroundImage.jpg",
      additionalSections: [
        {
          header: " Lorem, ipsum dolor.",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex odio molestiae itaque cupiditate aliquid fugit esse et ipsam culpa harum, accusantium laborum, dolorem recusandae veniam nostrum voluptatum voluptate est a!",
        },
        {
          header: " Lorem, ipsum dolor.",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex odio molestiae itaque cupiditate aliquid fugit esse et ipsam culpa harum, accusantium laborum, dolorem recusandae veniam nostrum voluptatum voluptate est a!",
        },
      ],
    },
    {
      title: "some other title",
      header: "some other additional info header",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex odio molestiae itaque cupiditate aliquid fugit esse et ipsam culpa harum, accusantium laborum, dolorem recusandae veniam nostrum voluptatum voluptate est a!",
    },
  ],
};
