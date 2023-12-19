// React
import { useState } from "react";
// Components
import Input from "../../../../components/Input/Input";
import Tag from "../../../../components/Tag/Tag";
// Helpers
import { calculatePrice } from "../../../../utils/calculatePrice";
// Utils
import { productLink as startOfLink } from "../../../../constants/links";
// Types
import type { ShoppingCartType } from "../../../../context/AppContext";
// Style
import "./index.scss";
import RatingBlock from "../../../../components/RatingBlock/RatingBlock";

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

        <Input
          id={productNumber}
          label="Wybierz aby dodać do listy zarządzania produktami"
          type="checkbox"
          labelProps={{
            className: "visually-hidden",
          }}
          inputProps={{}}
        />

        <Header
          collection={collection}
          imgAlt={imgAlt}
          imgMain={mainImgSrc}
          imgHover={hoverImgSrc}
          newTag={newTag}
          oldPrice={oldPrice}
          productLink={productLink}
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

        {/* //TODO Rating */}

        {/* //TODO Quantity Input */}

        {/* //TODO Add to cart and delete btns */}
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
          <div className="list-product__img-wrapper">
            <img
              src={imgSrc}
              alt={imgAlt}
              loading="lazy"
              onMouseEnter={() => setImgSrc(imgHover)}
              onMouseLeave={() => setImgSrc(imgMain)}
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
        {calculatePrice(1, price.integer, price.decimal)}
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
