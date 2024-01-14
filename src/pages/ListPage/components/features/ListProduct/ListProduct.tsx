// Import react dependencies
import { useRef } from "react";
// Import custom hooks
import useList from "../../../context/useList";
// Import components
import Input from "../../../../../components/features/Input/Input";
import RatingBlock from "../../../../../components/features/RatingBlock/RatingBlock";
import { MoreOptionsList } from "../../ui/ProductListMoreOptionsList/MoreOptionsList";
import { QuantityBlock } from "../../ui/ListProductQuantityBlock/QuantityBlock";
import { BtnsControl } from "../../ui/ListProductBtnsControl/BtnsControl";
import { Description } from "../../ui/ListProductDescription/Description";
import { Header } from "../../ui/ListProductHeader/Header";
// Import helpers functions
import { startViewTransition } from "../../../../../utils/helpers";
// Import constants
import { productLink as startOfLink } from "../../../../../constants/links";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";
// Import styles
import "./index.scss";

/**
 * ListProduct is a functional component that receives a product as a prop.
 * It uses the useList custom hook to manage the list of products.
 * It maintains a ref to the input element.
 * It destructures the product prop to get the necessary details of the product.
 * It constructs the image source and alt text for the product.
 * It defines a function handleManagedProducts to add or remove the product from the managed products list.
 * It renders a list item with a section containing the product header, a checkbox to add the product to the managed products list, a description of the product, a rating block, a quantity block, a control buttons block, and a more options list.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.product - The product to be displayed.
 *
 * @returns {JSX.Element} A list item with a section containing the product header, a checkbox to add the product to the managed products list, a description of the product, a rating block, a quantity block, a control buttons block, and a more options list.
 */

export default function ListProduct({
  product,
}: {
  product: ShoppingCartType;
}) {
  const { managedProducts, setManagedProducts } = useList(); // Destructure the managedProducts and setManagedProducts variables from the useList custom hook.
  const inputRef = useRef<HTMLInputElement | null>(null); // Maintain a ref to the input element.

  const {
    collection,
    nameToDisplay,
    newTag,
    price,
    productNumber,
    quantity,
    size,
    variantName,
    oldPrice,
    productLink,
    images,
    name,
    variant,
    rating,
  } = product; // Destructure the product prop to get the necessary details of the product.

  const imgSrc = `${startOfLink}/${collection}-${name}-${variant}__`; // Construct the image beginning path source for the product.

  const imgAlt = `${collection} ${nameToDisplay} ${variantName} ${
    size !== "universal" ? size : ""
  }`; // Construct the alt text for the product.

  const mainImgSrc = `${imgSrc}${images.main}`; // Construct the image source for the main image of the product.

  const hoverImgSrc = `${imgSrc}${
    images.imgHover || images.imgHover || images.hover || images.imageHover
  }`; // Construct the image source for the hover image of the product.

  // Define a function handleManagedProducts to add or remove the product from the managed products list.
  function handleManagedProducts(product: ShoppingCartType) {
    const isProductAlreadyInList = managedProducts.some(
      (item) => item.productNumber === product.productNumber,
    ); // Check if the product is already in the managed products list.

    startViewTransition(() => {
      // If the product is already in the managed products list, remove it from the list, otherwise add it to the list.
      if (isProductAlreadyInList) {
        setManagedProducts((prev) =>
          prev.filter((item) => item.productNumber !== product.productNumber),
        );
      } else {
        setManagedProducts((prev) => [...prev, product]);
      }
    });
  }

  return (
    <li className="list-product">
      <section>
        <h3 className="visually-hidden">{collection}</h3>

        <Header
          collection={collection}
          imgAlt={imgAlt}
          imgMain={mainImgSrc}
          imgHover={hoverImgSrc}
          newTag={newTag}
          oldPrice={oldPrice}
          productLink={productLink}
        />

        <Input
          id={productNumber} // Set the id of the input element to the product number.
          label="Wybierz aby dodać do listy zarządzania produktami" // Set the label of the input element.
          type="checkbox" // Set the type of the input element to checkbox.
          className={`list-product__checkbox-wrapper${
            managedProducts.length === 0
              ? " list-product__checkbox-wrapper--hidden"
              : ""
          }`} // Set the className of the input element.
          labelProps={{
            className: "visually-hidden", // Set the className of the label element to visually-hidden for accessibility.
          }}
          inputProps={{
            ref: inputRef, // Set the ref of the input element to the inputRef.
            onChange: () => handleManagedProducts(product), // Set the onChange event handler of the input element to handleManagedProducts.
            checked: managedProducts.some(
              (item) => item.productNumber === product.productNumber,
            ), // Set the checked status of the input element to true if the product is already in the managed products list.
          }}
        />

        <Description
          nameToDisplay={nameToDisplay}
          variantName={variantName}
          price={price}
          size={size}
          quantity={quantity}
          oldPrice={oldPrice}
        />

        <RatingBlock
          rating={rating ? rating : { rate: 0, quantity: 0 }} // Set the rating prop of the RatingBlock component to the rating of the product or to an object with rate and quantity properties set to 0.
          longVersion
        />

        <QuantityBlock
          productNumber={productNumber}
          quantity={product.quantity}
        />

        <BtnsControl product={product} />

        <MoreOptionsList product={product} />
      </section>
    </li>
  );
}
