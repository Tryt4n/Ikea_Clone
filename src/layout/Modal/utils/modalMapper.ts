// Import types
import type { ModalDataType } from "../types/ModalTypes";
import type { ModalTypes } from "../Modal";

/**
 * `typeToClassMap` is an object that maps modal types to CSS class names.
 * It is used to determine the CSS class of a modal based on its type.
 *
 * @type {Record<ModalDataType["type"], ModalTypes>}
 * @property {string} "choose-color" - The CSS class for the "choose-color" modal type.
 * @property {string} "choose-size" - The CSS class for the "choose-size" modal type.
 * @property {string} "product-information" - The CSS class for the "product-information" modal type.
 * @property {string} "items-included" - The CSS class for the "items-included" modal type.
 * @property {string} dimensions - The CSS class for the "dimensions" modal type.
 * @property {string} ratings - The CSS class for the "ratings" modal type.
 * @property {string} "installment-purchase" - The CSS class for the "installment-purchase" modal type.
 * @property {string} "postal-code" - The CSS class for the "postal-code" modal type.
 * @property {string} "choose-shop" - The CSS class for the "choose-shop" modal type.
 * @property {string} "preffered-shop" - The CSS class for the "preffered-shop" modal type.
 * @property {string} "chosen-shop" - The CSS class for the "chosen-shop" modal type.
 * @property {string} "log-in" - The CSS class for the "log-in" modal type.
 * @property {string} refund - The CSS class for the "refund" modal type.
 * @property {string} "data-encryption" - The CSS class for the "data-encryption" modal type.
 * @property {string} "next-step" - The CSS class for the "next-step" modal type.
 * @property {string} "product-control" - The CSS class for the "product-control" modal type.
 * @property {string} "shopping-cart-control" - The CSS class for the "shopping-cart-control" modal type.
 * @property {string} "add-product-by-number" - The CSS class for the "add-product-by-number" modal type.
 * @property {string} "create-list" - The CSS class for the "create-list" modal type.
 * @property {string} "create-list-with-products" - The CSS class for the "create-list-with-products" modal type.
 * @property {string} "change-list-name" - The CSS class for the "change-list-name" modal type.
 * @property {string} "list-control" - The CSS class for the "list-control" modal type.
 * @property {string} "delete-list-confirmation" - The CSS class for the "delete-list-confirmation" modal type.
 * @property {string} "select-list" - The CSS class for the "select-list" modal type.
 * @property {string} "select-list-with-products" - The CSS class for the "select-list-with-products" modal type.
 * @property {string} "move-to-other-list" - The CSS class for the "move-to-other-list" modal type.
 * @property {string} "more-options-for-product-in-list" - The CSS class for the "more-options-for-product-in-list" modal type.
 * @property {string} "move-product-from-one-list-to-another" - The CSS class for the "move-product-from-one-list-to-another" modal type.
 * @property {string} "manage-products-in-list" - The CSS class for the "manage-products-in-list" modal type.
 * @property {string} "image-preview" - The CSS class for the "image-preview" modal type.
 * @property {string} "image-with-products" - The CSS class for the "image-with-products" modal type.
 * @property {string} menu - The CSS class for the "menu" modal type.
 * @property {string} "products-menu" - The CSS class for the "products-menu" modal type.
 * @property {string} "rooms-menu" - The CSS class for the "rooms-menu" modal type.
 */

export const typeToClassMap: Record<ModalDataType["type"], ModalTypes> = {
  "choose-color": "side-modal",
  "choose-size": "side-modal",
  "product-information": "side-modal",
  "items-included": "side-modal",
  dimensions: "side-modal",
  ratings: "side-modal",
  "installment-purchase": "side-modal",
  "postal-code": "side-modal",
  "choose-shop": "side-modal",
  "preffered-shop": "side-modal",
  "chosen-shop": "side-modal",
  "log-in": "side-modal",
  refund: "side-modal",
  "data-encryption": "side-modal",
  "next-step": "side-modal",
  "product-control": "side-modal",
  "shopping-cart-control": "side-modal",
  "add-product-by-number": "side-modal",
  "create-list": "side-modal",
  "create-list-with-products": "side-modal",
  "change-list-name": "side-modal",
  "list-control": "side-modal",
  "delete-list-confirmation": "side-modal",
  "select-list": "side-modal",
  "select-list-with-products": "side-modal",
  "move-to-other-list": "side-modal",
  "more-options-for-product-in-list": "side-modal",
  "move-product-from-one-list-to-another": "side-modal",
  "manage-products-in-list": "side-modal",
  "image-preview": "image-modal",
  "image-with-products": "image-with-products-modal",
  menu: "menu-modal",
  "products-menu": "menu-modal",
  "rooms-menu": "menu-modal",
};
