// Hooks
import useWindowSize from "../../../../hooks/useWindowSize";
import useProduct from "../../context/useProduct";
import useModal from "../../../../hooks/useModal";
// Components
import Btn from "../../../../components/Btn/Btn";
import Collection from "../../../../compoundComponents/CollectionProducts/components/Collection";
import RatingBlock from "../../../../components/RatingBlock/RatingBlock";
import ModalControlBtn from "../../components/ModalControlBtn/ModalControlBtn";
import ThumbnailsImagesContainer from "../../components/ThumbnailsImagesContainer/ThumbnailsImagesContainer";
import PurchaseOptions from "../../components/PurchaseOptions/PurchaseOptions";
// Types
import { ProductDataType } from "../../types/ProductDataType";
// Icons
import HeartIcon from "../../../../Icons/HeartIcon";
// Style
import "./index.scss";
import BuyBlock from "../../components/BuyBlock/BuyBlock";

export default function BuyModule({ data }: { data: ProductDataType }) {
  const { width } = useWindowSize();
  const { displayedMainImg, path } = useProduct();

  const { modalID, setIsModalOpen, setModalData } = useModal();

  function showSizesModal(data: ProductDataType) {
    setIsModalOpen(true);
    setModalData({
      type: "choose-size",
      header: "Wybierz rozmiar",
      productData: data,
      path: path,
    });
  }

  function showColorsModal(data: ProductDataType) {
    setIsModalOpen(true);
    setModalData({
      type: "choose-color",
      header: "Wybierz kolor",
      productData: data,
      path: path,
    });
  }

  return (
    <div className="buy-module">
      <div className="buy-module__header">
        <h3>
          <strong>{data.collection}</strong>
          <span>
            {" "}
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

      <div className="buy-module__price">
        <Collection.ListItemPrice
          price={data.price.integer}
          priceDecimal={data.price.decimal}
          quantity={data.price.quantity}
          sizeInMeters={data.price.sizeInMeters}
        />
      </div>

      {data.rating && (
        <button className="buy-module__rating">
          <RatingBlock rating={data.rating} />
        </button>
      )}

      {data.guarantee && (
        <div className="buy-module__guarantee">
          <span
            className="buy-module__badge"
            role="presentation"
            aria-hidden="true"
          >
            25
          </span>
          <span>{data.guarantee}-letnia gwarancja</span>
        </div>
      )}

      {data.variants.length > 1 && (
        <div className="buy-module__thumbnails-container">
          {width >= 900 && (
            <ModalControlBtn
              chooseText="kolor"
              variant={displayedMainImg.variant}
              onClick={() => showColorsModal(data)}
              aria-controls={modalID}
            />
          )}

          <ThumbnailsImagesContainer data={data} />
        </div>
      )}

      {data.relatedProducts?.sizes && (
        <div className="buy-module__size">
          <ModalControlBtn
            chooseText="rozmiar"
            variant={data.size}
            onClick={() => showSizesModal(data)}
            aria-controls={modalID}
          />
        </div>
      )}

      <PurchaseOptions />

      <BuyBlock />
    </div>
  );
}
