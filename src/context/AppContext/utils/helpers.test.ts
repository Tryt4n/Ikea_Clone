import { MockInstance, beforeEach, describe, expect, it, vi } from "vitest";
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
  saveToLocalStorage,
  searchForIndex,
  sortLists,
  updateAddedDateOfProducts,
  updateEditingList,
  updateLastEditDate,
  updateListWithProducts,
  updateShoppingCart,
} from "./helpers";
// Utils
import { areDatesEqual } from "../../../setup-test/test-utils";
// Types
import type { FavouritesListType } from "../types/FavouritesListType";
import type { ShoppingCartType } from "../types/ShoppingCartType";
// Constants
import { shoppingCart } from "../../../setup-test/test-constants/shoppingCart";
import { exampleList } from "../../../setup-test/test-constants/exampleList";

describe("AppContext reducer helper functions", () => {
  describe("#sortLists", () => {
    it("should sort an array of lists by the date of the last edit in descending order", () => {
      // Arrange
      const lists = [
        { name: "List 1", lastEdit: new Date("2022-01-01") },
        { name: "List 2", lastEdit: new Date("2022-02-01") },
        { name: "List 3", lastEdit: new Date("2022-01-15") },
      ];

      // Act
      const sortedLists = sortLists(lists as FavouritesListType[]);

      // Assert
      expect(sortedLists).toEqual([
        { name: "List 2", lastEdit: new Date("2022-02-01") },
        { name: "List 3", lastEdit: new Date("2022-01-15") },
        { name: "List 1", lastEdit: new Date("2022-01-01") },
      ]);
    });
  });

  describe("#searchForIndex", () => {
    it("should return the index of the item when it exists and the field matches the value", () => {
      // Arrange
      const array = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
      ];
      const value = 2;
      const field = "id";

      // Act
      const result = searchForIndex(array, value, field);

      // Assert
      expect(result).toBe(1);
    });

    it("should return -1 when the item does not exist in the array", () => {
      // Arrange
      const array = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
      ];
      const value = 4;
      const field = "id";

      // Act
      const result = searchForIndex(array, value, field);

      // Assert
      expect(result).toBe(-1);
    });

    it("should work with an array of objects with different fields", () => {
      // Arrange
      const array = [
        { id: 1, name: "Item 1" },
        { code: "A", description: "Item A" },
        { category: "Food", price: 10.99 },
      ];
      const value = "A";
      const field = "code";

      // Act
      const result = searchForIndex(array, value, field);

      // Assert
      expect(result).toBe(1);
    });

    it("should return -1 when the array is empty", () => {
      // Arrange
      const array: { id: number }[] = [];
      const value = 1;
      const field = "id";

      // Act
      const result = searchForIndex(array, value, field);

      // Assert
      expect(result).toBe(-1);
    });
  });

  describe("#saveToLocalStorage", () => {
    beforeEach(() => {
      // Mock localStorage.setItem
      Storage.prototype.setItem = vi.fn();
    });

    it("should save data to localStorage with a valid key and data", () => {
      // Arrange
      const key = "validKey";
      const data = { name: "John", age: 30 };

      // Act
      saveToLocalStorage(key, data);

      // Assert
      expect(localStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(data),
      );
    });

    it("should save data to localStorage with a valid key and empty data", () => {
      // Arrange
      const key = "validKey";
      const data = {};

      // Act
      saveToLocalStorage(key, data);

      // Assert
      expect(localStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(data),
      );
    });

    it("should save data to localStorage with a valid key and null data", () => {
      // Arrange
      const key = "validKey";
      const data = null;

      // Act
      saveToLocalStorage(key, data);

      // Assert
      expect(localStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(data),
      );
    });

    it("should throw an error if key is null", () => {
      // Arrange
      const key = null;
      const data = { name: "John", age: 30 };

      // Act & Assert
      expect(() => {
        // @ts-expect-error Testing for null
        saveToLocalStorage(key, data);
      }).toThrowError();
    });

    it("should throw an error if key is undefined", () => {
      // Arrange
      const key = undefined;
      const data = { name: "John", age: 30 };

      // Act & Assert
      expect(() => {
        // @ts-expect-error Testing for undefined
        saveToLocalStorage(key, data);
      }).toThrowError();
    });

    it("should throw an error if key is an empty string", () => {
      // Arrange
      const key = "";
      const data = { name: "John", age: 30 };

      // Act & Assert
      expect(() => {
        saveToLocalStorage(key, data);
      }).toThrowError();
    });
  });

  describe("#getFromLocalStorage", () => {
    let getItemMock: MockInstance<[key: string], string | null>;
    beforeEach(() => {
      // Mock localStorage.getItem before each test
      getItemMock = vi.spyOn(Storage.prototype, "getItem");
    });

    it("should retrieve a value from localStorage when it exists", () => {
      // Arrange
      const key = "testKey";
      const defaultValue = "default";

      // Mock localStorage.getItem to return a value
      getItemMock.mockReturnValue("value");

      // Act
      const result = getFromLocalStorage(key, defaultValue);

      // Assert
      expect(result).toBe("value");
    });

    it("should return the default value when the key does not exist in localStorage", () => {
      // Arrange
      const key = "testKey";
      const defaultValue = "default";

      // Mock localStorage.getItem to return null
      getItemMock.mockReturnValue(null);

      // Act
      const result = getFromLocalStorage(key, defaultValue);

      // Assert
      expect(result).toBe(defaultValue);
    });
  });

  describe("#getJSONFromLocalStorage", () => {
    let getItemMock: MockInstance<[key: string], string | null>;
    beforeEach(() => {
      // Mock localStorage.getItem before each test
      getItemMock = vi.spyOn(Storage.prototype, "getItem");
    });

    it("should retrieve and parse a value from localStorage when it exists", () => {
      // Arrange
      const key = "testKey";
      const defaultValue = { default: "value" };

      // Mock localStorage.getItem to return a JSON string
      getItemMock.mockReturnValue(JSON.stringify({ test: "value" }));

      // Act
      const result = getJSONFromLocalStorage(key, defaultValue);

      // Assert
      expect(result).toEqual({ test: "value" });
    });

    it("should return the default value when the key does not exist in localStorage", () => {
      // Arrange
      const key = "testKey";
      const defaultValue = { default: "value" };

      // Mock localStorage.getItem to return null
      getItemMock.mockReturnValue(null);

      // Act
      const result = getJSONFromLocalStorage(key, defaultValue);

      // Assert
      expect(result).toEqual(defaultValue);
    });
  });

  describe("#saveShoppingCartToLocalStorage", () => {
    it("should save non-empty shopping cart to localStorage without errors", () => {
      // Act & Assert
      expect(() => {
        saveShoppingCartToLocalStorage(shoppingCart);
      }).not.toThrow();
    });

    it("should save shopping cart with one item to localStorage without errors", () => {
      // Act & Assert
      expect(() => {
        saveShoppingCartToLocalStorage(shoppingCart);
      }).not.toThrow();
    });

    it("should throw an error if shopping cart parameter is null", () => {
      const shoppingCart = null;

      expect(() => {
        // @ts-expect-error Testing for null
        saveShoppingCartToLocalStorage(shoppingCart);
      }).toThrow();
    });

    it("should throw an error if shopping cart parameter is undefined", () => {
      const shoppingCart = undefined;

      expect(() => {
        // @ts-expect-error Testing for undefined
        saveShoppingCartToLocalStorage(shoppingCart);
      }).toThrow();
    });
  });

  describe("#saveFavoriteListsToLocalStorage", () => {
    const lists = [exampleList, exampleList];

    it("should save non-empty shopping cart to localStorage without errors", () => {
      // Act & Assert
      expect(() => {
        saveFavoriteListsToLocalStorage(lists);
      }).not.toThrow();
    });

    it("should save shopping cart with one item to localStorage without errors", () => {
      // Act & Assert
      expect(() => {
        saveFavoriteListsToLocalStorage(lists);
      }).not.toThrow();
    });

    it("should throw an error if shopping cart parameter is null", () => {
      const lists = null;

      expect(() => {
        // @ts-expect-error Testing for null
        saveFavoriteListsToLocalStorage(lists);
      }).toThrow();
    });

    it("should throw an error if shopping cart parameter is undefined", () => {
      const lists = undefined;

      expect(() => {
        // @ts-expect-error Testing for undefined
        saveFavoriteListsToLocalStorage(lists);
      }).toThrow();
    });
  });

  describe("#changeProductQuantity", () => {
    it("should modify the quantity of a product in the shopping cart when provided with a valid product and a valid value", () => {
      // Arrange
      const product = {
        quantity: 5,
      };
      const value = 3;

      // Act
      changeProductQuantity(product as ShoppingCartType, value);

      // Assert
      expect(product.quantity).toBe(value);
    });

    it('should increase the quantity of a product by 1 when provided with the string "add" as the value', () => {
      // Arrange
      const product = {
        quantity: 5,
      };
      const value = "add";
      const expectedQuantity = product.quantity + 1;

      // Act
      changeProductQuantity(product as ShoppingCartType, value);

      // Assert
      expect(product.quantity).toBe(expectedQuantity);
    });

    it(`should decrease the quantity of a product by 1 when provided with string "subtract" as the value`, () => {
      // Arrange
      const product = {
        quantity: 5,
      };
      const value = "subtract";
      const expectedQuantity = product.quantity - 1;

      // Act
      changeProductQuantity(product as ShoppingCartType, value);

      // Assert
      expect(product.quantity).toBe(expectedQuantity);
    });
  });

  describe("#updateLastEditDate", () => {
    it("should update the last edit date to the current date when called", () => {
      // Arrange
      const list = {
        name: "My List",
        lastEdit: new Date("2022-01-01"),
      };

      // Act
      updateLastEditDate(list as FavouritesListType);

      // Assert
      expect(areDatesEqual(list.lastEdit, new Date())).toBe(true);
    });

    it("should set the last edit date to the current date if the list does not have a last edit date", () => {
      // Arrange
      const list: FavouritesListType = {
        name: "My List",
        id: "1234",
        lastEdit: new Date(),
        products: [],
      };

      // Act
      updateLastEditDate(list);

      // Assert
      expect(areDatesEqual(list.lastEdit, new Date())).toBe(true);
    });

    it("should handle empty list input without throwing errors", () => {
      // Arrange
      const list = {};

      // Act & Assert
      expect(() => {
        updateLastEditDate(list as FavouritesListType);
      }).not.toThrow();
    });
  });

  describe("#getEditingList", () => {
    it("should return the list with the given id if it exists in the array of lists", () => {
      // Arrange
      const currentDate = new Date();
      const lists: FavouritesListType[] = [
        { id: "1234", name: "List 1", lastEdit: currentDate },
        { id: "4321", name: "List 2", lastEdit: currentDate },
        { id: "5248", name: "List 3", lastEdit: currentDate },
      ];
      const listId: FavouritesListType["id"] = "4321";

      // Act
      const editingList = getEditingList(lists, listId);

      // Assert
      expect(editingList).toEqual({
        id: "4321",
        name: "List 2",
        lastEdit: currentDate,
      });
    });

    it("should return undefined if the list with the given id does not exist in the array of lists", () => {
      // Arrange
      const currentDate = new Date();
      const lists: FavouritesListType[] = [
        { id: "1234", name: "List 1", lastEdit: currentDate },
        { id: "4321", name: "List 2", lastEdit: currentDate },
        { id: "5248", name: "List 3", lastEdit: currentDate },
      ];
      const listId: FavouritesListType["id"] = "9999";

      // Act
      const editingList = getEditingList(lists, listId);

      // Assert
      expect(editingList).toBeUndefined();
    });

    it("should work correctly with an array of one list", () => {
      // Arrange
      const currentDate = new Date();
      const lists: FavouritesListType[] = [
        { id: "1234", name: "List 1", lastEdit: currentDate },
      ];
      const listId: FavouritesListType["id"] = "1234";

      // Act
      const editingList = getEditingList(lists, listId);

      // Assert
      expect(editingList).toEqual({
        id: "1234",
        name: "List 1",
        lastEdit: currentDate,
      });
    });

    it("should return undefined if the array of lists is empty", () => {
      // Arrange
      const lists: FavouritesListType[] = [];
      const listId = "1234";

      // Act
      const editingList = getEditingList(lists, listId);

      // Assert
      expect(editingList).toBeUndefined();
    });
  });

  describe("#deleteList", () => {
    it("should delete the list with the specified id from the array of lists", () => {
      // Arrange
      const currentDate = new Date();
      const lists: FavouritesListType[] = [
        { id: "1234", name: "List 1", lastEdit: currentDate },
        { id: "4321", name: "List 2", lastEdit: currentDate },
        { id: "5248", name: "List 3", lastEdit: currentDate },
      ];
      const deletingListId = "4321";

      // Act
      const updatedLists = deleteList(lists, deletingListId);

      // Assert
      expect(updatedLists).toEqual([
        { id: "1234", name: "List 1", lastEdit: currentDate },
        { id: "5248", name: "List 3", lastEdit: currentDate },
      ]);
    });

    it("should work with an array of lists with one element", () => {
      // Arrange
      const lists = [{ id: "1234", name: "List 1", lastEdit: new Date() }];
      const deletingListId = "1234";

      // Act
      const updatedLists = deleteList(lists, deletingListId);

      // Assert
      expect(updatedLists).toEqual([]);
    });

    it("should return an empty array when the input array is empty", () => {
      // Arrange
      const lists: FavouritesListType[] = [];
      const deletingListId = "1234";

      // Act
      const updatedLists = deleteList(lists, deletingListId);

      // Assert
      expect(updatedLists).toEqual([]);
    });
  });

  describe("#createNewList", () => {
    it("should create a new list with a generated ID if listId is null or undefined, and add the provided product to the list", () => {
      // Arrange
      const product = { id: "1234", name: "Product 1", price: 100 };
      const date = new Date();

      // Act
      // @ts-expect-error Testing for null
      const newList = createNewList(null, product);

      // Assert
      expect(newList.id).toBeDefined();
      expect(areDatesEqual(newList.lastEdit, new Date())).toBe(true);
      expect(newList.name).toEqual("Moja lista");
      expect(newList.products).toEqual([{ ...product, addedDate: date }]);
    });

    it("should create a new list with the provided listId, and add the provided product to the list", () => {
      // Arrange
      const listId = "listId";
      const product = shoppingCart[0];
      const date = new Date();

      // Act
      const newList = createNewList(listId, product);

      // Expect
      expect(newList.id).toEqual(listId);
      expect(areDatesEqual(newList.lastEdit, date)).toBe(true);
      expect(newList.name).toEqual("Moja lista");
      expect(newList.products).toEqual([{ ...product, addedDate: date }]);
    });
  });

  describe("#updateEditingList", () => {
    it("should update the list and return the updated array of lists when the list exists in the array", () => {
      // Arrange
      const lists = [
        { id: "1", name: "List 1", lastEdit: new Date("2022-01-01") },
        { id: "2", name: "List 2", lastEdit: new Date("2022-02-01") },
        { id: "3", name: "List 3", lastEdit: new Date("2022-01-15") },
      ];
      const editingList = {
        id: "2",
        name: "Updated List 2",
        lastEdit: new Date(),
      };

      // Act
      const updatedLists = updateEditingList(lists, editingList);

      // Assert
      expect(updatedLists).toEqual([
        { id: "2", name: "Updated List 2", lastEdit: expect.any(Date) },
        { id: "3", name: "List 3", lastEdit: new Date("2022-01-15") },
        { id: "1", name: "List 1", lastEdit: new Date("2022-01-01") },
      ]);
    });

    it("should return null when the list does not exist in the array", () => {
      // Arrange
      const lists = [
        { id: "1", name: "List 1", lastEdit: new Date("2022-01-01") },
        { id: "3", name: "List 3", lastEdit: new Date("2022-01-15") },
      ];
      const editingList = {
        id: "2",
        name: "Updated List 2",
        lastEdit: new Date(),
      };

      // Act
      const updatedLists = updateEditingList(lists, editingList);

      // Assert
      expect(updatedLists).toBeNull();
    });
  });

  describe("#removeProductsFromOldList", () => {
    it("should remove products from the old list that are in the new list", () => {
      // Arrange
      const oldList = {
        name: "Old List",
        products: [
          { productNumber: "1", name: "Product 1" },
          { productNumber: "2", name: "Product 2" },
        ],
      };

      const newList = {
        name: "New List",
        products: [{ productNumber: "1", name: "Product 1" }],
      };

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      removeProductsFromOldList(oldList, newList);

      // Assert
      expect(oldList.products).toEqual([
        { productNumber: "2", name: "Product 2" },
      ]);
    });

    it("should remove only the products that are in both lists", () => {
      // Arrange
      const oldList = {
        name: "Old List",
        products: [
          { productNumber: 1, name: "Product 1" },
          { productNumber: 2, name: "Product 2" },
        ],
      };

      const newList = {
        name: "New List",
        products: [
          { productNumber: 1, name: "Product 1" },
          { productNumber: 3, name: "Product 3" },
        ],
      };

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      removeProductsFromOldList(oldList, newList);

      // Assert
      expect(oldList.products).toEqual([
        { productNumber: 2, name: "Product 2" },
      ]);
    });

    it("should remove more than one product from the old list if they are in the new list", () => {
      // Arrange
      const oldList = {
        name: "Old List",
        products: [
          { productNumber: 1, name: "Product 1" },
          { productNumber: 2, name: "Product 2" },
          { productNumber: 3, name: "Product 3" },
          { productNumber: 4, name: "Product 4" },
        ],
      };

      const newList = {
        name: "New List",
        products: [
          { productNumber: 1, name: "Product 1" },
          { productNumber: 3, name: "Product 3" },
          { productNumber: 4, name: "Product 4" },
        ],
      };

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      removeProductsFromOldList(oldList, newList);

      // Assert
      expect(oldList.products).toEqual([
        { productNumber: 2, name: "Product 2" },
      ]);
    });

    it("should not remove any products if all products in both lists are different", () => {
      // Arrange
      const oldList = {
        name: "Old List",
        products: [
          { productNumber: 1, name: "Product 1" },
          { productNumber: 2, name: "Product 2" },
          { productNumber: 3, name: "Product 3" },
        ],
      };

      const newList = {
        name: "New List",
        products: [
          { productNumber: 4, name: "Product 4" },
          { productNumber: 5, name: "Product 5" },
          { productNumber: 6, name: "Product 6" },
        ],
      };

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      removeProductsFromOldList(oldList, newList);

      // Assert
      expect(oldList.products).toEqual([
        { productNumber: 1, name: "Product 1" },
        { productNumber: 2, name: "Product 2" },
        { productNumber: 3, name: "Product 3" },
      ]);

      expect(newList.products).toEqual([
        { productNumber: 4, name: "Product 4" },
        { productNumber: 5, name: "Product 5" },
        { productNumber: 6, name: "Product 6" },
      ]);
    });
  });

  describe("#updateAddedDateOfProducts", () => {
    it("should update the added date of all products to the current date", () => {
      // Arrange
      const newList = {
        name: "My List",
        products: [
          { id: 1, name: "Product 1", addedDate: new Date("2022-01-01") },
          { id: 2, name: "Product 2" },
          { id: 3, name: "Product 3", addedDate: null },
        ],
      };
      const currentDate = new Date();

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      updateAddedDateOfProducts(newList);

      // Assert
      expect(newList.products[0].addedDate).toStrictEqual(currentDate);
      expect(newList.products[1].addedDate).toStrictEqual(currentDate);
    });

    it("should work correctly when the new list has an empty products array", () => {
      // Arrange
      const newList = {
        name: "My List",
        products: [],
      };

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      updateAddedDateOfProducts(newList);

      // Assert
      expect(newList.products).toEqual([]);
    });
  });

  describe("#checkIfProductExistsInList", () => {
    it("should return the index of the existing product in the list", () => {
      // Arrange
      const products = [
        { productNumber: 1, name: "Product 1" },
        { productNumber: 2, name: "Product 2" },
      ];
      const product = { productNumber: 1, name: "Product 1" };

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      const index = checkIfProductExistsInList(products, product);

      // Assert
      expect(index).toBe(0);
    });

    it("should return -1 when the product is not in the list", () => {
      // Arrange
      const products = [
        { productNumber: 1, name: "Product 1" },
        { productNumber: 2, name: "Product 2" },
      ];
      const product = { productNumber: 3, name: "Product 3" };

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      const index = checkIfProductExistsInList(products, product);

      // Assert
      expect(index).toBe(-1);
    });

    it("should return -1 when the list is empty", () => {
      // Arrange
      const products: ShoppingCartType[] = [];
      const product = { productNumber: 1, name: "Product 1" };

      // Act
      // @ts-expect-error Testing for product that do not have all the required fields
      const index = checkIfProductExistsInList(products, product);

      // Assert
      expect(index).toBe(-1);
    });

    it("should return -1 when the productNumber property is null", () => {
      // Arrange
      const products = [
        { productNumber: 1, name: "Product 1" },
        { productNumber: 2, name: "Product 2" },
      ];
      const product = { productNumber: null, name: "Product 1" };

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      const index = checkIfProductExistsInList(products, product);

      // Assert
      expect(index).toBe(-1);
    });
  });

  describe("#removeProductsFromList", () => {
    it("should remove product from list when product number exists", () => {
      // Arrange
      const products = [
        { productNumber: 1, name: "Product 1" },
        { productNumber: 2, name: "Product 2" },
      ];
      const productNumber = 1;

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      const updatedProducts = removeProductsFromList(products, productNumber);

      // Assert
      expect(updatedProducts).toEqual([
        { productNumber: 2, name: "Product 2" },
      ]);
    });

    it("should return original list when product number does not exist", () => {
      // Arrange
      const products = [
        { productNumber: 1, name: "Product 1" },
        { productNumber: 2, name: "Product 2" },
      ];
      const productNumber = 3;

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      const updatedProducts = removeProductsFromList(products, productNumber);

      // Assert
      expect(updatedProducts).toEqual(products);
    });

    it("should return empty list when input list is empty", () => {
      // Arrange
      const products: ShoppingCartType[] = [];
      const productNumber = "1";

      // Act
      const updatedProducts = removeProductsFromList(products, productNumber);

      // Assert
      expect(updatedProducts).toEqual([]);
    });

    it("should return original list when product number to remove is not provided", () => {
      // Arrange
      const products = [
        { productNumber: 1, name: "Product 1" },
        { productNumber: 2, name: "Product 2" },
      ];

      // Act
      // @ts-expect-error Product number is not provided
      const updatedProducts = removeProductsFromList(products);

      // Assert
      expect(updatedProducts).toEqual(products);
    });
  });

  describe("#removeProductFromShoppingCart", () => {
    it("should remove product from shopping cart when it exists", () => {
      // Arrange
      const shoppingCart = [
        { productNumber: 1, name: "Product 1" },
        { productNumber: 2, name: "Product 2" },
      ];
      const productNumber = 1;

      // Act
      const updatedShoppingCart = removeProductFromShoppingCart(
        // @ts-expect-error Testing for shoppingCart that do not have all the required fields
        shoppingCart,
        productNumber,
      );

      // Assert
      expect(updatedShoppingCart).toEqual([
        { productNumber: 2, name: "Product 2" },
      ]);
    });

    it("should return current shopping cart when product does not exist", () => {
      // Arrange
      const shoppingCart = [
        { productNumber: 1, name: "Product 1" },
        { productNumber: 2, name: "Product 2" },
      ];
      const productNumber = 3;

      // Act
      const updatedShoppingCart = removeProductFromShoppingCart(
        // @ts-expect-error Testing for shoppingCart that do not have all the required fields
        shoppingCart,
        productNumber,
      );

      // Assert
      expect(updatedShoppingCart).toEqual(shoppingCart);
    });

    it("should handle empty shopping cart", () => {
      // Arrange
      const shoppingCart: ShoppingCartType[] = [];
      const productNumber = 1;

      // Act
      const updatedShoppingCart = removeProductFromShoppingCart(
        shoppingCart,
        // @ts-expect-error Testing for shoppingCart that do not have all the required fields
        productNumber,
      );

      // Assert
      expect(updatedShoppingCart).toEqual([]);
    });

    it("should handle shopping cart with one item", () => {
      // Arrange
      const shoppingCart = [{ productNumber: 1, name: "Product 1" }];
      const productNumber = 1;

      // Act
      const updatedShoppingCart = removeProductFromShoppingCart(
        // @ts-expect-error Testing for shoppingCart that do not have all the required fields
        shoppingCart,
        productNumber,
      );

      // Assert
      expect(updatedShoppingCart).toEqual([]);
    });
  });

  describe("#updateListWithProducts", () => {
    it("should add product to list with added date and update last edit date when list has no products", () => {
      // Arrange
      const list = {
        id: "1",
        name: "List 1",
        lastEdit: new Date("2022-01-01"),
        products: [],
      };
      const products = [
        {
          productNumber: 1,
          name: "Product 1",
          quantity: 1,
        },
      ];

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      const updatedList = updateListWithProducts(list, products);

      // Assert
      expect(updatedList.products).toHaveLength(1);
      expect(updatedList.products![0].productNumber).toBe(1);
      expect(
        areDatesEqual(updatedList.products![0].addedDate, new Date()),
      ).toBe(true);
      expect(areDatesEqual(updatedList.lastEdit, new Date())).toBe(true);
    });

    it("should add new product to list with added date and update last edit date when product does not exist in list", () => {
      // Arrange
      const list = {
        id: "1",
        name: "List 1",
        lastEdit: new Date("2022-01-01"),
        products: [
          {
            productNumber: 1,
            name: "Product 1",
            quantity: 1,
            addedDate: new Date("2022-01-01"),
          },
        ],
      };
      const products = [
        {
          productNumber: 2,
          name: "Product 2",
          quantity: 1,
        },
      ];

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      const updatedList = updateListWithProducts(list, products);

      // Assert
      expect(updatedList.products).toHaveLength(2);
      expect(updatedList.products![1].productNumber).toBe(2);

      expect(
        areDatesEqual(updatedList.products![1].addedDate, new Date()),
      ).toBe(true);
      expect(areDatesEqual(updatedList.lastEdit, new Date())).toBe(true);
    });

    it("should increase quantity of existing product and update last edit date when product already exists in list", () => {
      // Arrange
      const list = {
        id: "1",
        name: "List 1",
        lastEdit: new Date("2022-01-01"),
        products: [
          {
            productNumber: 1,
            name: "Product 1",
            quantity: 1,
            addedDate: new Date("2022-01-01"),
          },
        ],
      };
      const products = [
        {
          productNumber: 1,
          name: "Product 1",
          quantity: 2,
        },
      ];

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      const updatedList = updateListWithProducts(list, products);

      // Assert
      expect(updatedList.products).toHaveLength(1);
      expect(updatedList.products![0].quantity).toBe(3);
      expect(areDatesEqual(updatedList.lastEdit, new Date())).toBe(true);
    });

    it("should not add any products and update last edit date when list and products are empty", () => {
      // Arrange
      const list = {
        id: "1",
        name: "List 1",
        lastEdit: new Date("2022-01-01"),
        products: [],
      };
      const products: ShoppingCartType[] = [];

      // Act
      const updatedList = updateListWithProducts(list, products);

      // Assert
      expect(updatedList.products).toHaveLength(0);
      expect(areDatesEqual(updatedList.lastEdit, new Date())).toBe(true);
    });

    it("should not add any products and update last edit date when products array is empty", () => {
      // Arrange
      const list = {
        id: "1",
        name: "List 1",
        lastEdit: new Date("2022-01-01"),
        products: [
          {
            productNumber: 1,
            name: "Product 1",
            quantity: 1,
            addedDate: new Date("2022-01-01"),
          },
        ],
      };
      const products: ShoppingCartType[] = [];

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      const updatedList = updateListWithProducts(list, products);

      // Assert
      expect(updatedList.products).toHaveLength(1);
      expect(areDatesEqual(updatedList.lastEdit, new Date())).toBe(true);
    });

    it("should add products to list even if `products` property does not exist on the list", () => {
      // Arrange
      const list = {
        id: "1",
        name: "List 1",
        lastEdit: new Date("2022-01-01"),
      };
      const products = [
        {
          productNumber: 1,
          name: "Product 1",
          quantity: 1,
        },
      ];

      // Act
      // @ts-expect-error Testing for products that do not have all the required fields
      const updatedList = updateListWithProducts(list, products);

      // Assert
      expect(updatedList.products).toHaveLength(1);
      expect(updatedList.products![0].productNumber).toBe(1);
    });
  });

  describe("#changeProductQuantityInShoppingCart", () => {
    it('should increase the quantity of a product by 1 in the shopping cart when the value is "add"', () => {
      // Arrange
      const shoppingCart = [
        { productNumber: 1, name: "Product 1", quantity: 1 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
      ];
      const productNumber = 1;
      const value = "add";

      // Act
      const updatedShoppingCart = changeProductQuantityInShoppingCart(
        // @ts-expect-error Testing for shoppingCart that do not have all the required fields
        shoppingCart,
        value,
        productNumber,
      );

      // Assert
      expect(updatedShoppingCart).toEqual([
        { productNumber: 1, name: "Product 1", quantity: 2 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
      ]);
    });

    it('should decrease the quantity of a product by -1 in the shopping cart when the value is "subtract"', () => {
      // Arrange
      const shoppingCart = [
        { productNumber: 1, name: "Product 1", quantity: 2 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
      ];
      const productNumber = 1;
      const value = "subtract";

      // Act
      const updatedShoppingCart = changeProductQuantityInShoppingCart(
        // @ts-expect-error Testing for shoppingCart that do not have all the required fields
        shoppingCart,
        value,
        productNumber,
      );

      // Assert
      expect(updatedShoppingCart).toEqual([
        { productNumber: 1, name: "Product 1", quantity: 1 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
      ]);
    });

    it("should set the quantity of a product in the shopping cart to the provided value when the value is a number", () => {
      // Arrange
      const shoppingCart = [
        { productNumber: 1, name: "Product 1", quantity: 2 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
      ];
      const productNumber = 1;
      const value = 5;

      // Act
      const updatedShoppingCart = changeProductQuantityInShoppingCart(
        // @ts-expect-error Testing for shoppingCart that do not have all the required fields
        shoppingCart,
        value,
        productNumber,
      );

      // Assert
      expect(updatedShoppingCart).toEqual([
        { productNumber: 1, name: "Product 1", quantity: 5 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
      ]);
    });

    it("should handle a shopping cart with no products", () => {
      // Arrange
      const shoppingCart: ShoppingCartType[] = [];
      const productNumber = "1";
      const value = "add";

      // Act
      const updatedShoppingCart = changeProductQuantityInShoppingCart(
        shoppingCart,
        value,
        productNumber,
      );

      // Assert
      expect(updatedShoppingCart).toEqual([]);
    });

    it("should handle a product number that does not exist in the shopping cart", () => {
      // Arrange
      const shoppingCart = [
        { productNumber: 1, name: "Product 1", quantity: 1 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
      ];
      const productNumber = 3;
      const value = "add";

      // Act
      const updatedShoppingCart = changeProductQuantityInShoppingCart(
        // @ts-expect-error Testing for shoppingCart that do not have all the required fields
        shoppingCart,
        value,
        productNumber,
      );

      // Assert
      expect(updatedShoppingCart).toEqual([
        { productNumber: 1, name: "Product 1", quantity: 1 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
      ]);
    });
  });

  describe("#updateShoppingCart", () => {
    it("should add new products to the shopping cart when they do not exist in the shopping cart", () => {
      // Arrange
      const shoppingCart = [
        { productNumber: 1, name: "Product 1", quantity: 1 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
      ];

      const newProducts = [
        { productNumber: 3, name: "Product 3", quantity: 1 },
        { productNumber: 4, name: "Product 4", quantity: 1 },
      ];

      // Act
      // @ts-expect-error Testing for shoppingCart that do not have all the required fields
      const updatedShoppingCart = updateShoppingCart(shoppingCart, newProducts);

      // Assert
      expect(updatedShoppingCart).toEqual([
        { productNumber: 1, name: "Product 1", quantity: 1 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
        { productNumber: 3, name: "Product 3", quantity: 1 },
        { productNumber: 4, name: "Product 4", quantity: 1 },
      ]);
    });

    it("should increase the quantity of an existing product in the shopping cart when it already exists", () => {
      // Arrange
      const shoppingCart = [
        { productNumber: 1, name: "Product 1", quantity: 1 },
        { productNumber: 2, name: "Product 2", quantity: 2 },
        { productNumber: 3, name: "Product 3", quantity: 1 },
      ];

      const newProducts = [
        { productNumber: 1, name: "Product 1", quantity: 1 },
        { productNumber: 2, name: "Product 2", quantity: 1 },
      ];

      // Act
      // @ts-expect-error Testing for shoppingCart that do not have all the required fields
      const updatedShoppingCart = updateShoppingCart(shoppingCart, newProducts);

      // Assert
      expect(updatedShoppingCart).toEqual([
        { productNumber: 1, name: "Product 1", quantity: 2 },
        { productNumber: 2, name: "Product 2", quantity: 3 },
        { productNumber: 3, name: "Product 3", quantity: 1 },
      ]);
    });
  });
});
