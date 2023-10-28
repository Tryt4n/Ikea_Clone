import ArrowRightIcon from "../../../Icons/ArrowRightIcon";
import ChevronRightIcon from "../../../Icons/ChevronRightIcon";
import useWindowSize from "../../../hooks/useWindowSize";
import { ListItemTag } from "./Collection";

type CollectionNameContainerPropsType = {
  collectionName: string;
  collectionLink: string;
  isNew?: boolean;
};

export default function CollectionNameContainer({
  collectionName,
  collectionLink,
  isNew,
}: CollectionNameContainerPropsType) {
  const { width } = useWindowSize();

  return (
    <a
      href={collectionLink}
      className="collection-name"
      aria-label="Idź na stronę kolekcji"
    >
      <div className="collection-name__inner-wrapper">
        {isNew && <ListItemTag variant="orange">Nowość</ListItemTag>}
        <strong>Kolekcja {collectionName}</strong>
      </div>
      {width >= 600 ? <ArrowRightIcon /> : <ChevronRightIcon />}
    </a>
  );
}
