import LoadingSpinner from "../LazyLoadLoadingSpinner/LoadingSpinner";
import "./index.scss";

export default function PageLoadingSpinner() {
  return (
    <div className="page-loading-spinner">
      <div className="page-loading-spinner__spinner-wrapper">
        <h2 className="visually-hidden">Ładowanie strony</h2>
        <LoadingSpinner />
      </div>
    </div>
  );
}
