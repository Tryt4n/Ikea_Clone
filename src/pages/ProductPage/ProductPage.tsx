// React
import { useEffect } from "react";
// react-router-dom
import { useParams, useNavigate } from "react-router-dom";
// Custom Hooks
import useFetch from "../../hooks/useFetch";
// Icons
import HeartIcon from "../../Icons/HeartIcon";
// Style
import "./index.scss";

type ProductDataType = {
  collection: string;
  name: string;
  productNumber: string;
  size: string;
  price: {
    integer: number;
    decimal?: number;
    quantity?: number;
    sizeInMeters?: number;
  };
  variants: string[];
  variant: string;
  relatedProducts?: Record<string, string>;
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

  const { data, isError } = useFetch<ProductDataType>(URL);
  console.log(data);

  useEffect(() => {
    console.log(data);

    if (isError) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {data && (
        <div className="product">
          <div className="product__images-container">
            {Object.keys(data.images).map((key) => {
              const imgUrl = `https://www.ikea.com/pl/pl/images/products/${path.collection}-${data.name}-${data.variant}__${data.images[key]}`;

              return (
                <button
                  key={key}
                  className="product__img-btn"
                >
                  <img
                    src={`${imgUrl}?f=s`}
                    srcSet={`${imgUrl}?f=xl 750w, ${imgUrl}?f=l 700w, ${imgUrl}?f=m 600w, ${imgUrl}?f=s 500w, ${imgUrl}?f=xs 400w, ${imgUrl}?f=xxs 300w, ${imgUrl}?f=xxxs 160w`}
                    sizes="(max-width: 900px) 100vw, (max-width: 1200px) 160px, (max-width: 1400px) 300px, (max-width: 1700px) 400px, 500px"
                    alt=""
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>

          <div className="product__buy-module">
            <h2 className="">
              <strong>{data.collection}</strong>
              <br />
              <span>
                {data.name}, {data.variant}
                {data.size !== "universal" ? `, ${data.size}` : ""}
              </span>
            </h2>
            <button>
              <span className="visually-hidden">Dodaj do ulubionych</span>
              <HeartIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
