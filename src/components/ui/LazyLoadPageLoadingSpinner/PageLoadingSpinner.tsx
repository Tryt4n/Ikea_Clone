import LoadingSpinner from "../LazyLoadLoadingSpinner/LoadingSpinner";
import "./index.scss";

export default function PageLoadingSpinner() {
  return (
    <div className="page-loading-spinner">
      <h2 className="visually-hidden">Loading</h2>
      <LoadingSpinner />
    </div>
  );
}
