// Components
import Collection from "../../../../compoundComponents/CollectionProducts/components/Collection";
// Types
import { TextVariants } from "../../../../types/colorsVariantsType";
// Style
import "./index.scss";

type TagPropsType = {
  children: string;
  variant: TextVariants;
  className?: string;
};

export default function Tag({ children, variant, className }: TagPropsType) {
  return (
    <Collection.ListItemTag
      variant={variant}
      className={`product-tag${className ? ` ${className}` : ""}`}
    >
      {children}
    </Collection.ListItemTag>
  );
}
