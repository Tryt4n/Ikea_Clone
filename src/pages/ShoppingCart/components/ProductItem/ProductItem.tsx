// React
import { ChangeEvent } from "react";
// react-router-dom
import { useParams } from "react-router-dom";
// Custom Hooks
import useApp from "../../../../hooks/useApp";
import useWindowSize from "../../../../hooks/useWindowSize";
import useModal from "../../../../hooks/useModal";
// Components
import Tag from "../../../../components/ui/Tag/Tag";
import QuantityInput from "../../../../components/features/QuantityInput/QuantityInput";
import { Btn } from "../../../../components/ui/Btn/Btn";
// Helpers
import { startViewTransition } from "../../../../utils/helpers";
// Constants
import { productLink as imageLink } from "../../../../constants/links";
// Utils
import { calculatePrice } from "../../../../utils/calculatePrice";
// Types
import type { ShoppingCartType } from "../../../../context/AppContext";
import type { TextVariants } from "../../../../types/colorsVariantsType";
import type { ModalDataImagePreviewType } from "../../../ProductPage/types/ModalTypes";
// Icons
import TripleDotsMenuIcon from "../../../../Icons/TripleDotsMenuIcon";
// Style
import "./index.scss";

export default function ProductItem({ product }: { product: ShoppingCartType }) {
  const {
    collection,
    images,
    name,
    nameToDisplay,
    price,
    productNumber,
    quantity,
    size,
    variant,
    variantName,
    oldPrice,
    productLink,
  } = product;

  const productImgSrc = `${imageLink}/${collection.toLowerCase()}-${name}-${variant}__${
    images.main
  }`;

  return (
    <li className="shopping-cart-product-item">
      <div className="shopping-cart-product-item__img-wrapper">
        <ProductImgButton
          product={product}
          src={productImgSrc}
        />

        <small className="shopping-cart-product-item__product-number">
          <span className="visually-hidden">Numer produktu:</span>
          {productNumber}
        </small>
      </div>

      <section className="shopping-cart-product-item__text-container">
        <ProductHeader
          collection={collection}
          variant={oldPrice?.variant}
          price={price}
          productLink={productLink}
          quantity={quantity}
        />

        <ProductDescription
          nameToDisplay={nameToDisplay}
          oldPrice={oldPrice}
          price={price}
          quantity={quantity}
          size={size}
          variantName={variantName}
        />

        <ProductControls
          quantity={quantity}
          product={product}
        />
      </section>
    </li>
  );
}

type ProductImgButtonPropsType = {
  product: ModalDataImagePreviewType["productData"];
  src: string;
};

function ProductImgButton({ product, src }: ProductImgButtonPropsType) {
  const { setModalData } = useModal();
  const params = useParams();

  function openImagesPreview() {
    setModalData({
      type: "image-preview",
      productData: {
        images: product.images,
        variant: product.variant,
        name: product.name,
      },
      index: 0,
      path: params,
    });
  }

  return (
    <button
      type="button"
      onClick={openImagesPreview}
    >
      <span className="visually-hidden">Naciśnij aby zobaczyć galerię zdjęć produktu</span>
      <img
        src={src}
        alt=""
        loading="lazy"
      />
    </button>
  );
}

type ProductHeaderPropsType = {
  variant?: TextVariants;
  productLink: ShoppingCartType["productLink"];
  collection: ShoppingCartType["collection"];
  price: ShoppingCartType["price"];
  quantity: ShoppingCartType["quantity"];
};

function ProductHeader({
  variant,
  productLink,
  collection,
  price,
  quantity,
}: ProductHeaderPropsType) {
  return (
    <header className="shopping-cart-product-item__header-wrapper">
      <div>
        {variant && (
          <Tag
            variant={variant}
            className="shopping-cart-product-item__tag"
          >
            Nowa niższa cena
          </Tag>
        )}
        <h3>
          <a href={productLink}>{collection}</a>
        </h3>
      </div>
      <strong>{calculatePrice(quantity, price.integer, price.decimal)}</strong>
    </header>
  );
}

type ProductDescriptionPropsType = {
  nameToDisplay: ShoppingCartType["nameToDisplay"];
  variantName: ShoppingCartType["variantName"];
  price: ShoppingCartType["price"];
  size: ShoppingCartType["size"];
  quantity: ShoppingCartType["quantity"];
  oldPrice: ShoppingCartType["oldPrice"];
};

function ProductDescription({
  nameToDisplay,
  variantName,
  price,
  size,
  quantity,
  oldPrice,
}: ProductDescriptionPropsType) {
  const { integer, decimal, quantity: priceQuantity } = price;

  return (
    <>
      <p>
        {nameToDisplay}, {variantName}
      </p>
      {priceQuantity && <p>{priceQuantity} szt./opak.</p>}
      <p>{size !== "universal" && size}</p>
      {quantity > 1 && (
        <p className="fs-sm">
          {integer},{decimal ? decimal : "-"}/szt.
        </p>
      )}
      {oldPrice && (
        <p className="fs-sm">
          Najniższa cena z ostatnich 30 dni: {oldPrice.integer},
          {oldPrice.decimal ? oldPrice.decimal : "-"}
        </p>
      )}
    </>
  );
}

type ProductControlsPropsType = {
  quantity: ShoppingCartType["quantity"];
  product: ShoppingCartType;
};

function ProductControls({ quantity, product }: ProductControlsPropsType) {
  const { dispatch } = useApp();
  const { width } = useWindowSize();

  const productNumber = product.productNumber;

  function changeQuantity(delta: -1 | 1) {
    startViewTransition(() =>
      dispatch({
        type: "changeProductQuantity",
        payload: { value: delta === -1 ? "subtract" : "add", productNumber: productNumber },
      })
    );
  }

  function changeQuantityByInputValue(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/\D/g, "");
    const parsedValue = parseInt(filteredValue, 10) || 1;

    startViewTransition(() =>
      dispatch({
        type: "changeProductQuantity",
        payload: { value: parsedValue, productNumber: productNumber },
      })
    );
  }

  return (
    <form
      className="shopping-cart-product-item__product-controls"
      onSubmit={(e) => e.preventDefault()}
    >
      <QuantityInput
        quantity={quantity}
        onChangeFunction={changeQuantity}
        inputFunction={changeQuantityByInputValue}
        small
      />

      {width >= 375 && <BtnDeleteProduct product={product} />}

      {width >= 460 && <BtnMoveToShippingList product={product} />}

      {width < 460 && <BtnProductMenu product={product} />}
    </form>
  );
}

type BtnProductPropsType = { product: ShoppingCartType };

function BtnDeleteProduct({ product }: BtnProductPropsType) {
  const { dispatch } = useApp();

  function removeProductFromShoppingCart() {
    startViewTransition(() =>
      dispatch({
        type: "removeProductFromShoppingCart",
        payload: product.productNumber,
      })
    );
  }

  return (
    <button
      type="button"
      className="fs-sm"
      onClick={removeProductFromShoppingCart}
    >
      Usuń produkt
    </button>
  );
}

function BtnMoveToShippingList({ product }: BtnProductPropsType) {
  const { setModalData } = useModal();

  function addToShoppingList() {
    setModalData({
      type: "select-list",
      product: product,
    });
  }

  return (
    <button
      type="button"
      className="fs-sm"
      onClick={addToShoppingList}
    >
      Przenieś do listy zakupów
    </button>
  );
}

function BtnProductMenu({ product }: BtnProductPropsType) {
  const { setModalData } = useModal();

  function openMenu() {
    setModalData({
      type: "product-control",
      product: product,
    });
  }

  return (
    <Btn
      shape="circle"
      variant="light"
      className="shopping-cart-product-item__menu-btn"
      onClick={openMenu}
    >
      <span className="visually-hidden">Otwórz menu produktu</span>
      <TripleDotsMenuIcon />
    </Btn>
  );
}
