// Importing the AddToWishListBtn component
import AddToWishListBtn from "../../../../components/ui/AddToWishListBtn/AddToWishListBtn";

/**
 * WishListBadge component
 *
 * This component is a wrapper for the AddToWishListBtn component with the class of "article__wishlist-badge" and the variant of "dark-opaque".
 *
 * @returns An AddToWishListBtn component with the class of "article__wishlist-badge" and the variant of "dark-opaque".
 */

export function WishListBadge() {
  return (
    <AddToWishListBtn
      className="article__wishlist-badge"
      variant="dark-opaque"
      data-testid="article-wishlist-badge"
    />
  );
}
