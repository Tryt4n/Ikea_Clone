// Custom Hooks
import useModal from "../../../../hooks/useModal";
import useApp from "../../../../hooks/useApp";
import useWindowSize from "../../../../hooks/useWindowSize";
// Compound Components
import Article from "../../../../compoundComponents/Article/Article";
import Collection from "../../../../compoundComponents/CollectionProducts/components/Collection";
import CollectionProductsList from "../../../../layout/Articles/components/CollectionProductsList/CollectionProductsList";
// Components
import Btn from "../../../../components/Btn/Btn";
import RatingBlock from "../../../../components/RatingBlock/RatingBlock";
import AddToWishListBtn from "../../../../components/AddToWishListBtn/AddToWishListBtn";
// Types
import type { ProductType } from "../../../../layout/Articles/components/CollectionProductsList/CollectionProductsList";
import type { ModalImageWithProductsType } from "../../../../pages/ProductPage/types/ModalTypes";
import type { ProductDataType } from "../../../../pages/ProductPage/types/ProductDataType";
// Constants
import { productLink as imageLink } from "../../../../constants/links";
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";
import InstagramIcon from "../../../../Icons/InstagramIcon";
import ShoppingCartAddIcon from "../../../../Icons/ShoppingCartAddIcon";
// Style
import "./index.scss";

type extendedProductType = ProductType & {
  imgSrc?: string;
  imgHoverSrc?: string;
  rating?: {
    rate: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
    quantity: number;
  };
};

export type ImageWithProductsPropsType = {
  data: ModalImageWithProductsType;
};

export default function ImageWithProducts({ data }: ImageWithProductsPropsType) {
  const { closeModal } = useModal();
  const { dispatch } = useApp();
  const { width, height } = useWindowSize();

  const { productsData } = data;

  function addToShoppingCart(productLink: string) {
    const URL = `https://tryt4n.github.io/Ikea-data/server/${productLink}/data.json`;

    fetch(URL)
      .then((res) => res.json())
      .then((fetchedData: ProductDataType) => {
        const {
          productNumber,
          collection,
          name,
          nameToDisplay,
          variant,
          variantName,
          size,
          price,
          oldPriceTag,
          images,
        } = fetchedData;

        dispatch({
          type: "addToShoppingCart",
          payload: {
            quantity: 1,
            productNumber,
            collection,
            name,
            nameToDisplay,
            variant,
            variantName,
            size,
            price,
            oldPrice: oldPriceTag,
            images,
            productLink,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <>
      <header className="image-with-products-modal__header">
        <h2 className="image-with-products-modal__heading">Wasze wnętrza</h2>
        <Btn
          variant="light"
          shape="circle"
          type="button"
          onClick={closeModal}
        >
          <span className="visually-hidden">Zamknij</span>
          <CloseIcon />
        </Btn>
      </header>

      {(width < 1000 || height < 700) && productsData.instagramUser && (
        <div className="image-with-products-modal__instagram-nick-mobile">
          <InstagramIcon />
          <span>{productsData.instagramUser}</span>
        </div>
      )}

      <div className="image-with-products-modal__main-content">
        {width >= 1000 && height >= 700 && (
          <Article.ImgContainer className="image-with-products-modal__img-inner-wrapper">
            <Article.Img
              src={productsData.img.imgSrc}
              srcSet={productsData.img.imgSrcSet}
              alt={productsData.img.imgAlt}
              aspectRatio={productsData.img.imgAspectRatio}
              sizes="(min-width: 900px) 50vw, (max-width: 900px) 100vw, 100vw"
            />
            <CollectionProductsList products={productsData.products} />
            {productsData.instagramUser && (
              <Article.InstagramBadge>{productsData.instagramUser}</Article.InstagramBadge>
            )}
          </Article.ImgContainer>
        )}

        <ul className="image-with-products-modal__products-list">
          {productsData.products.map((product: extendedProductType) => {
            const {
              id,
              productLink,
              productHeading,
              productSubHeading,
              topSellerTag,
              newPriceTag,
              productPriceInteger,
              productQuantity,
              productSizeInMeters,
              imgHoverSrc,
              imgSrc,
              productPriceDecimal,
              rating,
            } = product;

            const mainImgSrc = `${imageLink}/${imgSrc}_s5.jpg?f=xxs`;
            const mainImgSrcSet = `${imageLink}/${imgSrc}_s5.jpg?f=m 600w, ${imageLink}/${imgSrc}_s5.jpg?f=xxs 300w, ${imageLink}/${imgSrc}_s5.jpg?f=xxxs 160w, ${imageLink}/${imgSrc}_s5.jpg?f=u 80w`;
            const hoverImgSrc = `${imageLink}/${imgHoverSrc}_s5.jpg?f=xxs`;
            const hoverImgSrcSet = `${imageLink}/${imgHoverSrc}_s5.jpg?f=m 600w, ${imageLink}/${imgHoverSrc}_s5.jpg?f=xxs 300w, ${imageLink}/${imgHoverSrc}_s5.jpg?f=xxxs 160w, ${imageLink}/${imgHoverSrc}_s5.jpg?f=u 80w`;
            const imgSizes = "(max-width: 400px) 80px, (max-width: 1450px) 160px, 300px";

            return (
              <li key={id}>
                <a
                  href={productLink}
                  className="image-with-products-modal__product"
                >
                  <div className="image-with-products-modal__product-img-container">
                    <div className="image-with-products-modal__thumbnail-wrapper">
                      <img
                        src={mainImgSrc}
                        srcSet={mainImgSrcSet}
                        sizes={imgSizes}
                        alt={`${productHeading} ${productSubHeading}`}
                        className="image-with-products-modal__thumbnail-img"
                      />
                      <img
                        src={hoverImgSrc}
                        srcSet={hoverImgSrcSet}
                        sizes={imgSizes}
                        alt="Zdjęcie produktu pokazujące jego wykorzystanie"
                        className="image-with-products-modal__thumbnail-img-hover"
                      />
                    </div>

                    {topSellerTag && <strong className="top-seller">Top Seller</strong>}
                  </div>

                  <div className="image-with-products-modal__product-text-wrapper">
                    {newPriceTag && (
                      <em className="image-with-products-modal__product-new-price-tag">
                        Nowa niższa cena
                      </em>
                    )}

                    <strong className="image-with-products-modal__product-heading">
                      {productHeading}
                    </strong>
                    <p className="image-with-products-modal__product-subheading">
                      {productSubHeading}
                    </p>

                    <Collection.ListItemPrice
                      price={productPriceInteger}
                      priceDecimal={productPriceDecimal}
                      quantity={productQuantity}
                      sizeInMeters={productSizeInMeters}
                    />

                    {newPriceTag && (
                      <Collection.ListItemLastPriceDescription
                        lastPrice={newPriceTag.lastItemPriceInteger}
                        lastPriceDecimal={newPriceTag.lastItemPriceDecimal}
                        className="image-with-products-modal__product-last-price-tag"
                      />
                    )}

                    {rating && <RatingBlock rating={rating} />}
                  </div>

                  <div className="image-with-products-modal__product-btns-wrapper">
                    <Btn
                      variant="blue"
                      shape="circle"
                      type="button"
                      // onClick={() => addToShoppingCart(productLink)}
                      onClick={(e) => {
                        e.preventDefault();
                        addToShoppingCart(productLink);
                      }}
                    >
                      <span className="visually-hidden">Dodaj produkt do koszyka</span>
                      <ShoppingCartAddIcon />
                    </Btn>
                    <AddToWishListBtn variant="light-with-border" />
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
