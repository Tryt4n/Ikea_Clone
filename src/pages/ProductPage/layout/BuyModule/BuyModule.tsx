// Import custom hooks
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";
import useProduct from "../../context/useProduct";
import useModal from "../../../../hooks/useModal/useModal";
// Import components
import Collection from "../../../../compoundComponents/CollectionProducts/layout/Collection";
import RatingBlock from "../../../../components/features/RatingBlock/RatingBlock";
import ModalControlBtn from "../../components/ModalControlBtn/ModalControlBtn";
import ThumbnailsImagesContainer from "../../components/ThumbnailsImagesContainer/ThumbnailsImagesContainer";
import PurchaseOptions from "../../components/PurchaseOptions/PurchaseOptions";
import BuyBlock from "../../components/BuyBlock/BuyBlock";
import Tag from "../../../../components/ui/Tag/Tag";
import Header from "../../components/Header/Header";
import AdditionalInformation from "../../components/AdditionalInformation/AdditionalInformation";
import GuaranteeInformation from "../../components/GuaranteeInformation/GuaranteeInformation";
import SoftnessInformation from "../../components/SoftnessInformation/SoftnessInformation";
import InformationBox from "../../../../components/ui/InformationBox/InformationBox";
// Import types
import type { ProductDataType } from "../../types/ProductDataType";
// Import styles
import "./index.scss";

/**
 * BuyModule Component
 *
 * This is a React functional component. It displays a module for purchasing a product. The module includes various information about the product, such as its price, rating, guarantee, softness index, and available variants. It also includes buttons for choosing the product's size and color, and a block for purchasing the product.
 *
 * @param {ProductDataType} data - The data for the product.
 *
 * @example
 * <BuyModule data={productData} />
 *
 * @returns A JSX element that consists of an `aside` with the class name `buy-module`. Inside this `aside`, it renders various elements and components that display information about the product and allow the user to choose the product's size and color, and purchase the product.
 */

export default function BuyModule({ data }: { data: ProductDataType }) {
  const { width } = useWindowSize(); // Get the window width from the useWindowSize custom hook
  const { displayedMainImg, path } = useProduct(); // Get the displayedMainImg and path from the useProduct local custom hook

  const { modalID, setModalData } = useModal(); // Get the modalID and setModalData from the useModal custom hook

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
  } = data; // Destructure the data prop

  // Function to show the choose size modal
  function showSizesModal(data: ProductDataType) {
    setModalData({
      type: "choose-size",
      productData: data,
      path: path,
    });
  }

  // Function to show the choose color modal
  function showColorsModal(data: ProductDataType) {
    setModalData({
      type: "choose-color",
      productData: data,
      path: path,
    });
  }

  return (
    <aside className="buy-module">
      {/* If the product is a new product, display the "New" tag */}
      {newTag && <Tag variant={newTag.variant}>Nowość</Tag>}

      {/* If the product's price has been reduced, display the old price tag */}
      {oldPriceTag && <Tag variant={oldPriceTag.variant}>Nowa niższa cena</Tag>}

      {/* Display the product's header */}
      <Header data={data} />

      {/* Display the product's price */}
      <div className="buy-module__price">
        <Collection.ListItemPrice
          price={price.integer}
          priceDecimal={price.decimal}
          quantity={price.quantity}
          sizeInMeters={price.sizeInMeters}
        />
      </div>

      {/* If the product's price has been reduced, display the old price value */}
      {oldPriceTag && (
        <Collection.ListItemLastPriceDescription
          lastPrice={oldPriceTag.integer}
          lastPriceDecimal={oldPriceTag.decimal}
          className="buy-module__old-price"
        />
      )}

      {/* If product's rating exists, display the rating block */}
      {rating && (
        <button className="buy-module__rating" aria-label="Otwórz menu ocen">
          <RatingBlock rating={rating} />
        </button>
      )}

      {/* If product's additional information exists, display the additional information */}
      {additionalInformation && (
        <AdditionalInformation additionalInformation={additionalInformation} />
      )}

      {/* If product's guarantee exists, display the guarantee information */}
      {guarantee && <GuaranteeInformation guarantee={guarantee} />}

      {/* If product's softness index exists, display the softness information */}
      {softnessIndex && <SoftnessInformation softnessIndex={softnessIndex} />}

      {/* If the product has variants, display the thumbnails images container */}
      {variants.length > 1 && (
        <section className="buy-module__thumbnails-container">
          {/* Heading visually hidden, added for accessibility and SEO purposes */}
          <h4 className="visually-hidden">Warianty Produktu</h4>

          {/* If the window width is greater than or equal to 900px, display the modal control button */}
          {width >= 900 && (
            <ModalControlBtn
              chooseText="kolor" // The text to display on the button
              variant={
                displayedMainImg.variant === variant
                  ? variantsName[variants.indexOf(displayedMainImg.variant)]
                  : displayedMainImg.variant
              } // If the displayedMainImg.variant is equal to the variant, display the variant name, otherwise display the displayedMainImg.variant
              onClick={() => showColorsModal(data)} // Show the choose color modal when the button is clicked
              aria-label="Naciśnij aby otworzyć menu wyboru kolorów"
              aria-controls={modalID}
            />
          )}

          <ThumbnailsImagesContainer data={data} openModal={showColorsModal} />
        </section>
      )}

      {/* If the product has sizes, display the modal control button */}
      {relatedProducts?.sizes && (
        <section className="buy-module__size">
          <h4 className="visually-hidden">Rozmiary Produktu</h4>
          <ModalControlBtn
            chooseText="rozmiar" // The text to display on the button
            variant={size}
            onClick={() => showSizesModal(data)} // Show the choose size modal when the button is clicked
            aria-label="Naciśnij aby otworzyć menu wyboru rozmiarów"
            aria-controls={modalID}
          />
        </section>
      )}

      <PurchaseOptions />

      <BuyBlock product={data} />

      {/* If the product has badge for kids, display the information box */}
      {forKidsBadge && (
        <InformationBox
          heading="Dbamy o bezpieczeństwo dzieci" // The heading to display in the information box
          headingLevel={3} // The heading level to use for the heading
          as="section" // The element to use for the information box
          information="Nasze zabawki przechodzą ponad 150 różnych testów bezpieczeństwa zanim trafią do rąk dzieci" // The information to display in the information box
          className="buy-module__kids-information"
        />
      )}
    </aside>
  );
}
