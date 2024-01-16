import { MockInstance, beforeEach, describe, expect, it, vi } from "vitest";
import {
  changeProductQuantity,
  getEditingList,
  getFromLocalStorage,
  getJSONFromLocalStorage,
  saveFavoriteListsToLocalStorage,
  saveShoppingCartToLocalStorage,
  saveToLocalStorage,
  searchForIndex,
  sortLists,
  updateLastEditDate,
} from "./helpers";
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
      expect(list.lastEdit).toEqual(new Date());
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
      expect(list.lastEdit).toEqual(new Date());
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
      const lists: FavouritesListType[] = [
        { id: "1234", name: "List 1", lastEdit: new Date() },
        { id: "4321", name: "List 2", lastEdit: new Date() },
        { id: "5248", name: "List 3", lastEdit: new Date() },
      ];
      const listId: FavouritesListType["id"] = "4321";

      // Act
      const editingList = getEditingList(lists, listId);

      // Assert
      expect(editingList).toEqual({
        id: "4321",
        name: "List 2",
        lastEdit: new Date(),
      });
    });

    it("should return undefined if the list with the given id does not exist in the array of lists", () => {
      // Arrange
      const lists: FavouritesListType[] = [
        { id: "1234", name: "List 1", lastEdit: new Date() },
        { id: "4321", name: "List 2", lastEdit: new Date() },
        { id: "5248", name: "List 3", lastEdit: new Date() },
      ];
      const listId: FavouritesListType["id"] = "9999";

      // Act
      const editingList = getEditingList(lists, listId);

      // Assert
      expect(editingList).toBeUndefined();
    });

    it("should work correctly with an array of one list", () => {
      // Arrange
      const lists: FavouritesListType[] = [
        { id: "1234", name: "List 1", lastEdit: new Date() },
      ];
      const listId: FavouritesListType["id"] = "1234";

      // Act
      const editingList = getEditingList(lists, listId);

      // Assert
      expect(editingList).toEqual({
        id: "1234",
        name: "List 1",
        lastEdit: new Date(),
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

  //!
  describe("deleteList", () => {});

  describe("createNewList", () => {});

  describe("removeProductsFromOldList", () => {});

  describe("updateListWithProducts", () => {});

  describe("updateEditingList", () => {});

  describe("updateAddedDateOfProducts", () => {});

  describe("checkIfProductExistsInList", () => {});

  describe("removeProductsFromList", () => {});

  describe("removeProductFromShoppingCart", () => {});

  describe("changeProductQuantityInShoppingCart", () => {});

  describe("updateShoppingCart", () => {});
});
