// React
import { useEffect } from "react";
// react-router-dom
import { useNavigate } from "react-router-dom";
// Hooks
import useFetch from "../../hooks/useFetch";
import useProduct from "./context/useProduct";
// Layout
import ProductImageGallery from "../../layout/BuyModule/components/ProductImageGallery/ProductImageGallery";
import BuyModule from "../../layout/BuyModule/BuyModule";
// Style
import "./index.scss";

export type ProductDataType = {
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
  const { path, URL, setDisplayedMainImg } = useProduct();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetch<ProductDataType>(URL);

  useEffect(() => {
    console.log(data);
    if (data) {
      setDisplayedMainImg(
        `https://www.ikea.com/pl/pl/images/products/${path.collection}-${data.name}-${data.variant}__${data.images.main}`
      );
    }

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
              <ProductImageGallery data={data} />

              <BuyModule data={data} />
            </article>
          )}
        </>
      )}
    </>
  );
}
