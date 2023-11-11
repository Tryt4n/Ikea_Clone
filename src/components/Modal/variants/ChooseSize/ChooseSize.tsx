// Hooks
import useCurrentProductPath from "../../../../hooks/useCurrentProductPath";
// Types
import { ModalDataChooseSizeType } from "../../../../pages/ProductPage/types/ModalTypes";

export default function ChooseSize({ data }: { data: ModalDataChooseSizeType }) {
  const { path } = data;

  const location = useCurrentProductPath(path);
  const { relatedProducts, name, variant } = data.productData;

  return (
    <>
      {relatedProducts?.sizes &&
        Object.keys(relatedProducts.sizes).map((productVariant, index) => {
          const href =
            relatedProducts?.sizes &&
            `/products/${path.collection}/${name}/${variant}/${relatedProducts?.sizes[productVariant]}`;
          const Element = location === href ? "div" : "a";

          return (
            <Element
              key={index}
              href={Element === "a" ? href : undefined}
              className="variant-item"
              aria-label={Element === "div" ? "Obecnie wybrany rozmiar" : undefined}
            >
              {productVariant}
            </Element>
          );
        })}
    </>
  );
}
