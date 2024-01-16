import type { ShoppingCartType } from "../../context/AppContext/types/ShoppingCartType";

export const shoppingCart: ShoppingCartType[] = [
  {
    collection: "collection1",
    productNumber: "123.456.78",
    size: "M",
    price: {
      integer: 10,
      decimal: 99,
      quantity: 2,
    },
    variantName: "variant1",
    variant: "variant1",
    images: {
      main: "main.jpg",
      imgHover: "hover.jpg",
      image_1: "image_1.jpg",
      image_2: "image_2.jpg",
      image_3: "image_3.jpg",
      image_4: "image_4.jpg",
      image_5: "image_5.jpg",
    },
    nameToDisplay: "Product 1",
    name: "Product 1",
    newTag: {
      variant: "red",
    },
    rating: {
      quantity: 57,
      rate: 4.5,
    },
    quantity: 2,
    productLink: "https://collection1.com",
    addedDate: new Date(),
  },
  {
    collection: "collection2",
    productNumber: "876.543.21",
    size: "3.47m",
    price: {
      integer: 99,
      sizeInMeters: 3.47,
    },
    variantName: "variant2",
    variant: "variant2",
    images: {
      main: "main.jpg",
      imgHover: "hover.jpg",
      image_1: "image_1.jpg",
      image_2: "image_2.jpg",
      image_3: "image_3.jpg",
      image_4: "image_4.jpg",
      image_5: "image_5.jpg",
    },
    nameToDisplay: "Product 2",
    name: "Product 2",
    newTag: {
      variant: "orange",
    },
    quantity: 1,
    productLink: "https://collection2.com",
    addedDate: new Date(),
  },
];
