// Hooks
import useProduct from "../../../../pages/ProductPage/context/useProduct";
// Types
import { ProductDataType } from "../../../../pages/ProductPage/ProductPage";
// Styles
import "./index.scss";

export default function ProductImageGallery({ data }: { data: ProductDataType }) {
  const { displayedMainImg, path } = useProduct();

  const { images, name, variant, topSeller } = data;

  return (
    <section className="product-image-gallery">
      <h3 className="visually-hidden">Galeria zdjęć</h3>
      {Object.keys(images).map((key, index) => {
        const imgUrl =
          index > 0
            ? `https://www.ikea.com/pl/pl/images/products/${path.collection}-${name}-${variant}__${images[key]}`
            : displayedMainImg;
        const imgSrc = `${imgUrl}?f=s`;
        const imgSrcSet = `${imgUrl}?f=xl 750w, ${imgUrl}?f=l 700w, ${imgUrl}?f=m 600w, ${imgUrl}?f=s 500w, ${imgUrl}?f=xs 400w, ${imgUrl}?f=xxs 300w, ${imgUrl}?f=xxxs 160w`;
        const imgSizes =
          "(max-width: 900px) 100vw, (max-width: 1200px) 160px, (max-width: 1400px) 300px, (max-width: 1700px) 400px, 500px";

        return (
          <button
            key={key}
            className="product-image-gallery__btn"
          >
            <img
              src={imgSrc}
              srcSet={imgSrcSet}
              sizes={imgSizes}
              alt=""
              loading="lazy"
            />
            {topSeller && index === 0 && <strong className="top-seller">Top Seller</strong>}
          </button>
        );
      })}
    </section>
  );
}
