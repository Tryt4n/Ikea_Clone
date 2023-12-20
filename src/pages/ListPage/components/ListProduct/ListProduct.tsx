// React
import { useState } from "react";
// Custom Hooks
import useModal from "../../../../hooks/useModal";
// Components
import Input from "../../../../components/Input/Input";
import Tag from "../../../../components/Tag/Tag";
import RatingBlock from "../../../../components/RatingBlock/RatingBlock";
import QuantityInput from "../../../../components/QuantityInput/QuantityInput";
import { Btn } from "../../../../components/Btn/Btn";
// Helpers
import { calculatePrice } from "../../../../utils/calculatePrice";
// Utils
import { productLink as startOfLink } from "../../../../constants/links";
// Types
import type { ShoppingCartType } from "../../../../context/AppContext";
// Style
import "./index.scss";
// Icons
import ShoppingCartAddIcon from "../../../../Icons/ShoppingCartAddIcon";
import TrashIcon from "../../../../Icons/TrashIcon";

export default function ListProduct({ product }: { product: ShoppingCartType }) {
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
  } = product;

  const imgSrc = `${startOfLink}/${collection}-${name}-${variant}__`;
  const imgAlt = `${collection} ${nameToDisplay} ${variantName} ${size}`;
  const mainImgSrc = `${imgSrc}${images.main}`;
  const hoverImgSrc = `${imgSrc}${
    images.imgHover || images.imgHover || images.hover || images.imageHover
  }`;

  return (
    <li className="list-product">
      <section className="">
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
          id={productNumber}
          label="Wybierz aby dodać do listy zarządzania produktami"
          type="checkbox"
          className="list-product__checkbox-wrapper"
          labelProps={{
            className: "visually-hidden",
          }}
          inputProps={{}}
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
          rating={rating ? rating : { rate: 0, quantity: 0 }}
          longVersion
        />

        {/* //TODO Add functions */}
        <QuantityInput
          className="list-product__quantity-input-wrapper"
          quantity={quantity}
          onChangeFunction={() => console.log("change")}
          inputFunction={() => console.log("input function")}
          small
        />

        <BtnsControl />

        <MoreOptionsList product={product} />
      </section>
    </li>
  );
}

type HeaderType = {
  productLink: ShoppingCartType["productLink"];
  imgMain: ShoppingCartType["images"][number];
  imgHover: ShoppingCartType["images"][number];
  imgAlt: string;
  newTag: ShoppingCartType["newTag"];
  oldPrice: ShoppingCartType["oldPrice"];
  collection: ShoppingCartType["collection"];
};

function Header({
  productLink,
  imgMain,
  imgHover,
  imgAlt,
  newTag,
  oldPrice,
  collection,
}: HeaderType) {
  const [imgSrc, setImgSrc] = useState(imgMain);

  return (
    <header className="list-product__header-wrapper">
      <a href={productLink.toLowerCase()}>
        <figure>
          <div
            className="list-product__img-wrapper"
            onMouseEnter={() => setImgSrc(imgHover)}
            onMouseLeave={() => setImgSrc(imgMain)}
          >
            <img
              src={imgSrc}
              alt={imgAlt}
              loading="lazy"
            />
          </div>

          {newTag && <Tag variant={newTag.variant}>Nowość</Tag>}
          {oldPrice && <Tag variant={oldPrice.variant}>Nowa niższa cena</Tag>}

          <figcaption className="list-product__header">{collection}</figcaption>
        </figure>
      </a>
    </header>
  );
}

type DescriptionType = {
  nameToDisplay: ShoppingCartType["nameToDisplay"];
  variantName: ShoppingCartType["variantName"];
  price: ShoppingCartType["price"];
  size: ShoppingCartType["size"];
  quantity: ShoppingCartType["quantity"];
  oldPrice: ShoppingCartType["oldPrice"];
};

function Description({
  nameToDisplay,
  variantName,
  size,
  quantity,
  price,
  oldPrice,
}: DescriptionType) {
  const totalPrice = calculatePrice(1, price.integer, price.decimal).split(",");
  const totalPriceInteger = totalPrice[0];
  const totalPriceDecimal = totalPrice[1];

  return (
    <>
      <p>
        {nameToDisplay}, {variantName}
        {(size !== "universal" || quantity > 1) && ","}
        {price.quantity && ` ${price.quantity} szt./opak.,`}
        {size !== "universal" && ` ${size}`}
      </p>

      {quantity > 1 && (
        <p className="fs-sm">
          {price.integer},{price.decimal ? price.decimal : "-"}/szt.
        </p>
      )}

      <strong className="list-product__price">
        {totalPriceInteger}
        <sup>
          <small>,{totalPriceDecimal}</small>
        </sup>
      </strong>

      {oldPrice && (
        <p className="fs-sm">
          Najniższa cena z ostatnich 30 dni: {oldPrice.integer},
          {oldPrice.decimal ? oldPrice.decimal : "-"}
        </p>
      )}
    </>
  );
}

function BtnsControl() {
  return (
    <div className="list-product__btns-wrapper">
      <Btn
        shape="circle"
        variant="blue"
      >
        <span className="visually-hidden">Dodaj do koszyka</span>
        <ShoppingCartAddIcon />
      </Btn>

      <Btn
        shape="circle"
        variant="light"
      >
        <span className="visually-hidden">Usuń produkt z tej listy</span>
        <TrashIcon />
      </Btn>
    </div>
  );
}

function MoreOptionsList({ product }: { product: ShoppingCartType }) {
  const { setModalData } = useModal();

  function openMoreOptionsModal() {
    setModalData({ type: "more-options-for-product-in-list", product: product });
  }

  return (
    <ul className="list-product__more-options-list">
      <li>
        <button className="list-product__more-options-btn">Sprawdź opcje dostawy i odbioru</button>
      </li>
      <li>
        <button className="list-product__more-options-btn">Pokaż dołączone elementy</button>
      </li>
      <li>
        <button
          className="list-product__more-options-btn"
          onClick={openMoreOptionsModal}
        >
          Więcej opcji
        </button>
      </li>
    </ul>
  );
}
