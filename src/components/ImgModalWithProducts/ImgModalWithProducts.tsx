// React
import { ForwardedRef, forwardRef } from "react";
// Components
import Article from "../../compoundComponents/Article/Article";
import CollectionProductsList from "../../layout/Articles/components/CollectionProductsList/CollectionProductsList";
// Types
import { CardCollectionType } from "../../layout/Articles/components/ImageCardCollection/ImageCardCollection";
// Icons
import CloseIcon from "../../Icons/CloseIcon";
import RaringStarHalfIcon from "../../Icons/RaringStarHalfIcon";
import RatingStarIcon from "../../Icons/RatingStarIcon";
import ShoppingCartAddIcon from "../../Icons/ShoppingCartAddIcon";
import HeartIcon from "../../Icons/HeartIcon";
// Style
import "./index.scss";
import Collection from "../../compoundComponents/CollectionProducts/components/Collection";

type DialogPropsType = {
  id: string;
  closeModal: () => void;
  onClickFunction: (e: React.MouseEvent<HTMLDialogElement>) => void;
  onKeyDownFunction: (e: React.KeyboardEvent<HTMLDialogElement>) => void;
  modalData: CardCollectionType | undefined;
};

function InnerComponent(
  { id, closeModal, onClickFunction, onKeyDownFunction, modalData }: DialogPropsType,
  ref: ForwardedRef<HTMLDialogElement>
) {
  return (
    <dialog
      id={id}
      ref={ref}
      onClick={onClickFunction}
      onKeyDown={onKeyDownFunction}
      className="modal"
    >
      <div className="modal__header">
        <span className="modal__heading">Wasze wnętrza</span>
        <button
          type="button"
          onClick={closeModal}
          autoFocus
        >
          <span className="visually-hidden">Zamknij</span>
          <CloseIcon />
        </button>
      </div>

      <div className="modal__main-content">
        <div className="modal__img-container">
          <img
            src={modalData?.img.imgSrc}
            alt={modalData?.img.imgAlt}
            className={
              modalData ? `aspect-ratio-${modalData.img.imgAspectRatio.replace("/", "-")}` : ""
            }
          />

          {modalData && <CollectionProductsList products={modalData?.products} />}
          {modalData?.instagramUser && (
            <Article.InstagramBadge>{modalData.instagramUser}</Article.InstagramBadge>
          )}
        </div>

        <ul className="modal__products-list">
          {modalData?.products.map((product) => (
            <li key={product.id}>
              <a
                href={product.productLink}
                className="modal__product"
              >
                <div className="modal__product-img-container">
                  <img
                    src={modalData.img.imgSrc}
                    alt={`${product.productHeading} ${product.productSubHeading}`}
                    // className="aspect-ratio-3-4"
                  />
                  {product.topSellerTag && (
                    <strong className="modal__img-top-seller-badge">Top Seller</strong>
                  )}
                </div>

                <div className="modal__product-text-wrapper">
                  {product.newPriceTag && (
                    <em className="modal__product-new-price-tag">Nowa niższa cena</em>
                  )}
                  <strong className="modal__product-heading">{product.productHeading}</strong>
                  <p className="modal__product-subheading">{product.productSubHeading}</p>
                  <Collection.ListItemPrice
                    price={product.productPriceInteger}
                    priceDecimal={product.productPriceDecimal}
                    quantity={product.productQuantity}
                    sizeInMeters={product.productSizeInMeters}
                  />
                  {product.newPriceTag && (
                    <Collection.ListItemLastPriceDescription
                      lastPrice={product.newPriceTag.lastItemPriceInteger}
                      lastPriceDecimal={product.newPriceTag.lastItemPriceDecimal}
                    />
                  )}
                  <div className="modal__product-ratings-container">
                    <span className="modal__product-ratings">
                      <RatingStarIcon />
                      <RatingStarIcon />
                      <RatingStarIcon />
                      <RatingStarIcon />
                      <RaringStarHalfIcon />
                    </span>
                    <span className="modal__product-rating-text">(249)</span>
                  </div>
                </div>

                <div className="modal__product-btns-wrapper">
                  <button className="modal__product-btn modal__product-btn--accent">
                    <span className="visually-hidden">Dodaj produkt do koszyka</span>
                    <ShoppingCartAddIcon />
                  </button>
                  <button className="modal__product-btn">
                    <span className="visually-hidden">Dodaj produkt do listy życzeń</span>
                    <HeartIcon />
                  </button>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}

export const ImgModalWithProducts = forwardRef(InnerComponent);
