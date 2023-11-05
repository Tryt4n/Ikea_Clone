// React
import { ForwardedRef, forwardRef } from "react";
// Components
import Article from "../../compoundComponents/Article/Article";
import CollectionProductsList, {
  ProductType,
} from "../../layout/Articles/components/CollectionProductsList/CollectionProductsList";
// Types
import { CardCollectionType } from "../../layout/Articles/components/ImageCardCollection/ImageCardCollection";
// Icons
import CloseIcon from "../../Icons/CloseIcon";
import ShoppingCartAddIcon from "../../Icons/ShoppingCartAddIcon";
import HeartIcon from "../../Icons/HeartIcon";
// Style
import "./index.scss";
import Collection from "../../compoundComponents/CollectionProducts/components/Collection";
import useWindowSize from "../../hooks/useWindowSize";
import InstagramIcon from "../../Icons/InstagramIcon";
import RatingBlock from "../RatingBlock/RatingBlock";
import Btn from "../Btn/Btn";

type DialogPropsType = {
  id: string;
  closeModal: () => void;
  onClickFunction: (e: React.MouseEvent<HTMLDialogElement>) => void;
  onKeyDownFunction: (e: React.KeyboardEvent<HTMLDialogElement>) => void;
  modalData: CardCollectionType | undefined;
};

type extendedProductType = ProductType & {
  imgSrc?: string;
  imgHoverSrc?: string;
  rating?: {
    rate: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
    quantity: number;
  };
};

function InnerComponent(
  { id, closeModal, onClickFunction, onKeyDownFunction, modalData }: DialogPropsType,
  ref: ForwardedRef<HTMLDialogElement>
) {
  const { width, height } = useWindowSize();

  return (
    <dialog
      id={id}
      ref={ref}
      onClick={onClickFunction}
      onKeyDown={onKeyDownFunction}
      className="modal"
    >
      {modalData && (
        <>
          <div className="modal__header">
            <span className="modal__heading">Wasze wnętrza</span>
            <button
              type="button"
              onClick={closeModal}
            >
              <span className="visually-hidden">Zamknij</span>
              <CloseIcon />
            </button>
          </div>
          {(width < 1000 || height < 700) && modalData.instagramUser && (
            <div className="modal__instagram-nick-mobile">
              <InstagramIcon />
              <span>{modalData.instagramUser}</span>
            </div>
          )}

          <div className="modal__main-content">
            {width >= 1000 && height >= 700 && (
              <Article.ImgContainer className="modal__img-inner-wrapper">
                <Article.Img
                  src={modalData.img.imgSrc}
                  srcSet={modalData.img.imgSrcSet}
                  alt={modalData.img.imgAlt}
                  aspectRatio={modalData.img.imgAspectRatio}
                  sizes="(min-width: 900px) 50vw, (max-width: 900px) 100vw, 100vw"
                />
                <CollectionProductsList products={modalData.products} />
                {modalData.instagramUser && (
                  <Article.InstagramBadge>{modalData.instagramUser}</Article.InstagramBadge>
                )}
              </Article.ImgContainer>
            )}
            <ul className="modal__products-list">
              {modalData.products.map((product: extendedProductType) => (
                <li key={product.id}>
                  <a
                    href={product.productLink}
                    className="modal__product"
                  >
                    <div className="modal__product-img-container">
                      <div className="modal__thumbnail-wrapper">
                        <img
                          src={`https://www.ikea.com/pl/pl/images/products/${product.imgSrc}_s5.jpg?f=xxs`}
                          srcSet={`https://www.ikea.com/pl/pl/images/products/${product.imgSrc}_s5.jpg?f=m 600w, https://www.ikea.com/pl/pl/images/products/${product.imgSrc}_s5.jpg?f=xxs 300w, https://www.ikea.com/pl/pl/images/products/${product.imgSrc}_s5.jpg?f=xxxs 160w, https://www.ikea.com/pl/pl/images/products/${product.imgSrc}_s5.jpg?f=u 80w`}
                          sizes="(max-width: 400px) 80px, (max-width: 1450px) 160px, 300px"
                          alt={`${product.productHeading} ${product.productSubHeading}`}
                          className="modal__thumbnail-img"
                        />
                        <img
                          src={`https://www.ikea.com/pl/pl/images/products/${product.imgHoverSrc}_s5.jpg?f=xxs`}
                          srcSet={`https://www.ikea.com/pl/pl/images/products/${product.imgHoverSrc}_s5.jpg?f=m 600w, https://www.ikea.com/pl/pl/images/products/${product.imgHoverSrc}_s5.jpg?f=xxs 300w, https://www.ikea.com/pl/pl/images/products/${product.imgHoverSrc}_s5.jpg?f=xxxs 160w, https://www.ikea.com/pl/pl/images/products/${product.imgHoverSrc}_s5.jpg?f=u 80w`}
                          sizes="(max-width: 400px) 80px, (max-width: 1450px) 160px, 300px"
                          alt="Zdjęcie produktu pokazujące jego wykorzystanie"
                          className="modal__thumbnail-img-hover"
                        />
                      </div>
                      {product.topSellerTag && <strong className="top-seller">Top Seller</strong>}
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
                          className="modal__product-last-price-tag"
                        />
                      )}
                      {product.rating && <RatingBlock rating={product.rating} />}
                    </div>

                    <div className="modal__product-btns-wrapper">
                      <Btn
                        variant="blue"
                        shape="circle"
                      >
                        <span className="visually-hidden">Dodaj produkt do koszyka</span>
                        <ShoppingCartAddIcon />
                      </Btn>
                      <Btn
                        variant="light-with-border"
                        shape="circle"
                      >
                        <span className="visually-hidden">Dodaj do ulubionych</span>
                        <HeartIcon />
                      </Btn>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </dialog>
  );
}

export const ImgModalWithProducts = forwardRef(InnerComponent);
