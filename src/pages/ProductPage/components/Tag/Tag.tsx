// Components
import Collection from "../../../../compoundComponents/CollectionProducts/components/Collection";
// Types
import { TextVariants } from "../../../../types/colorsVariantsType";
// Style
import "./index.scss";

type TagPropsType = {
  children: string;
  variant: TextVariants;
};

export default function Tag({ children, variant }: TagPropsType) {
  return (
    <Collection.ListItemTag
      variant={variant}
      className="product-tag"
    >
      {children}
    </Collection.ListItemTag>
  );
}
