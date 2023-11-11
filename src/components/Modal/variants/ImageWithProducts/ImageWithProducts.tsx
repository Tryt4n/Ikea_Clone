// Hooks
import Article from "../../../../compoundComponents/Article/Article";
import useModal from "../../../../hooks/useModal";
import useWindowSize from "../../../../hooks/useWindowSize";
// Compound Components
import Collection from "../../../../compoundComponents/CollectionProducts/components/Collection";
import CollectionProductsList, {
  ProductType,
} from "../../../../layout/Articles/components/CollectionProductsList/CollectionProductsList";
// Components
import Btn from "../../../Btn/Btn";
import RatingBlock from "../../../RatingBlock/RatingBlock";
// Types
import { ModalImageWithProductsType } from "../../../../pages/ProductPage/types/ModalTypes";
// Icons
import CloseIcon from "../../../../Icons/CloseIcon";
import HeartIcon from "../../../../Icons/HeartIcon";
import InstagramIcon from "../../../../Icons/InstagramIcon";
import ShoppingCartAddIcon from "../../../../Icons/ShoppingCartAddIcon";

type extendedProductType = ProductType & {
  imgSrc?: string;
  imgHoverSrc?: string;
  rating?: {
    rate: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
    quantity: number;
  };
};

export default function ImageWithProducts({ data }: { data: ModalImageWithProductsType }) {
  const { closeModal } = useModal();
  const { width, height } = useWindowSize();

  const { productsData } = data;

  return (
    <>
      <div className="image-with-products-modal__header">
        <h2 className="image-with-products-modal__heading">Wasze wnętrza</h2>
        <button
          type="button"
          onClick={closeModal}
        >
          <span className="visually-hidden">Zamknij</span>
          <CloseIcon />
        </button>
      </div>
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
          {productsData.products.map((product: extendedProductType) => (
            <li key={product.id}>
              <a
                href={product.productLink}
                className="image-with-products-modal__product"
              >
                <div className="image-with-products-modal__product-img-container">
                  <div className="image-with-products-modal__thumbnail-wrapper">
                    <img
                      src={`https://www.ikea.com/pl/pl/images/products/${product.imgSrc}_s5.jpg?f=xxs`}
                      srcSet={`https://www.ikea.com/pl/pl/images/products/${product.imgSrc}_s5.jpg?f=m 600w, https://www.ikea.com/pl/pl/images/products/${product.imgSrc}_s5.jpg?f=xxs 300w, https://www.ikea.com/pl/pl/images/products/${product.imgSrc}_s5.jpg?f=xxxs 160w, https://www.ikea.com/pl/pl/images/products/${product.imgSrc}_s5.jpg?f=u 80w`}
                      sizes="(max-width: 400px) 80px, (max-width: 1450px) 160px, 300px"
                      alt={`${product.productHeading} ${product.productSubHeading}`}
                      className="image-with-products-modal__thumbnail-img"
                    />
                    <img
                      src={`https://www.ikea.com/pl/pl/images/products/${product.imgHoverSrc}_s5.jpg?f=xxs`}
                      srcSet={`https://www.ikea.com/pl/pl/images/products/${product.imgHoverSrc}_s5.jpg?f=m 600w, https://www.ikea.com/pl/pl/images/products/${product.imgHoverSrc}_s5.jpg?f=xxs 300w, https://www.ikea.com/pl/pl/images/products/${product.imgHoverSrc}_s5.jpg?f=xxxs 160w, https://www.ikea.com/pl/pl/images/products/${product.imgHoverSrc}_s5.jpg?f=u 80w`}
                      sizes="(max-width: 400px) 80px, (max-width: 1450px) 160px, 300px"
                      alt="Zdjęcie produktu pokazujące jego wykorzystanie"
                      className="image-with-products-modal__thumbnail-img-hover"
                    />
                  </div>
                  {product.topSellerTag && <strong className="top-seller">Top Seller</strong>}
                </div>

                <div className="image-with-products-modal__product-text-wrapper">
                  {product.newPriceTag && (
                    <em className="image-with-products-modal__product-new-price-tag">
                      Nowa niższa cena
                    </em>
                  )}
                  <strong className="image-with-products-modal__product-heading">
                    {product.productHeading}
                  </strong>
                  <p className="image-with-products-modal__product-subheading">
                    {product.productSubHeading}
                  </p>
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
                      className="image-with-products-modal__product-last-price-tag"
                    />
                  )}
                  {product.rating && <RatingBlock rating={product.rating} />}
                </div>

                <div className="image-with-products-modal__product-btns-wrapper">
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
  );
}
