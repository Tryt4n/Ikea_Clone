import "./index.scss";

export default function LoadingSpinner() {
  return (
    <div
      className="loading-spinner-wrapper"
      role="presentation"
      aria-hidden="true"
    >
      <span className="loading-spinner" />
    </div>
  );
}
