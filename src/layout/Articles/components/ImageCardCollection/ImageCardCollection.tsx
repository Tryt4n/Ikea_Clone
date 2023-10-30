// Custom Hooks
import useModal from "../../../../hooks/useModal";
// Types
import { AspectRatioType } from "../../../../types/articleTypes";
// Components
import Article from "../../../../compoundComponents/Article/Article";
import CollectionProductsList, {
  ProductType,
} from "../CollectionProductsList/CollectionProductsList";

export type ImageCardCollectionType = {
  card: CardCollectionType;
  onHoverStatus?: boolean;
};

export type CardCollectionType = {
  id: string;
  img: {
    imgSrc: string;
    imgAlt: string;
    imgAspectRatio: AspectRatioType;
  };
  instagramUser?: string;
  favoriteIcon?: boolean;
  products: ProductType[];
};

export default function ImageCardCollection({ card, onHoverStatus }: ImageCardCollectionType) {
  const { modalId, setIsModalOpen, setModalData } = useModal();

  const { id, img, instagramUser, products } = card;

  function checkIfIsListItem(element: HTMLElement) {
    if (element.tagName === "LI") {
      return true;
    } else {
      if (element.parentNode as HTMLElement) {
        return checkIfIsListItem(element.parentNode as HTMLElement);
      }
    }
    return false;
  }

  function openImageModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const isListItem = checkIfIsListItem(e.target as HTMLElement);

    if (isListItem) return;

    setIsModalOpen(true);
    setModalData(card);
    console.log(card);
  }

  return (
    <Article.Section
      key={id}
      aria-controls={modalId}
      onClick={(e) => openImageModal(e)}
    >
      <Article.ImgContainer>
        <Article.Img
          src={img.imgSrc}
          alt={img.imgAlt}
          aspectRatio={img.imgAspectRatio}
        />
        {instagramUser && (
          <Article.InstagramBadge nickVisible={false}>{instagramUser}</Article.InstagramBadge>
        )}

        <CollectionProductsList
          products={products}
          onHoverStatus={onHoverStatus}
        />
      </Article.ImgContainer>
    </Article.Section>
  );
}
