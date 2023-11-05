// React
import { useEffect } from "react";
// react-router-dom
import { useParams, useNavigate, Link } from "react-router-dom";
// Custom Hooks
import useFetch from "../../hooks/useFetch";
// Components
import Btn from "../../components/Btn/Btn";
// Icons
import HeartIcon from "../../Icons/HeartIcon";
// Style
import "./index.scss";
import Collection from "../../compoundComponents/CollectionProducts/components/Collection";
import RatingBlock from "../../components/RatingBlock/RatingBlock";
import ChevronRightSmall from "../../Icons/ChevronRightSmall";

type ProductDataType = {
  collection: string;
  name: string;
  nameToDisplay: string;
  productNumber: string;
  size: string;
  price: {
    integer: number;
    decimal?: number;
    quantity?: number;
    sizeInMeters?: number;
  };
  variants: string[];
  variantsName: string[];
  variant: string;
  variantName: string;
  relatedProducts?: {
    sizes?: Record<string, string>;
    variants?: Record<string, string>;
  };
  description: string;
  rating?: {
    rate: number;
    quantity: number;
  };
  topSeller?: boolean;
  guarantee?: boolean;
  thumbnails: Record<string, string>;
  images: Record<string, string>;
  additionalInfo?: {
    history?: {
      sections: {
        header: string;
        description: string;
      }[];
    };
    material: {
      header: string;
      description: string;
    };
  };
};

export default function ProductPage() {
  const path = useParams();
  const URL = `https://tryt4n.github.io/Ikea-data/server/products/${path.collection}/${path.product}/${path.type}/${path.productID}/data.json`;

  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetch<ProductDataType>(URL);

  useEffect(() => {
    console.log(data);

    if (isError) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {isLoading && !isError ? (
        <div className="message-container">
          <h2 className="visually-hidden">Loading</h2>
          <span
            className="loading-spinner"
            role="presentation"
            aria-hidden="true"
          />
        </div>
      ) : isError ? (
        <div className="message-container">
          <h2 className="message message--error">
            <strong>Nie można załadować strony!</strong> Spróbuj ponownie.
          </h2>
          <button onClick={() => window.location.reload()}>
            Naciśnij aby załadować stronę jeszcze raz
          </button>
        </div>
      ) : (
        <>
          {data && (
            <article className="product">
              <h2 className="visually-hidden">Produkt</h2>
              <section className="product__images-container">
                <h3 className="visually-hidden">Galeria zdjęć</h3>
                {Object.keys(data.images).map((key, index) => {
                  const imgUrl = `https://www.ikea.com/pl/pl/images/products/${path.collection}-${data.name}-${data.variant}__${data.images[key]}`;
                  const imgSrc = `${imgUrl}?f=s`;
                  const imgSrcSet = `${imgUrl}?f=xl 750w, ${imgUrl}?f=l 700w, ${imgUrl}?f=m 600w, ${imgUrl}?f=s 500w, ${imgUrl}?f=xs 400w, ${imgUrl}?f=xxs 300w, ${imgUrl}?f=xxxs 160w`;
                  const imgSizes =
                    "(max-width: 900px) 100vw, (max-width: 1200px) 160px, (max-width: 1400px) 300px, (max-width: 1700px) 400px, 500px";

                  return (
                    <button
                      key={key}
                      className="product__img-btn"
                    >
                      <img
                        src={imgSrc}
                        srcSet={imgSrcSet}
                        sizes={imgSizes}
                        alt=""
                        loading="lazy"
                      />
                      {data.topSeller && index === 0 && (
                        <strong className="top-seller">Top Seller</strong>
                      )}
                    </button>
                  );
                })}
              </section>

              <section className="buy-module">
                <div className="buy-module__header">
                  <h3>
                    <strong>{data.collection}</strong>&nbsp;
                    <br />
                    <span>
                      {data.nameToDisplay}, {data.variantName}
                      {data.size !== "universal" && (
                        <>
                          , &nbsp;
                          <button>{data.size}</button>
                        </>
                      )}
                    </span>
                  </h3>
                  <Btn
                    variant="light"
                    shape="circle"
                  >
                    <span className="visually-hidden">Dodaj do ulubionych</span>
                    <HeartIcon />
                  </Btn>
                </div>

                <Collection.ListItemPrice
                  price={data.price.integer}
                  priceDecimal={data.price.decimal}
                  quantity={data.price.quantity}
                  sizeInMeters={data.price.sizeInMeters}
                />

                {data.rating && <RatingBlock rating={data.rating} />}

                {data.variants.length > 1 && (
                  <div>
                    <button>
                      <div>
                        <span>Wybierz kolor</span>
                        <span>{data.variantName}</span>
                      </div>
                      <ChevronRightSmall />
                    </button>

                    <div>
                      {data.variants.map((variant, index) => {
                        const href =
                          data.relatedProducts?.variants &&
                          `/products/${path.collection}/${path.product}/${variant}/${
                            data.relatedProducts.variants[
                              Object.keys(data.relatedProducts.variants)[index]
                            ]
                          }`;
                        const URL = `https://www.ikea.com/pl/pl/images/products/${
                          path.collection
                        }-${data.name}-${variant}__${
                          data.thumbnails[Object.keys(data.thumbnails)[index]]
                        }`;
                        const imgSrc = `${URL}?f=xu`;
                        const imgSrcSet = `${URL}?f=u 2x, ${URL}?f=xu`;
                        const imgAlt = `${data.collection} ${data.name}, ${data.variant}${
                          data.size !== "universal" ? `, ${data.size}` : ""
                        }`;

                        return (
                          <Link
                            key={variant}
                            to={href && path.type !== variant ? href : ""}
                          >
                            <img
                              src={imgSrc}
                              srcSet={imgSrcSet}
                              alt={imgAlt}
                              loading="lazy"
                            />
                            <span className="visually-hidden">{imgAlt}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                <hr />

                {data.relatedProducts?.sizes && (
                  <button>
                    <div>
                      <span>Wybierz rozmiar</span>
                      <span>{data.size}</span>
                    </div>
                    <ChevronRightSmall />
                  </button>
                )}
              </section>
            </article>
          )}
        </>
      )}
    </>
  );
}
