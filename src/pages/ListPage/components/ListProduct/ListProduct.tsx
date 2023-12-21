// React
import { ChangeEvent, useState } from "react";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useList from "../../context/useList";
import useModal from "../../../../hooks/useModal";
// Components
import Input from "../../../../components/features/Input/Input";
import Tag from "../../../../components/ui/Tag/Tag";
import RatingBlock from "../../../../components/features/RatingBlock/RatingBlock";
import QuantityInput from "../../../../components/features/QuantityInput/QuantityInput";
import { Btn } from "../../../../components/ui/Btn/Btn";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
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

        <QuantityBlock
          productNumber={productNumber}
          quantity={product.quantity}
        />

        <BtnsControl product={product} />

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
  const totalPrice = calculatePrice(quantity, price.integer, price.decimal).split(",");
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

function QuantityBlock({
  productNumber,
  quantity,
}: {
  productNumber: ShoppingCartType["productNumber"];
  quantity: ShoppingCartType["quantity"];
}) {
  const { dispatch } = useApp();
  const { listId } = useList();

  function changeQuantity(delta: -1 | 1) {
    startViewTransition(() =>
      dispatch({
        type: "changeProductQuantityOnList",
        payload: {
          listId: listId,
          value: delta === -1 ? "subtract" : "add",
          productNumber: productNumber,
        },
      })
    );
  }

  function changeQuantityByInputValue(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/\D/g, "");
    const parsedValue = parseInt(filteredValue, 10) || 1;

    startViewTransition(() =>
      dispatch({
        type: "changeProductQuantityOnList",
        payload: { listId: listId, value: parsedValue, productNumber: productNumber },
      })
    );
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <QuantityInput
        className="list-product__quantity-input-wrapper"
        quantity={quantity}
        onChangeFunction={changeQuantity}
        inputFunction={changeQuantityByInputValue}
        small
      />
    </form>
  );
}

function BtnsControl({ product }: { product: ShoppingCartType }) {
  const { dispatch } = useApp();
  const { listId } = useList();

  function addToShoppingCart() {
    dispatch({ type: "addToShoppingCart", payload: product });
  }

  function deleteFromList() {
    startViewTransition(() => {
      dispatch({
        type: "deleteProductFromList",
        payload: { listId: listId, productNumber: product.productNumber },
      });
    });
  }

  return (
    <div className="list-product__btns-wrapper">
      <Btn
        shape="circle"
        variant="blue"
        onClick={addToShoppingCart}
      >
        <span className="visually-hidden">Dodaj do koszyka</span>
        <ShoppingCartAddIcon />
      </Btn>

      <Btn
        shape="circle"
        variant="light"
        onClick={deleteFromList}
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
