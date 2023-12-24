// React
import { useEffect } from "react";
// react-router-dom
import { ScrollRestoration, useNavigate } from "react-router-dom";
// Custom Hooks
import useFetch from "../../../../hooks/useFetch";
import useProduct from "../../context/useProduct";
// Layout
import ProductImageGallery from "../ProductImageGallery/ProductImageGallery";
import BuyModule from "../BuyModule/BuyModule";
import ProductInformations from "../ProductInformations/ProductInformations";
// Components
import LoadingSpinner from "../../../../components/ui/LazyLoadLoadingSpinner/LoadingSpinner";
// Types
import type { ProductDataType } from "../../types/ProductDataType";
// Constants
import { productLink } from "../../../../constants/links";
// Style
import "./index.scss";

export default function ProductPageLayout() {
  const { path, URL, setDisplayedMainImg } = useProduct();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetch<ProductDataType>(URL);

  useEffect(() => {
    if (data) {
      setDisplayedMainImg({
        src: `${productLink}/${path.collection}-${data.name}-${data.variant}__${data.images.main}`,
        variant: data.variant,
      });
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
          <LoadingSpinner />
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
              <ScrollRestoration />

              <h2 className="visually-hidden">Strona produktu</h2>

              <div className="product__wrapper">
                <ProductImageGallery data={data} />

                <BuyModule data={data} />

                <ProductInformations data={data} />
              </div>
            </article>
          )}
        </>
      )}
    </>
  );
}
