// Hooks
import useWindowSize from "../../../../hooks/useWindowSize";
import useProduct from "../../context/useProduct";
import useModal from "../../../../hooks/useModal";
// Components
import Collection from "../../../../compoundComponents/CollectionProducts/components/Collection";
import RatingBlock from "../../../../components/RatingBlock/RatingBlock";
import ModalControlBtn from "../../components/ModalControlBtn/ModalControlBtn";
import ThumbnailsImagesContainer from "../../components/ThumbnailsImagesContainer/ThumbnailsImagesContainer";
import PurchaseOptions from "../../components/PurchaseOptions/PurchaseOptions";
import BuyBlock from "../../components/BuyBlock/BuyBlock";
import Tag from "../../components/Tag/Tag";
import Header from "../../components/Header/Header";
import AdditionalInformation from "../../components/AdditionalInformation/AdditionalInformation";
import GuaranteeInformation from "../../components/GuaranteeInformation/GuaranteeInformation";
import SoftnessInformation from "../../components/SoftnessInformation/SoftnessInformation";
import KidsInformation from "../../components/KidsInformation/KidsInformation";
// Types
import { ProductDataType } from "../../types/ProductDataType";
// Style
import "./index.scss";

export default function BuyModule({ data }: { data: ProductDataType }) {
  const { width } = useWindowSize();
  const { displayedMainImg, path } = useProduct();

  const { modalID, setIsModalOpen, setModalData } = useModal();

  const {
    size,
    price,
    rating,
    guarantee,
    softnessIndex,
    variantsName,
    variant,
    variants,
    relatedProducts,
    forKidsBadge,
    additionalInformation,
    oldPriceTag,
    newTag,
  } = data;

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
      {newTag && <Tag variant={newTag.variant}>Nowość</Tag>}

      {oldPriceTag && <Tag variant={oldPriceTag.variant}>Nowa niższa cena</Tag>}

      <Header data={data} />

      <div className="buy-module__price">
        <Collection.ListItemPrice
          price={price.integer}
          priceDecimal={price.decimal}
          quantity={price.quantity}
          sizeInMeters={price.sizeInMeters}
        />
      </div>

      {oldPriceTag && (
        <Collection.ListItemLastPriceDescription
          lastPrice={oldPriceTag.integer}
          lastPriceDecimal={oldPriceTag.decimal}
          className="buy-module__old-price"
        />
      )}

      {rating && (
        <button
          className="buy-module__rating"
          aria-label="Otwórz menu ocen"
        >
          <RatingBlock rating={rating} />
        </button>
      )}

      {additionalInformation && (
        <AdditionalInformation additionalInformation={additionalInformation} />
      )}

      {guarantee && <GuaranteeInformation guarantee={guarantee} />}

      {softnessIndex && <SoftnessInformation softnessIndex={softnessIndex} />}

      {variants.length > 1 && (
        <div className="buy-module__thumbnails-container">
          {width >= 900 && (
            <ModalControlBtn
              chooseText="kolor"
              variant={
                displayedMainImg.variant === variant
                  ? variantsName[variants.indexOf(displayedMainImg.variant)]
                  : displayedMainImg.variant
              }
              onClick={() => showColorsModal(data)}
              aria-controls={modalID}
            />
          )}

          <ThumbnailsImagesContainer
            data={data}
            openModal={showColorsModal}
          />
        </div>
      )}

      {relatedProducts?.sizes && (
        <div className="buy-module__size">
          <ModalControlBtn
            chooseText="rozmiar"
            variant={size}
            onClick={() => showSizesModal(data)}
            aria-controls={modalID}
          />
        </div>
      )}

      <PurchaseOptions />

      <BuyBlock />

      {forKidsBadge && <KidsInformation />}
    </div>
  );
}
