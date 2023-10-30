// React
import { ForwardedRef, forwardRef } from "react";
// Components
import Article from "../../compoundComponents/Article/Article";
import CollectionProductsList from "../../layout/Articles/components/CollectionProductsList/CollectionProductsList";
// Types
import { CardCollectionType } from "../../layout/Articles/components/ImageCardCollection/ImageCardCollection";
// Icons
import CloseIcon from "../../Icons/CloseIcon";
// Style
import "./index.scss";

type DialogPropsType = {
  id: string;
  closeModal: () => void;
  onClickFunction: (e: React.MouseEvent<HTMLDialogElement>) => void;
  onKeyDownFunction: (e: React.KeyboardEvent<HTMLDialogElement>) => void;
  modalData: CardCollectionType | undefined;
};

function InnerComponent(
  { id, closeModal, onClickFunction, onKeyDownFunction, modalData }: DialogPropsType,
  ref: ForwardedRef<HTMLDialogElement>
) {
  return (
    <dialog
      id={id}
      ref={ref}
      onClick={onClickFunction}
      onKeyDown={onKeyDownFunction}
      className="modal"
    >
      <div className="modal__header">
        <span className="modal__heading">Wasze wnętrza</span>
        <button
          type="button"
          onClick={closeModal}
          autoFocus
        >
          <span className="visually-hidden">Zamknij</span>
          <CloseIcon />
        </button>
      </div>

      <div className="modal__main-content">
        <div className="modal__img-container">
          <img
            src={modalData?.img.imgSrc}
            alt={modalData?.img.imgAlt}
            className={
              modalData ? `aspect-ratio-${modalData.img.imgAspectRatio.replace("/", "-")}` : ""
            }
          />
          {modalData && <CollectionProductsList products={modalData?.products} />}
          {modalData?.instagramUser && (
            <Article.InstagramBadge>{modalData.instagramUser}</Article.InstagramBadge>
          )}
        </div>
        <ul>
          {modalData?.products.map((product) => (
            <li key={product.id}>{product.productHeading}</li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}

export const ImgModalWithProducts = forwardRef(InnerComponent);
