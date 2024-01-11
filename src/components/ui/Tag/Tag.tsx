// Components
import Collection from "../../../compoundComponents/CollectionProducts/layout/Collection";
// Types
import type { TextVariants } from "../../../types/colorsVariantsType";
// Style
import "./index.scss";

// Define the type for the Tag props
type TagPropsType = {
  children: string; // The content of the tag
  variant?: TextVariants; // The variant of the tag
  className?: string; // Optional additional CSS classes
};

/**
 * Tag component
 *
 * This component displays a tag with a specified variant and optional additional CSS classes.
 *
 * @param children - The content of the tag.
 * @param variant - The variant of the tag.
 * @param className - Optional additional CSS classes.
 *
 * @returns A Collection.ListItemTag element with the specified variant and content, and any additional CSS classes.
 */
export default function Tag({
  children,
  variant = "black",
  className,
}: TagPropsType) {
  return (
    <Collection.ListItemTag
      variant={variant} // Set the variant
      className={`product-tag${className ? ` ${className}` : ""}`} // Construct the className from the "product-tag" class and any additional classes
    >
      {children}
    </Collection.ListItemTag>
  );
}
