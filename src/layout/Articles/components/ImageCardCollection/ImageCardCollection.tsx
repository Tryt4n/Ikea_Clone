// Custom Hooks
import useModal from "../../../../hooks/useModal";
// Components
import Article from "../../../../compoundComponents/Article/Article";
import CollectionProductsList from "../CollectionProductsList/CollectionProductsList";
// Types
import type { AspectRatioType } from "../../../../types/articleTypes";
import type { ProductType } from "../CollectionProductsList/CollectionProductsList";

export type ImageCardCollectionType = {
  card: CardCollectionType;
  onHoverStatus?: boolean;
  hideTooltips?: boolean;
};

export type CardCollectionType = {
  id: string;
  img: {
    imgSrc: string;
    imgSrcSet: string;
    imgAlt: string;
    imgAspectRatio: AspectRatioType;
  };
  instagramUser?: string;
  favoriteIcon?: boolean;
  addToWishlistIcon?: boolean;
  products: ProductType[];
};

export default function ImageCardCollection({
  card,
  onHoverStatus,
  hideTooltips,
}: ImageCardCollectionType) {
  const { modalID, setModalData } = useModal();

  const { id, img, instagramUser, products, addToWishlistIcon } = card;

  function checkIfIsListItem(element: HTMLElement) {
    if (element.tagName === "LI" || element.tagName === "BUTTON") {
      return true;
    } else {
      if (element.parentNode as HTMLElement) {
        return checkIfIsListItem(element.parentNode as HTMLElement);
      }
    }
    return false;
  }

  function openImageModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const isListItem = !hideTooltips ? checkIfIsListItem(e.target as HTMLElement) : false;

    if (isListItem) return;

    setModalData({
      type: "image-with-products",
      productsData: card,
    });
  }

  return (
    <Article.Section
      key={id}
      aria-controls={modalID}
      onClick={(e) => openImageModal(e)}
    >
      <Article.ImgContainer>
        <Article.Img
          src={img.imgSrc}
          srcSet={img.imgSrcSet}
          alt={img.imgAlt}
          aspectRatio={img.imgAspectRatio}
          sizes="(min-width: 1824px) 508.333px, (min-width: 1200px) calc(((100vw - (2.8125rem + 3.125rem)) - (((100vw - (2.8125rem + 3.125rem)) / 13) + 1.25rem))/3 - (1.25rem / 2)), (min-width: 900px) calc(33.333vw - ((1.25rem * 2) / 3) - ((3.125rem * 2) / 3)), (min-width: 600px) calc((100vw - 3.75rem - (0.9375rem * 2)) / 3), calc(50vw - 2.5rem + (0.625rem))"
        />
        {instagramUser && (
          <Article.InstagramBadge nickVisible={false}>{instagramUser}</Article.InstagramBadge>
        )}
        {addToWishlistIcon && <Article.WishListBadge />}

        <CollectionProductsList
          products={products}
          onHoverStatus={onHoverStatus}
          hideTooltips={hideTooltips}
        />
      </Article.ImgContainer>
    </Article.Section>
  );
}
