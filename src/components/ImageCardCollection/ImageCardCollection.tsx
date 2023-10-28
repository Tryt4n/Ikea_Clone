// Custom Hooks
import useModal from "../../hooks/useModal";
// Types
import { AspectRatioType } from "../../types/articleTypes";
// Components
import Article from "../../compoundComponents/Article/Article";
import CollectionProductsList, {
  ProductType,
} from "../CollectionProductsList/CollectionProductsList";

type ImageCardCollectionType = {
  id: string;
  imgSrc: string;
  imgAlt: string;
  imgAspectRatio: AspectRatioType;
  instagramUser?: string;
  favoriteIcon?: boolean;
  collection: ProductType[];
};

export default function ImageCardCollection({ card }: { card: ImageCardCollectionType }) {
  const { modalId, setIsModalOpen } = useModal();

  const { id, imgSrc, imgAlt, imgAspectRatio, instagramUser, collection } = card;

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
  }

  return (
    <Article.Section
      key={id}
      aria-controls={modalId}
      onClick={(e) => openImageModal(e)}
    >
      <Article.ImgContainer>
        <Article.Img
          src={imgSrc}
          alt={imgAlt}
          aspectRatio={imgAspectRatio}
        />
        {instagramUser && <Article.InstagramBadge>{instagramUser}</Article.InstagramBadge>}

        <CollectionProductsList products={collection} />
      </Article.ImgContainer>
    </Article.Section>
  );
}
