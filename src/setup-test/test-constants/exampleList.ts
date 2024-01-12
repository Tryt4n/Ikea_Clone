import type { FavouritesListType } from "../../context/AppContext/types/FavouritesListType";

const date = new Date();
export const exampleList: FavouritesListType = {
  id: "1234-5678-9101-1121",
  lastEdit: date,
  name: "Test List",
  products: [
    // Product 1 with oldPrice, size as "universal", rating and quantity bigger than 1
    {
      collection: "Test Collection",
      images: {
        main: "main.jpg",
        imgHover: "hover.jpg",
        image_1: "image_1.jpg",
        image_2: "image_2.jpg",
        image_3: "image_3.jpg",
        image_4: "image_4.jpg",
        image_5: "image_5.jpg",
      },
      name: "test-name",
      nameToDisplay: "Test Name",
      price: {
        integer: 99,
        decimal: 99,
      },
      productNumber: "123.456.78",
      size: "universal",
      variant: "variant-test",
      variantName: "Variant Test",
      oldPrice: {
        variant: "red",
        integer: 109,
        decimal: 99,
      },
      quantity: 3,
      productLink: "/products/Test-Collection/test-name/variant-test/123456789",
      addedDate: date,
      rating: {
        rate: 5,
        quantity: 100,
      },
    },
    // Product 2 with video, quantity in price, newTag, quantity equal 1
    {
      collection: "Test Collection-2",
      images: {
        main: "main.jpg",
        imgHover: "hover.jpg",
        video: "https://example-video.com",
        image_1: "image_1.jpg",
        image_2: "image_2.jpg",
        image_3: "image_3.jpg",
        image_4: "image_4.jpg",
        image_5: "image_5.jpg",
      },
      name: "Test Name 2",
      nameToDisplay: "test-name-2",
      price: {
        integer: 10,
        quantity: 2,
      },
      productNumber: "987.654.32",
      size: "100x100",
      variant: "variant-test-2",
      variantName: "Variant Test 2",
      quantity: 1,
      productLink:
        "/products/Test-Collection-2/test-name-2/variant-test-2/987654321",
      addedDate: date,
      newTag: {
        variant: "red",
      },
    },
    // Product 3 with sizeInMeters
    {
      collection: "Test Collection-3",
      images: {
        main: "main.jpg",
        imgHover: "hover.jpg",
        image_1: "image_1.jpg",
        image_2: "image_2.jpg",
        image_3: "image_3.jpg",
        image_4: "image_4.jpg",
        image_5: "image_5.jpg",
      },
      name: "test-name-3",
      nameToDisplay: "Test Name-3",
      price: {
        integer: 11,
        decimal: 49,
        sizeInMeters: 2.46,
      },
      productNumber: "111.111.11",
      size: "2.46m x 1m",
      variant: "variant-test-3",
      variantName: "Variant Test-3",
      oldPrice: {
        variant: "orange",
        integer: 109,
        decimal: 99,
      },
      quantity: 7,
      productLink:
        "/products/Test-Collection-3/test-name-3/variant-test-3/111111111",
      addedDate: date,
      rating: {
        rate: 3,
        quantity: 15,
      },
    },
    // Product 4
    {
      collection: "Test Collection-4",
      images: {
        main: "main.jpg",
        imgHover: "hover.jpg",
        image_1: "image_1.jpg",
        image_2: "image_2.jpg",
        image_3: "image_3.jpg",
        image_4: "image_4.jpg",
        image_5: "image_5.jpg",
      },
      name: "test-name-4",
      nameToDisplay: "Test Name-4",
      price: {
        integer: 11,
      },
      productNumber: "999.999.99",
      size: "46cm x 20cm",
      variant: "variant-test-4",
      variantName: "Variant Test-4",
      quantity: 7,
      productLink:
        "/products/Test-Collection-4/test-name-4/variant-test-4/999999999",
      addedDate: date,
      newTag: {
        variant: "blue",
      },
    },
  ],
};
