// Import helpers functions
import {
  changeProductQuantity,
  changeProductQuantityInShoppingCart,
  checkIfProductExistsInList,
  createNewList,
  deleteList,
  getEditingList,
  getFromLocalStorage,
  getJSONFromLocalStorage,
  removeProductFromShoppingCart,
  removeProductsFromList,
  removeProductsFromOldList,
  saveFavoriteListsToLocalStorage,
  saveShoppingCartToLocalStorage,
  searchForIndex,
  sortLists,
  updateAddedDateOfProducts,
  updateEditingList,
  updateLastEditDate,
  updateListWithProducts,
  updateShoppingCart,
} from "./helpers";
// Import constants
import { shopsList } from "../../../constants/shopsList";
// Import types
import type {
  ReducerActionsType,
  ReducerStateType,
} from "../types/ReducerTypes";
import type { ShoppingCartType } from "../types/ShoppingCartType";
import type { FavouritesListType } from "../types/FavouritesListType";
import type { ShopType } from "../../../constants/shopsList";

/**
 * The reducer function for the AppContext. It is used to manage the state of the application.
 * It takes the current state and an action, and returns a new state based on the action type.
 * The action can optionally have a payload that is used to update the state.
 *
 * @param {AppStateType} state - The current state of the application.
 * @param {AppActionType} action - The action to be performed. It has a type and optionally a payload.
 * @returns {AppStateType} The new state of the application.
 *
 * @example
 * // Assuming we have a state
 * const state = {
 *   lists: [],
 *   editingList: null,
 *   isEditing: false
 * };
 *
 * // And an action
 * const action = {
 *   type: "ADD_LIST",
 *   payload: { id: 1, name: "List 1" }
 * };
 *
 * // The function will return a new state with the list added
 * const newState = reducer(state, action);
 * console.log(newState); // Outputs: { lists: [{ id: 1, name: "List 1" }], editingList: null, isEditing: false }
 */
export function reducer(state: ReducerStateType, action: ReducerActionsType) {
  const shoppingCart: ShoppingCartType[] = getJSONFromLocalStorage(
    "shoppingCart",
    [],
  ); // Get shopping cart from localStorage (if it exists) or set it to an empty array
  const favouriteListsStorage: FavouritesListType[] = getJSONFromLocalStorage(
    "favouriteLists",
    undefined,
  ); // Get favourite lists from localStorage

  // Switch based on the action type
  switch (action.type) {
    case "setPostalCode":
      localStorage.setItem("postalCode", action.payload); // Save postal code to localStorage

      return {
        ...state,
        postalCode: action.payload, // Save postal code to state
        isPostalCodeErrorMessageVisible: false, // Hide error message if it is visible
      };

    case "showErrorMessage":
      // Show error message
      return {
        ...state,
        isPostalCodeErrorMessageVisible: true, // Set error message visible
        postalCodeErrorMessage: action.payload, // Save error message to state
      };

    case "togglePostalCodeCheckbox": {
      localStorage.setItem(
        "rememberPostalCodeCheckboxStatus",
        action.payload.toString(),
      ); // Save checkbox status to localStorage

      return {
        ...state,
        rememberPostalCodeCheckboxStatus: action.payload, // Save checkbox status to state
      };
    }

    case "deletePostalCode": {
      localStorage.removeItem("postalCode"); // Remove postal code from localStorage

      return {
        ...state,
        postalCode: "", // Set postal code to an empty string in state
      };
    }

    case "chooseShop": {
      localStorage.setItem("chosenShop", action.payload.name); // Save chosen shop to localStorage

      return {
        ...state,
        chosenShop: action.payload, // Save chosen shop to state
      };
    }

    case "addToShoppingCart": {
      const newProducts = action.payload; // Get new products from action payload

      const updatedShoppingCart = updateShoppingCart(shoppingCart, newProducts);

      saveShoppingCartToLocalStorage(updatedShoppingCart); // Save updated shopping cart to localStorage

      return {
        ...state,
        shoppingCart: updatedShoppingCart, // Save updated shopping cart to state
      };
    }

    case "restoreShoppingCart": {
      const oldShoppingCart = action.payload; // Get old shopping cart from action payload

      saveShoppingCartToLocalStorage(oldShoppingCart); // Save old shopping cart to localStorage

      return {
        ...state,
        shoppingCart: oldShoppingCart, // Save old shopping cart to state
      };
    }

    /* v8 ignore next 5 */
    case "addProductByNumber": {
      console.warn(`Should be added product with ${action.payload} number`);

      return state;
    }

    case "changeProductQuantity": {
      const { value, productNumber } = action.payload; // Get value and product number from action payload

      const updatedShoppingCart = changeProductQuantityInShoppingCart(
        shoppingCart,
        value,
        productNumber,
      ); // Change the quantity of the product in the shopping cart

      saveShoppingCartToLocalStorage(updatedShoppingCart); // Save updated shopping cart to localStorage

      return {
        ...state,
        shoppingCart: updatedShoppingCart, // Save updated shopping cart to state
      };
    }

    case "removeProductFromShoppingCart": {
      const productNumber = action.payload; // Get product number from action payload

      const updatedShoppingCart = removeProductFromShoppingCart(
        shoppingCart,
        productNumber,
      ); // Remove the product from the shopping cart

      saveShoppingCartToLocalStorage(updatedShoppingCart); // Save updated shopping cart to localStorage

      return {
        ...state,
        shoppingCart: updatedShoppingCart, // Save updated shopping cart to state
      };
    }

    case "clearShoppingCart": {
      localStorage.removeItem("shoppingCart"); // Remove shopping cart from localStorage

      return {
        ...state,
        shoppingCart: undefined, // Set shopping cart to undefined in state
      };
    }

    case "createNewList": {
      const lists = favouriteListsStorage; // Assign lists to favouriteListsStorage
      const newList = action.payload.list; // Get new list from action payload
      const oldListId = action.payload.oldListId; // Get old list ID from action payload

      // If there are no lists in localStorage, create a new list
      if (!favouriteListsStorage) {
        saveFavoriteListsToLocalStorage([newList]);

        return {
          ...state,
          favouriteLists: [newList], // Save the new list to state
        };
      }

      // For creating a new list for moving products from one list to newly created one
      // If the old list ID exists, find the old list and the new list
      if (oldListId) {
        const oldListIndex = searchForIndex(lists, oldListId, "id"); // Find the old list
        const oldList = { ...lists[oldListIndex] }; // Get a deep copy of the old list

        removeProductsFromOldList(oldList, newList); // Remove products from the old list that are in the new list
        updateAddedDateOfProducts(newList); // Update the added date of the products in the new list to the current date

        updateLastEditDate(oldList); // Update the last edit date of the old list to the current date
        updateLastEditDate(newList); // Update the last edit date of the new list to the current date

        lists[oldListIndex] = oldList; // Replace the old list in the lists array with the modified old list
      }

      const updatedLists = [newList, ...lists]; // Create a new array of lists with the new list

      sortLists(updatedLists); // Sort the lists by the date of the last edit in descending order
      saveFavoriteListsToLocalStorage(updatedLists); // Save updated lists to localStorage

      return {
        ...state,
        favouriteLists: updatedLists, // Save updated lists to state
      };
    }

    case "setEditingList": {
      if (!favouriteListsStorage) return state; // If there are no lists in localStorage, return the current state

      const lists = favouriteListsStorage; // Assign lists to favouriteListsStorage
      const editingList = getEditingList(lists, action.payload.id); // Find the list that is being edited

      return {
        ...state,
        editingList: editingList, // Save the list that is being edited to state
      };
    }

    case "changeListName": {
      if (!favouriteListsStorage) return state; // If there are no lists in localStorage, return the current state

      const editingList: FavouritesListType = {
        ...action.payload, // Get the list from action payload
        lastEdit: new Date(), // Set the last edit date to the current date
      };

      const lists = favouriteListsStorage; // Assign lists to favouriteListsStorage
      const updatedLists = updateEditingList(lists, editingList); // Update the list that is being edited

      // If the list exists, update it
      if (updatedLists) {
        return {
          ...state,
          favouriteLists: updatedLists, // Save updated lists to state
          editingList: undefined, // Set the editing list to undefined in state
        };
      }

      // If the list does not exist, return the current state and set the editing list to undefined
      return {
        ...state,
        editingList: undefined,
      };
    }

    case "deleteList": {
      if (!favouriteListsStorage) return state; // If there are no lists in localStorage, return the current state

      const lists = favouriteListsStorage; // Assign lists to favouriteListsStorage
      const deletingList = action.payload; // Get the list ID from action payload

      const updatedLists = deleteList(lists, deletingList); // Remove the list from the lists

      sortLists(updatedLists); // Sort the lists by the date of the last edit in descending order
      saveFavoriteListsToLocalStorage(updatedLists); // Save updated lists to localStorage

      return {
        ...state,
        favouriteLists: updatedLists, // Save updated lists to state
        editingList: undefined, // Set the editing list to undefined in state
      };
    }

    case "addProductsToList": {
      const lists = favouriteListsStorage; // Assign lists to favouriteListsStorage
      const listId = action.payload.listId; // Get the list ID from action payload

      // If the lists storage or lists do not exist create a new list with passed product
      if (!favouriteListsStorage || lists.length === 0) {
        const newList = createNewList(listId, action.payload.products[0]); // The products array should contain only one product

        return {
          ...state,
          favouriteLists: [newList], // Save the new list to state
        };
      }

      const listIndex = searchForIndex(lists, listId, "id"); // Find the list that the products are being added to

      const products = action.payload.products; // Get products from action payload
      const updatedList = updateListWithProducts(lists[listIndex], products); // Update the list with the products

      lists[listIndex] = updatedList; // Update the list

      sortLists(lists); // Sort the lists by the date of the last edit in descending order
      saveFavoriteListsToLocalStorage(lists); // Save updated lists to localStorage

      return {
        ...state,
        favouriteLists: lists, // Save updated lists to state
      };
    }

    case "deleteProductsFromList": {
      if (!favouriteListsStorage) return state; // If there are no lists in localStorage, return the current state

      const lists = favouriteListsStorage; // Assign lists to favouriteListsStorage
      const listId = action.payload.listId; // Get the list ID from action payload
      const productNumbers = action.payload.productNumbers; // Get product numbers from action payload

      // If lists length is greater than 0, find the list that the products are being deleted from
      if (lists.length > 0) {
        const listIndex = searchForIndex(lists, listId, "id"); // Get the list that the products are being deleted from
        const list = lists[listIndex]; // Get the list that the products are being deleted from

        let updatingList = lists[listIndex].products; // Get the list that the products are being deleted from

        productNumbers.forEach((productNumber) => {
          updatingList = removeProductsFromList(updatingList!, productNumber);
        });

        // Update the list if it exists
        if (listIndex !== -1) {
          list.products = updatingList; // Update the list
          updateLastEditDate(list); // Update the last edit date of the list to the current date

          sortLists(lists); // Sort the lists by the date of the last edit in descending order
          saveFavoriteListsToLocalStorage(lists); // Save updated lists to localStorage
        }

        // Update the favourite lists in state
        return {
          ...state,
          favouriteLists: lists, // Save updated lists to state
        };
      }

      return state; // If lists length is not greater than 0, return the current state
    }

    case "moveProductsFromOneListToAnother": {
      if (!favouriteListsStorage) return state; // If there are no lists in localStorage, return the current state

      const lists = favouriteListsStorage; // Assign lists to favouriteListsStorage

      const products = action.payload.products.map((product) => ({
        ...product,
        addedDate: new Date(),
      })); // Get products from action payload and set the added date to the current date
      const originalListId = action.payload.originalListId; // Get the original list ID from action payload
      const listWhereProductIsMovedID =
        action.payload.listWhereProductIsMovedID; // Get the list ID where the products are being moved to from action payload

      // Find the original list and the list where the products are being moved to
      const originalListIndex = searchForIndex(lists, originalListId, "id");
      const listWhereProductAreMovedIndex = searchForIndex(
        lists,
        listWhereProductIsMovedID,
        "id",
      );

      let originalListProducts = lists[originalListIndex].products; // Get the original list products
      let listWhereProductIsMovedProducts =
        lists[listWhereProductAreMovedIndex].products; // Get the list where the products are being moved to

      // If the original list does not have products, set the products to an empty array
      if (!listWhereProductIsMovedProducts) {
        listWhereProductIsMovedProducts = []; // Set the products to an empty array
        lists[listWhereProductAreMovedIndex].products =
          listWhereProductIsMovedProducts; // Update the list where the products are being moved to
      }

      // If originalListProducts exists, remove the products that are being moved from the original list
      if (originalListProducts) {
        products.forEach((product) => {
          if (!originalListProducts || !listWhereProductIsMovedProducts) return; // If originalListProducts or listWhereProductIsMovedProducts do not exist, return

          // Remove the products that are being moved from the original list
          originalListProducts = removeProductsFromList(
            originalListProducts,
            product.productNumber,
          );

          // Check if the product already exists in the list where the products are being moved to
          const existingProductIndex = checkIfProductExistsInList(
            listWhereProductIsMovedProducts,
            product,
          );

          // If the product already exists in the list where the products are being moved to, increase the quantity of the product and update the addedDate
          if (existingProductIndex !== -1) {
            listWhereProductIsMovedProducts[existingProductIndex].quantity +=
              product.quantity;
            listWhereProductIsMovedProducts[existingProductIndex].addedDate =
              new Date();
          } else {
            // Otherwise, add the product to the list where the products are being moved to
            listWhereProductIsMovedProducts.push(product);
          }
        });

        lists[originalListIndex].products = originalListProducts; // Update the original list products
        updateLastEditDate(lists[originalListIndex]); // Update the last edit date of the original list to the current date
        updateLastEditDate(lists[listWhereProductAreMovedIndex]); // Update the last edit date of the list where products are moved to the current date

        sortLists(lists); // Sort the lists by the date of the last edit in descending order
        saveFavoriteListsToLocalStorage(lists); // Save updated lists to localStorage

        return {
          ...state,
          favouriteLists: lists, // Save updated lists to state
        };
      }

      return state; // If originalListProducts does not exist, return the current state
    }

    case "changeProductQuantityOnList": {
      if (!favouriteListsStorage) return state; // If there are no lists in localStorage, return the current state

      const lists = favouriteListsStorage; // Assign lists to favouriteListsStorage
      const { listId, productNumber, value } = action.payload; // Get list ID, product number and value from action payload

      const listIndex = searchForIndex(lists, listId, "id"); // Find the list that the product is being changed on
      const currentList = lists[listIndex]; // Get the list that the product is being changed on

      const searchedProductIndex = searchForIndex(
        currentList.products!,
        productNumber,
        "productNumber",
      ); // Find the product in the list

      // If the list exists and the product exists in the list, change the product quantity
      if (
        currentList.products &&
        searchedProductIndex !== undefined && // Checking for undefined because it can be 0 and 0 is a valid index
        searchedProductIndex !== -1
      ) {
        changeProductQuantity(
          currentList.products[searchedProductIndex],
          value,
        ); // Change the product quantity

        updateLastEditDate(currentList); // Update the last edit date of the list to the current date
        sortLists(lists); // Sort the lists by the date of the last edit in descending order
        saveFavoriteListsToLocalStorage(lists); // Save updated lists to localStorage

        return {
          ...state,
          favouriteLists: lists, // Save updated lists to state
        };
      }

      return state; // If the list does not exist or the product does not exist in the list, return the current state
    }

    case "loadAppData": {
      // Postal Code
      const postalCodeValue = getFromLocalStorage(
        "postalCode",
        state.postalCode,
      ); // Get postal code from localStorage

      // Postal Code Checkbox
      const postalCodeCheckboxValue =
        getFromLocalStorage(
          "rememberPostalCodeCheckboxStatus",
          state.rememberPostalCodeCheckboxStatus,
        ) === "true"; // Get postal code checkbox status from localStorage

      // Chosen Shop
      const chosenShopStorage = getFromLocalStorage("chosenShop", undefined); // Get chosen shop from localStorage
      let chosenShopValue: ShopType | undefined;
      // If chosen shop exists in localStorage, set chosen shop to the value from localStorage
      if (chosenShopStorage) {
        chosenShopValue = shopsList.find(
          (shop) => shop.name === chosenShopStorage,
        );
      }

      // Shopping Cart
      const shoppingCartValue = getJSONFromLocalStorage("shoppingCart", []); // Get shopping cart from localStorage

      // Lists
      const listsValue = getJSONFromLocalStorage("favouriteLists", []); // Get lists from localStorage
      // If lists exist in localStorage sort them by the date of the last edit in descending order.
      if (listsValue) {
        sortLists(listsValue);
      }

      return {
        ...state,
        postalCode: postalCodeValue, // Save postal code to state
        rememberPostalCodeCheckboxStatus: postalCodeCheckboxValue, // Save postal code checkbox status to state
        chosenShop: chosenShopValue, // Save chosen shop to state
        shoppingCart: shoppingCartValue, // Save shopping cart to state
        favouriteLists: listsValue, // Save lists to state
      };
    }

    case "restoreList": {
      if (!favouriteListsStorage) return state; // If there are no lists in localStorage, return the current state

      const oldList = action.payload; // Get old list from action payload
      const lists = favouriteListsStorage; // Assign lists to favouriteListsStorage

      const listToUpdate = getEditingList(lists, oldList.id); // Find the list that is being edited

      if (listToUpdate) {
        Object.assign(listToUpdate, oldList); // Update the list

        saveFavoriteListsToLocalStorage(lists); // Save all lists back to localStorage
      }

      return {
        ...state,
        favouriteLists: lists, // Save old list to state
      };
    }

    // If the action type does not exist, return the current state
    default:
      throw new Error(
        "A case in reducer function has been specified that does not exist.",
      );
  }
}
