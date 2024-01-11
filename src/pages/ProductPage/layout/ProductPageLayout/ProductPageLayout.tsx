// Import react dependencies
import { useEffect } from "react";
// Import react-router-dom dependencies
import { useNavigate } from "react-router-dom";
// Import custom hooks
import useFetch from "../../../../hooks/useFetch/useFetch";
import useProduct from "../../context/useProduct";
// Import layout components
import ProductImageGallery from "../ProductImageGallery/ProductImageGallery";
import BuyModule from "../BuyModule/BuyModule";
import ProductInformations from "../ProductInformations/ProductInformations";
// Import components
import LoadingSpinner from "../../../../components/ui/LazyLoadLoadingSpinner/LoadingSpinner";
// Import types
import type { ProductDataType } from "../../types/ProductDataType";
// Import constants
import { productLink } from "../../../../constants/links";
// Import styles
import "./index.scss";

export default function ProductPageLayout() {
  const { path, URL, setDisplayedMainImg } = useProduct(); // Get the path, URL, and setDisplayedMainImg from the useProduct local custom hook

  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  const { data, isLoading, isError } = useFetch<ProductDataType>(URL); // Get the data, isLoading, and isError from the useFetch custom hook

  useEffect(() => {
    // Set the displayedMainImg if the data is truthy
    if (data) {
      setDisplayedMainImg({
        src: `${productLink}/${path.collection}-${data.name}-${data.variant}__${data.images.main}`,
        variant: data.variant,
      });
    }

    // Navigate to the home page if the data does not exist
    if (isError) {
      navigate("/");
    }
  }, [data, isError, navigate, path.collection, setDisplayedMainImg]);

  return (
    <>
      {/* Render loading spinner if the data is loading and there is no error */}
      {isLoading && !isError ? (
        <div className="message-container">
          <h2 className="visually-hidden">Ładowanie</h2>
          <LoadingSpinner />
        </div>
      ) : // Render error message if there is an error
      isError ? (
        <div className="message-container">
          <h2 className="message message--error">
            <strong>Nie można załadować strony!</strong> Spróbuj ponownie.
          </h2>

          {/* Reload the page if the user clicks the button */}
          <button onClick={() => window.location.reload()}>
            Naciśnij aby załadować stronę jeszcze raz
          </button>
        </div>
      ) : (
        <>
          {/* Render the product page layout if the data are fetched successfully */}
          {data && (
            <article className="product">
              {/* Hide the heading for accessibility and SEO purposes */}
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
