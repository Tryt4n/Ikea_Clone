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
import InformationBox from "../../../../components/InformationBox/InformationBox";
// Types
import type { ProductDataType } from "../../types/ProductDataType";
// Style
import "./index.scss";

export default function BuyModule({ data }: { data: ProductDataType }) {
  const { width } = useWindowSize();
  const { displayedMainImg, path } = useProduct();

  const { modalID, openModal, setModalData } = useModal();

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
    openModal();
    setModalData({
      type: "choose-size",
      productData: data,
      path: path,
    });
  }

  function showColorsModal(data: ProductDataType) {
    openModal();
    setModalData({
      type: "choose-color",
      productData: data,
      path: path,
    });
  }

  return (
    <aside className="buy-module">
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
        <section className="buy-module__thumbnails-container">
          <h4 className="visually-hidden">Warianty Produktu</h4>
          {width >= 900 && (
            <ModalControlBtn
              chooseText="kolor"
              variant={
                displayedMainImg.variant === variant
                  ? variantsName[variants.indexOf(displayedMainImg.variant)]
                  : displayedMainImg.variant
              }
              onClick={() => showColorsModal(data)}
              aria-label="Naciśnij aby otworzyć menu wyboru kolorów"
              aria-controls={modalID}
            />
          )}

          <ThumbnailsImagesContainer
            data={data}
            openModal={showColorsModal}
          />
        </section>
      )}

      {relatedProducts?.sizes && (
        <section className="buy-module__size">
          <h4 className="visually-hidden">Rozmiary Produktu</h4>
          <ModalControlBtn
            chooseText="rozmiar"
            variant={size}
            onClick={() => showSizesModal(data)}
            aria-label="Naciśnij aby otworzyć menu wyboru rozmiarów"
            aria-controls={modalID}
          />
        </section>
      )}

      <PurchaseOptions />

      <BuyBlock product={data} />

      {forKidsBadge && (
        <InformationBox
          heading="Dbamy o bezpieczeństwo dzieci"
          headingLevel={3}
          as="section"
          information="Nasze zabawki przechodzą ponad 150 różnych testów bezpieczeństwa zanim trafią do rąk dzieci"
          className="buy-module__kids-information"
        />
      )}
    </aside>
  );
}
