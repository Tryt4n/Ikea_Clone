import { describe, expect, it } from "vitest";
import type { ProductDataType } from "../pages/ProductPage/types/ProductDataType";
import { getThumbnailsData } from "./getThumbnailsData";

describe("#getThumbnailsData", () => {
  it("should return an object with href, imgSrc, imgSrcSet, and imgAlt properties when passed valid input data", () => {
    // Arrange
    const data: ProductDataType = {
      collection: "collection",
      name: "name",
      nameToDisplay: "nameToDisplay",
      productNumber: "productNumber",
      size: "size",
      price: {
        integer: 10,
      },
      oldPriceTag: {
        variant: "blue",
        integer: 20,
      },
      variants: ["variant1", "variant2"],
      variantsName: ["variantName1", "variantName2"],
      variant: "variant1",
      variantName: "variantName1",
      thumbnails: {
        thumbnail1: "thumbnail1.jpg",
        thumbnail2: "thumbnail2.jpg",
      },
      images: {},
      description: "description",
    };

    const path = { collection: "collection", product: "product" };
    const productVariant = "variant1";
    const index = 0;

    // Act
    const result = getThumbnailsData(data, path, productVariant, index);

    // Assert
    expect(result.href).toBeUndefined();
    expect(result.imgSrc).toBe(
      "https://www.ikea.com/pl/pl/images/products/collection-name-variant1__thumbnail1.jpg?f=xu",
    );
    expect(result.imgSrcSet).toBe(
      "https://www.ikea.com/pl/pl/images/products/collection-name-variant1__thumbnail1.jpg?f=u 2x, https://www.ikea.com/pl/pl/images/products/collection-name-variant1__thumbnail1.jpg?f=xu",
    );
    expect(result.imgAlt).toBe("collection nameToDisplay, variantName1, size");
  });

  it("should return the correct href property when relatedProducts and path parameters are defined", () => {
    // Arrange
    const data: ProductDataType = {
      collection: "collection",
      name: "name",
      nameToDisplay: "nameToDisplay",
      productNumber: "productNumber",
      size: "size",
      price: {
        integer: 10,
      },
      oldPriceTag: {
        variant: "green",
        integer: 20,
      },
      variants: ["variant1", "variant2"],
      variantsName: ["variantName1", "variantName2"],
      variant: "variant1",
      variantName: "variantName1",
      relatedProducts: {
        variants: {
          variant1: "relatedVariant1",
          variant2: "relatedVariant2",
        },
      },
      thumbnails: {},
      images: {},
      description: "description",
    };
    const path = { collection: "collection", product: "product" };
    const productVariant = "variant1";
    const index = 0;

    // Act
    const result = getThumbnailsData(data, path, productVariant, index);

    // Assert
    expect(result.href).toBe(
      "/products/collection/product/variant1/relatedVariant1",
    );
  });

  it("should return the correct imgAlt property without size when size is universal", () => {
    // Arrange
    const data: ProductDataType = {
      collection: "collection",
      name: "name",
      nameToDisplay: "nameToDisplay",
      productNumber: "productNumber",
      size: "universal",
      price: {
        integer: 10,
      },
      oldPriceTag: {
        variant: "green",
        integer: 20,
      },
      variants: ["variant1", "variant2"],
      variantsName: ["variantName1", "variantName2"],
      variant: "variant1",
      variantName: "variantName1",
      relatedProducts: {
        variants: {
          variant1: "relatedVariant1",
          variant2: "relatedVariant2",
        },
      },
      thumbnails: {},
      images: {},
      description: "description",
    };
    const path = { collection: "collection", product: "product" };
    const productVariant = "variant1";
    const index = 0;

    // Act
    const result = getThumbnailsData(data, path, productVariant, index);

    // Assert
    expect(result.imgAlt).toBe("collection nameToDisplay, variantName1");
  });
});
