// Components
import Btn from "../../components/Btn/Btn";
import Collection from "../../compoundComponents/CollectionProducts/components/Collection";
import RatingBlock from "../../components/RatingBlock/RatingBlock";
import ModalControlBtn from "./components/ModalControlBtn/ModalControlBtn";
import ThumbnailsImagesContainer from "./components/ThumbnailsImagesContainer/ThumbnailsImagesContainer";
// Types
import { ProductDataType } from "../../pages/ProductPage/ProductPage";
// Icons
import HeartIcon from "../../Icons/HeartIcon";
// Style
import "./index.scss";

export default function BuyModule({ data }: { data: ProductDataType }) {
  return (
    <section className="buy-module">
      <div className="buy-module__header">
        <h3>
          <strong>{data.collection}</strong>&nbsp;
          <br />
          <span>
            {data.nameToDisplay}, {data.variantName}
            {data.size !== "universal" && (
              <>
                , &nbsp;
                <button>{data.size}</button>
              </>
            )}
          </span>
        </h3>
        <Btn
          variant="light"
          shape="circle"
        >
          <span className="visually-hidden">Dodaj do ulubionych</span>
          <HeartIcon />
        </Btn>
      </div>

      <Collection.ListItemPrice
        price={data.price.integer}
        priceDecimal={data.price.decimal}
        quantity={data.price.quantity}
        sizeInMeters={data.price.sizeInMeters}
      />

      {/* {data.rating && <RatingBlock rating={data.rating} />} */}
      {data.rating && (
        <button>
          <RatingBlock rating={data.rating} />
        </button>
      )}

      {data.variants.length > 1 && (
        <div className="buy-module__thumbnails-container">
          <ModalControlBtn
            chooseText="kolor"
            variant={data.variantName}
          />

          <ThumbnailsImagesContainer data={data} />
        </div>
      )}

      {data.relatedProducts?.sizes && (
        <ModalControlBtn
          chooseText="rozmiar"
          variant={data.size}
        />
      )}

      {/*//! Link to other sizes */}
      {/* {data.relatedProducts?.sizes &&
        Object.keys(data.relatedProducts.sizes).map((key, index) => {
          return (
            <>
              <br />
              <a
                key={index}
                href={
                  data.relatedProducts?.sizes &&
                  `/products/${path.collection}/${data.name}/${data.variant}/${
                    data.relatedProducts.sizes[Object.keys(data.relatedProducts.sizes)[index]]
                  }`
                }
              >
                {key}
              </a>
            </>
          );
        })} */}
    </section>
  );
}
