// Import custom hooks
import useCurrentProductPath from "../../../../hooks/useCurrentProductPath/useCurrentProductPath";
// Import types
import type { ModalDataChooseSizeType } from "../../types/ModalTypes";

/**
 * ChooseSize is a React component that renders a list of size variants for a product.
 * Each size variant is represented by a text.
 * The component uses the useCurrentProductPath custom hook.
 *
 * @param {ModalDataChooseSizeType} props.data - The data of the size variants.
 *
 * @example
 * <ChooseSize data={data} />
 */

export default function ChooseSize({
  data,
}: {
  data: ModalDataChooseSizeType;
}) {
  const { path } = data; // Destructure the path property from the data object.

  const location = useCurrentProductPath(path); // Use the useCurrentProductPath custom hook to get the current product path.
  const { relatedProducts, name, variant } = data.productData; // Destructure the relatedProducts, name, and variant properties from the productData property of the data object.

  return (
    <>
      {/* If the relatedProducts object has a sizes property, map through the sizes object and render a text for each size variant. */}
      {relatedProducts?.sizes &&
        Object.keys(relatedProducts.sizes).map((productVariant, index) => {
          const href =
            relatedProducts?.sizes &&
            `/products/${path.collection}/${name}/${variant}/${relatedProducts?.sizes[productVariant]}`; // The href property for each size variant.

          const Element = location === href ? "div" : "a"; // If the current product path is equal to the href property, render a `div` element. Otherwise, render an `a` element.

          return (
            <Element
              key={index}
              href={Element === "a" ? href : undefined} // Set href only if the Element is an `a` element.
              className="variant-item"
              aria-label={
                Element === "div" ? "Obecnie wybrany rozmiar" : undefined
              } // Set aria-label only if the variant is currently selected.
              data-testid="modal-product-size"
            >
              {productVariant}
            </Element>
          );
        })}
    </>
  );
}
