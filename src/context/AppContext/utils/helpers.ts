// Import date-fns dependencies
import compareDesc from "date-fns/compareDesc";
// Import types
import type { FavouritesListType } from "../types/FavouritesListType";
import type { ShoppingCartType } from "../types/ShoppingCartType";

// Define type for the value to change the quantity of a product in functions that change the quantity of a product
type ProductsValueChangeType = number | "subtract" | "add";

/**
 * Sorts an array of lists by the date of the last edit in descending order.
 *
 * @param {FavouritesListType[]} lists - The array of lists to sort.
 * @returns {FavouritesListType[]} The sorted array of lists.
 *
 * @example
 * // Assuming we have an array of lists
 * const lists = [
 *   { name: "List 1", lastEdit: new Date("2022-01-01") },
 *   { name: "List 2", lastEdit: new Date("2022-02-01") },
 *   { name: "List 3", lastEdit: new Date("2022-01-15") }
 * ];
 *
 * // The function will return a new array of lists sorted by the last edit date in descending order
 * const sortedLists = sortLists(lists);
 * console.log(sortedLists); // Outputs: [{ name: "List 2", lastEdit: new Date("2022-02-01") }, { name: "List 3", lastEdit: new Date("2022-01-15") }, { name: "List 1", lastEdit: new Date("2022-01-01") }]
 */
export function sortLists(lists: FavouritesListType[]) {
  return lists.sort((a, b) =>
    /* v8 ignore next */
    compareDesc(new Date(a.lastEdit), new Date(b.lastEdit)),
  );
}

/**
 * Updates the shopping cart with new products. If a product already exists in the shopping cart,
 * its quantity is increased. Otherwise, the product is added to the shopping cart.
 *
 * @param {ShoppingCartType[]} shoppingCart - The current shopping cart.
 * @param {ShoppingCartType[]} newProducts - The new products to be added to the shopping cart.
 * @returns {ShoppingCartType[]} The updated shopping cart.
 *
 * @example
 * // Assuming we have a shopping cart with products
 * const shoppingCart = [
 *   { productNumber: 1, name: "Product 1", quantity: 1 },
 *   { productNumber: 2, name: "Product 2", quantity: 2 }
 * ];
 *
 * // And new products to add
 * const newProducts = [
 *   { productNumber: 1, name: "Product 1", quantity: 1 },
 *   { productNumber: 3, name: "Product 3", quantity: 1 }
 * ];
 *
 * // The function will return a new shopping cart with the new products added and quantities updated
 * const updatedShoppingCart = updateShoppingCart(shoppingCart, newProducts);
 * console.log(updatedShoppingCart); // Outputs: [{ productNumber: 1, name: "Product 1", quantity: 2 }, { productNumber: 2, name: "Product 2", quantity: 2 }, { productNumber: 3, name: "Product 3", quantity: 1 }]
 */
export function updateShoppingCart(
  shoppingCart: ShoppingCartType[],
  newProducts: ShoppingCartType[],
) {
  let updatedShoppingCart = [...shoppingCart]; // Create a copy of the shopping cart

  // Add new products to the shopping cart
  newProducts.forEach((newProduct) => {
    const existingProductIndex = searchForIndex(
      updatedShoppingCart,
      newProduct.productNumber,
      "productNumber",
    ); // Check if the product already exists in the shopping cart

    // If the product already exists in the shopping cart, increase the quantity of the product
    if (existingProductIndex !== -1) {
      updatedShoppingCart[existingProductIndex].quantity += newProduct.quantity;
    } else {
      // Otherwise, add the product to the shopping cart
      updatedShoppingCart = [...updatedShoppingCart, newProduct];
    }
  });

  return updatedShoppingCart;
}

/**
 * Changes the quantity of a product in the shopping cart. If the product exists in the shopping cart,
 * its quantity is changed by {@link changeProductQuantity} function based on the provided value. If the value is a number, the quantity is set to the value.
 * If the value is "add", the quantity is increased by 1. If the value is "subtract", the quantity is decreased by 1.
 * If the product does not exist in the shopping cart, the current shopping cart is returned.
 *
 * @param {ShoppingCartType[]} shoppingCart - The current shopping cart.
 * @param {ProductsValueChangeType} value - The value to change the quantity by.
 * @param {ShoppingCartType["productNumber"]} productNumber - The product number of the product to change the quantity of.
 * @returns {ShoppingCartType[]} The updated shopping cart.
 *
 * @example
 * // Assuming we have a shopping cart with products
 * const shoppingCart = [
 *   { productNumber: 1, name: "Product 1", quantity: 1 },
 *   { productNumber: 2, name: "Product 2", quantity: 2 }
 * ];
 *
 * // And a product number to change quantity
 * const productNumber = 1;
 *
 * // The function will return a new shopping cart with the product's quantity increased by 1
 * const updatedShoppingCart = changeProductQuantityInShoppingCart(shoppingCart, "add", productNumber);
 * console.log(updatedShoppingCart); // Outputs: [{ productNumber: 1, name: "Product 1", quantity: 2 }, { productNumber: 2, name: "Product 2", quantity: 2 }]
 */
export function changeProductQuantityInShoppingCart(
  shoppingCart: ShoppingCartType[],
  value: ProductsValueChangeType,
  productNumber: ShoppingCartType["productNumber"],
) {
  const searchedProductIndex = searchForIndex(
    shoppingCart,
    productNumber,
    "productNumber",
  ); // Find the product in the shopping cart

  // If the product exists in the shopping cart, change its quantity
  if (searchedProductIndex !== -1) {
    const updatedShoppingCart = [...shoppingCart]; // Create a copy of the shopping cart

    changeProductQuantity(updatedShoppingCart[searchedProductIndex], value); // Change the quantity of the product

    return updatedShoppingCart;
  }

  return shoppingCart; // If the product does not exist in the shopping cart, return the current shopping cart
}

/**
 * Removes a product from the shopping cart. If the product exists in the shopping cart, it is removed.
 * If the product does not exist in the shopping cart, the current shopping cart is returned.
 *
 * @param {ShoppingCartType[]} shoppingCart - The current shopping cart.
 * @param {ShoppingCartType["productNumber"]} productNumber - The product number of the product to remove.
 * @returns {ShoppingCartType[]} The updated shopping cart.
 *
 * @example
 * // Assuming we have a shopping cart with products
 * const shoppingCart = [
 *   { productNumber: 1, name: "Product 1" },
 *   { productNumber: 2, name: "Product 2" }
 * ];
 *
 * // And a product number to remove
 * const productNumber = 1;
 *
 * // The function will return a new shopping cart without the product with the specified number
 * const updatedShoppingCart = removeProductFromShoppingCart(shoppingCart, productNumber);
 * console.log(updatedShoppingCart); // Outputs: [{ productNumber: 2, name: "Product 2" }]
 */
export function removeProductFromShoppingCart(
  shoppingCart: ShoppingCartType[],
  productNumber: ShoppingCartType["productNumber"],
) {
  const searchedProductIndex = searchForIndex(
    shoppingCart,
    productNumber,
    "productNumber",
  ); // Find the product in the shopping cart

  // If the product exists in the shopping cart, remove it
  if (searchedProductIndex !== -1) {
    const updatedShoppingCart = [...shoppingCart]; // Create a copy of the shopping cart
    updatedShoppingCart.splice(searchedProductIndex, 1); // Remove the product from the shopping cart

    return updatedShoppingCart;
  }

  return shoppingCart; // If the product does not exist in the shopping cart, return the current shopping cart
}

/**
 * Removes a specific product from the list.
 *
 * @param {ShoppingCartType[]} list - The list of products to update.
 * @param {ShoppingCartType["productNumber"]} productNumber - The product number to remove.
 *
 * @returns {ShoppingCartType[]} - The updated list of products.
 * @example
 * // Assuming we have a list of products
 * const products = [
 *   { productNumber: 1, name: "Product 1" },
 *   { productNumber: 2, name: "Product 2" }
 * ];
 *
 * // And a product number to remove
 * const productNumber = 1;
 *
 * // The function will return a new list without the product with the specified number
 * const updatedProducts = removeProductsFromList(products, productNumber);
 * console.log(updatedProducts); // Outputs: [{ productNumber: 2, name: "Product 2" }]
 */
export function removeProductsFromList(
  list: ShoppingCartType[],
  productNumber: ShoppingCartType["productNumber"],
) {
  return (list = list.filter((p) => p.productNumber !== productNumber));
}

/**
 * Checks if a specific product exists in the list.
 *
 * @param {ShoppingCartType[]} listWhereProductIsMovedProducts - The list of products to check.
 * @param {ShoppingCartType} product - The product to check for.
 *
 * @returns {number} - The index of the product in the list if it exists, -1 otherwise.
 *
 * @example
 * // Assuming we have a list of products
 * const products = [
 *   { productNumber: 1, name: "Product 1" },
 *   { productNumber: 2, name: "Product 2" }
 * ];
 *
 * // And a product to check
 * const product = { productNumber: 1, name: "Product 1" };
 *
 * // The function will return the index of the product in the list
 * const index = checkIfProductExistsInList(products, product);
 * console.log(index); // Outputs: 0
 */
export function checkIfProductExistsInList(
  listWhereProductIsMovedProducts: ShoppingCartType[],
  product: ShoppingCartType,
) {
  return listWhereProductIsMovedProducts.findIndex(
    (existingProduct) =>
      existingProduct.productNumber === product.productNumber,
  );
}

/**
 * Removes products from the old list that are in the new list. If a product in the old list is also in the new list, it is removed from the old list.
 *
 * @param {FavouritesListType} oldList - The old list to remove products from.
 * @param {FavouritesListType} newList - The new list to compare with the old list.
 *
 * @example
 * // Assuming we have an old list of products
 * const oldList = {
 *   name: "Old List",
 *   products: [
 *     { productNumber: 1, name: "Product 1" },
 *     { productNumber: 2, name: "Product 2" }
 *   ]
 * };
 *
 * // And a new list of products
 * const newList = {
 *   name: "New List",
 *   products: [
 *     { productNumber: 1, name: "Product 1" }
 *   ]
 * };
 *
 * // The function will return the old list with the products that are in the new list removed
 * removeProductsFromOldList(oldList, newList);
 * console.log(oldList); // Outputs: { name: "Old List", products: [{ productNumber: 2, name: "Product 2" }] }
 */
export function removeProductsFromOldList(
  oldList: FavouritesListType,
  newList: FavouritesListType,
) {
  if (oldList.products && newList.products) {
    const newProducts = newList.products; // Get new products from the new list

    // Remove the products that are in the new list from the old list
    oldList.products = oldList.products.filter(
      (oldProduct) =>
        !newProducts.some(
          (newProduct) => newProduct.productNumber === oldProduct.productNumber,
        ), // If the product is not in the new list, return true
    );
  }
}

/**
 * Updates the added date of the products in the new list to the current date. If a product in the new list does not have an added date, it is set to the current date.
 *
 * @param {FavouritesListType} newList - The new list to update the added date of the products in.
 * @example
 * // Assuming we have a list with products
 * const list = {
 *   name: "My List",
 *   products: [
 *     { id: 1, name: "Product 1", addedDate: new Date("2022-01-01") },
 *     { id: 2, name: "Product 2" }
 *   ]
 * };
 *
 * // After calling the function, all products will have the addedDate set to the current date
 * updateAddedDateOfProducts(list);
 */
export function updateAddedDateOfProducts(newList: FavouritesListType) {
  if (newList.products) {
    // Set current date to the current date without milliseconds
    const currentDate = new Date();
    currentDate.setMilliseconds(0);

    // For each product change the added date to the current date
    newList.products = newList.products.map((product) => ({
      ...product,
      addedDate: currentDate, // Set the added date to the current date
    }));
  }
}

/**
 * Updates the last edit date of the list to the current date. If the list does not have a last edit date, it is set to the current date.
 *
 * @param {FavouritesListType} list - The list to update the last edit date of.
 *
 * @example
 * // Assuming we have a list
 * const list = {
 *   name: "My List",
 *   lastEdit: new Date("2022-01-01")
 * };
 *
 * // After calling the function, the lastEdit will be set to the current date
 * updateLastEditDate(list);
 * console.log(list); // Outputs: { name: "My List", lastEdit: new Date("current date") }
 */
export function updateLastEditDate(list: FavouritesListType) {
  // Set current date to the current date without milliseconds
  const currentDate = new Date();
  currentDate.setMilliseconds(0);

  list.lastEdit = currentDate; // Set the last edit date in the list to the current date
}

/**
 * Searches for an item in an array based on a specific field.
 * Returns the index of the item in the array if it exists, otherwise returns -1.
 *
 * @param {T[]} array - The array to search in.
 * @param {V} value - The value to search for.
 * @param {keyof T} field - The field to compare with the value.
 * @returns {number} The index of the item in the array if it exists, otherwise -1.
 *
 * @example
 * // Assuming we have an array of objects
 * const array = [
 *   { id: 1, name: "Item 1" },
 *   { id: 2, name: "Item 2" },
 *   { id: 3, name: "Item 3" }
 * ];
 *
 * // And a value to search for
 * const value = 2;
 *
 * // The function will return the index of the object with the id of 2
 * const index = searchForIndex(array, value, "id");
 * console.log(index); // Outputs: 1
 */
export function searchForIndex<T, V>(array: T[], value: V, field: keyof T) {
  return array.findIndex((item) => item[field] === value);
}

/**
 * Saves the shopping cart to localStorage by {@link saveToLocalStorage}.
 *
 * @param {ShoppingCartType[]} shoppingCart - The shopping cart to be saved to localStorage.
 */
export function saveShoppingCartToLocalStorage(
  shoppingCart: ShoppingCartType[],
) {
  if (shoppingCart === null || shoppingCart === undefined) {
    throw new Error(`The shoppingCart value cannot be ${typeof shoppingCart}.`);
  }
  saveToLocalStorage("shoppingCart", shoppingCart);
}

/**
 * Saves the favorite lists to localStorage by {@link saveToLocalStorage}.
 *
 * @param {FavouritesListType[]} favoriteLists - The favorite lists to save to localStorage.
 */
export function saveFavoriteListsToLocalStorage(
  favoriteLists: FavouritesListType[],
) {
  if (favoriteLists === null || favoriteLists === undefined) {
    throw new Error(
      `The favoriteLists value cannot be ${typeof favoriteLists}.`,
    );
  }
  saveToLocalStorage("favouriteLists", favoriteLists);
}

/**
 * Searches for a list that is being edited based on its id.
 * Returns the list if it exists, otherwise returns undefined.
 *
 * @param {FavouritesListType[]} lists - The array of lists to search in.
 * @param {FavouritesListType["id"]} listId - The id of the list to search for.
 * @returns {FavouritesListType | undefined} The list that is being edited if it exists, otherwise undefined.
 *
 * @example
 * // Assuming we have an array of lists
 * const lists = [
 *   { id: 1, name: "List 1", isEditing: false },
 *   { id: 2, name: "List 2", isEditing: true },
 *   { id: 3, name: "List 3", isEditing: false }
 * ];
 *
 * // And an id of the list to search for
 * const listId = 2;
 *
 * // The function will return the list with the id of 2
 * const editingList = getEditingList(lists, listId);
 * console.log(editingList); // Outputs: { id: 2, name: "List 2", isEditing: true }
 */
export function getEditingList(
  lists: FavouritesListType[],
  listId: FavouritesListType["id"],
) {
  return lists.find((list) => list.id === listId);
}

/**
 * Updates a list that is being edited. If the list exists in the array of lists, it is updated.
 * The updated lists are sorted by the date of the last edit in descending order with {@link sortLists} and saved to localStorage by {@link saveFavoriteListsToLocalStorage}.
 *
 * @param {FavouritesListType[]} lists - The array of lists to update.
 * @param {FavouritesListType} editingList - The list that is being edited.
 * @returns {FavouritesListType[] | null} The updated array of lists if the list exists, otherwise null.
 *
 * @example
 * // Assuming we have an array of lists
 * const lists = [
 *   { id: 1, name: "List 1", lastEdit: new Date("2022-01-01") },
 *   { id: 2, name: "List 2", lastEdit: new Date("2022-02-01") },
 *   { id: 3, name: "List 3", lastEdit: new Date("2022-01-15") }
 * ];
 *
 * // And a list that is being edited
 * const editingList = { id: 2, name: "Updated List 2", lastEdit: new Date() };
 *
 * // The function will return a new array of lists with the edited list updated
 * const updatedLists = updateEditingList(lists, editingList);
 * console.log(updatedLists); // Outputs: [{ id: 2, name: "Updated List 2", lastEdit: new Date("current date") }, { id: 3, name: "List 3", lastEdit: new Date("2022-01-15") }, { id: 1, name: "List 1", lastEdit: new Date("2022-01-01") }]
 */
export function updateEditingList(
  lists: FavouritesListType[],
  editingList: FavouritesListType,
) {
  const listIndex = searchForIndex(lists, editingList.id, "id"); // Find the list that is being edited

  // If the list exists, update it
  if (listIndex !== -1) {
    const updatedLists = lists; // Create a copy of the lists
    updatedLists[listIndex] = editingList; // Update the list

    sortLists(updatedLists); // Sort the lists by the date of the last edit in descending order
    saveFavoriteListsToLocalStorage(updatedLists); // Save updated lists to localStorage

    return updatedLists;
  }

  return null;
}

/**
 * Deletes a list from the array of lists based on its id.
 * Returns a new array of lists without the deleted list.
 *
 * @param {FavouritesListType[]} lists - The array of lists to delete from.
 * @param {FavouritesListType["id"]} deletingListId - The id of the list to delete.
 * @returns {FavouritesListType[]} A new array of lists without the deleted list.
 *
 * @example
 * // Assuming we have an array of lists
 * const lists = [
 *   { id: 1, name: "List 1" },
 *   { id: 2, name: "List 2" },
 *   { id: 3, name: "List 3" }
 * ];
 *
 * // And an id of the list to delete
 * const deletingListId = 2;
 *
 * // The function will return a new array of lists without the list with the id of 2
 * const updatedLists = deleteList(lists, deletingListId);
 * console.log(updatedLists); // Outputs: [{ id: 1, name: "List 1" }, { id: 3, name: "List 3" }]
 */
export function deleteList(
  lists: FavouritesListType[],
  deletingListId: FavouritesListType["id"],
) {
  return lists.filter((list) => list.id !== deletingListId);
}

/**
 * Creates a new list with a single product. If the list ID exists, it is used, otherwise a new ID is generated.
 * The new list is saved to localStorage by {@link saveFavoriteListsToLocalStorage}.
 *
 * @param {FavouritesListType["id"]} listId - The id of the list to create.
 * @param {ShoppingCartType} product - The product to add to the new list.
 * @returns {FavouritesListType} The new list.
 *
 * @example
 * // Assuming we have a product
 * const product = { id: 1, name: "Product 1", price: 100 };
 *
 * // The function will create a new list with the product
 * const newList = createNewList(null, product);
 * console.log(newList); // Outputs: { id: "generated id", lastEdit: new Date("current date"), name: "Moja lista", products: [{ id: 1, name: "Product 1", price: 100 }] }
 */
export function createNewList(
  listId: FavouritesListType["id"] | undefined,
  product: ShoppingCartType,
) {
  // Set current date to the current date without milliseconds
  const currentDate = new Date();
  currentDate.setMilliseconds(0);

  const newList: FavouritesListType = {
    id: listId || crypto.randomUUID(), // If the list ID exists, use it, otherwise generate a new ID
    lastEdit: currentDate, // Set the last edit date to the current date
    name: "Moja lista",
    products: [{ ...product, addedDate: currentDate }], // Add products to the new list. The products array should contain only one product
  }; // Create a new list

  saveFavoriteListsToLocalStorage([newList]); // Save the new list to localStorage
  return newList;
}

/**
 * Updates a list with new products. If the list does not have products, an empty array is set.
 * For each product, if it exists in the list, the quantity of the product is increased.
 * Otherwise, the product is added to the list with the added date set to the current date.
 * The last edit date of the list is updated to the current date with {@link updateLastEditDate}.
 *
 * @param {FavouritesListType} list - The list to update.
 * @param {ShoppingCartType[]} products - The products to add to the list.
 * @returns {FavouritesListType} The updated list.
 *
 * @example
 * // Assuming we have a list
 * const list = {
 *   id: 1,
 *   name: "List 1",
 *   lastEdit: new Date("2022-01-01"),
 *   products: [
 *     { productNumber: 1, name: "Product 1", quantity: 1, addedDate: new Date("2022-01-01") }
 *   ]
 * };
 *
 * // And an array of products
 * const products = [
 *   { productNumber: 1, name: "Product 1", quantity: 2 },
 *   { productNumber: 2, name: "Product 2", quantity: 1 }
 * ];
 *
 * // The function will return the list with the updated products
 * const updatedList = updateListWithProducts(list, products);
 * console.log(updatedList); // Outputs: { id: 1, name: "List 1", lastEdit: new Date("current date"), products: [{ productNumber: 1, name: "Product 1", quantity: 3, addedDate: new Date("2022-01-01") }, { productNumber: 2, name: "Product 2", quantity: 1, addedDate: new Date("current date") }] }
 */
export function updateListWithProducts(
  list: FavouritesListType,
  products: ShoppingCartType[],
) {
  const updatedList: FavouritesListType = { ...list }; // Create a copy of the list

  // Set current date to the current date without milliseconds
  const currentDate = new Date();
  currentDate.setMilliseconds(0);

  // Add products to the list
  products.forEach((product) => {
    if (!updatedList.products) updatedList.products = []; // If the list does not have products, set the products to an empty array

    // Check if the list already has the product
    const existingProductIndex = searchForIndex(
      updatedList.products,
      product.productNumber,
      "productNumber",
    ); // Find the product in the list

    // If the product exists in the list, increase the quantity of the product
    if (existingProductIndex !== -1) {
      updatedList.products[existingProductIndex].quantity += product.quantity;
    } else {
      // Otherwise, add the product to the list with the added date set to the current date
      updatedList.products.push({
        ...product,
        addedDate: currentDate, // Set the added date to the current date
      });
    }
  });

  updateLastEditDate(updatedList); // Set the last edit date to the current date
  return updatedList;
}

/**
 * Modifies the quantity of a product in the shopping cart based on the provided value.
 *
 * @param {ShoppingCartType} product - The product whose quantity is to be modified.
 * @param {ProductsValueChangeType} value - The value to be added to the product's quantity. This can be a number which will be set as the new quantity of the product, or a string "add" or "subtract", which will increase or decrease the product's quantity by 1.
 *
 * @example
 * // Sets the product quantity to 5
 * changeProductQuantity(product, 5);
 *
 * @example
 * // Increases the product quantity by 1
 * changeProductQuantity(product, "add");
 *
 * @example
 * // Decreases the product quantity by 1
 * changeProductQuantity(product, "subtract");
 */
export function changeProductQuantity(
  product: ShoppingCartType,
  value: ProductsValueChangeType,
) {
  // If the value is a number, set the quantity to the value
  if (typeof value === "number") {
    product.quantity = value;
  } else {
    // Otherwise, increase or decrease the quantity of the product by 1 depending on the value ("add" or "subtract")
    product.quantity += value === "add" ? 1 : -1;
  }
}

/**
 * Retrieves a value from localStorage. If the value does not exist, it returns the provided default value.
 *
 * @template T - The type of the value to be retrieved.
 * @param {string} key - The key associated with the value in localStorage.
 * @param {T} defaultValue - The default value to return if the key does not exist in localStorage.
 * @returns {string | T}  The value from localStorage if it exists, otherwise the default value.
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T) {
  const storageValue = localStorage.getItem(key);
  return storageValue ? storageValue : defaultValue;
}

/**
 * Retrieves a JSON value from localStorage and parses it. If the value does not exist, it returns the provided default value.
 *
 * @template T - The type of the value to be retrieved.
 * @param {string} key - The key associated with the value in localStorage.
 * @param {T} defaultValue - The default value to return if the key does not exist in localStorage.
 * @returns {Object | T} - The parsed JSON value from localStorage if it exists, otherwise the default value.
 */
export function getJSONFromLocalStorage<T>(key: string, defaultValue: T) {
  const storageValue = localStorage.getItem(key);
  return storageValue ? JSON.parse(storageValue) : defaultValue;
}

/**
 * Saves the data to localStorage. The data is converted to a JSON string before being saved.
 * This is a local function and is used only within this file.
 *
 * @param {string} key - The key under which the data will be saved.
 * @param {T} data - The data to be saved to localStorage.
 */
export function saveToLocalStorage<T>(key: string, data: T) {
  // If the key is null, undefined or an empty string, throw an error
  if (key === null || key === undefined || key === "") {
    throw new Error(
      `The key cannot be ${typeof key === "string" ? "empty string" : typeof key}.`,
    );
  }

  localStorage.setItem(key, JSON.stringify(data));
}
