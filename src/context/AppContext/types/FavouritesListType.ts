// Import types
import type { ShoppingCartType } from "./ShoppingCartType";

export type FavouritesListType = {
  id: string;
  name: string;
  lastEdit: Date;
  products?: ShoppingCartType[];
};
