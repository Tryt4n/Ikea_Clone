import { describe, expect, it } from "vitest";
import { listReducer } from "./listReducer";
import type {
  ListReducerActionsType,
  ListReducerStateType,
} from "../ListContext";
import type { ShoppingCartType } from "../../../../context/AppContext/types/ShoppingCartType";
import { exampleList } from "../../../../setup-test/test-constants/exampleList";

describe("#listReducer", () => {
  describe("should handle initList action", () => {
    it("should do nothing if passed list does not have products", () => {
      // Arrange
      const list: ListReducerStateType = {
        ...exampleList,
        products: undefined,
      };
      const action: ListReducerActionsType = {
        type: "initList",
        payload: {
          ...exampleList,
          products: undefined,
        },
      };

      // Act
      const newState = listReducer(list, action);

      // Assert
      expect(newState).toEqual(list);
    });

    it("should initialize list", () => {
      // Arrange
      const list: ListReducerStateType = undefined;
      const action: ListReducerActionsType = {
        type: "initList",
        payload: exampleList,
      };

      // Act
      const newState = listReducer(list, action);

      // Assert
      expect(newState).toEqual({ ...exampleList, listSorting: "oldest" });
    });
  });

  describe("should handle sortByName action", () => {
    it("should do nothing if passed list does not have products", () => {
      // Arrange
      const list: ListReducerStateType = {
        ...exampleList,
        products: undefined,
      };
      const action: ListReducerActionsType = {
        type: "initList",
        payload: {
          ...exampleList,
          products: undefined,
        },
      };

      // Act
      const newState = listReducer(list, action);

      // Assert
      expect(newState).toEqual(list);
    });

    it("should sort products in alphabetical order", () => {
      // Arrange
      const list: ListReducerStateType = {
        ...exampleList,
        products: [
          {
            collection: "EEE",
          },
          {
            collection: "CCC",
          },
          {
            collection: "BBB",
          },
          {
            collection: "DDD",
          },
          {
            collection: "AAA",
          },
        ] as ShoppingCartType[],
      };
      const action: ListReducerActionsType = {
        type: "sortByName",
      };

      // Act
      const newState = listReducer(list, action);

      // Assert
      expect(newState).toEqual({
        ...list,
        products: [
          {
            collection: "AAA",
          },
          {
            collection: "BBB",
          },
          {
            collection: "CCC",
          },
          {
            collection: "DDD",
          },
          {
            collection: "EEE",
          },
        ],
        listSorting: "name",
      });
    });
  });

  describe("should handle sortByDate action", () => {
    it("should do nothing if passed list does not have products", () => {
      // Arrange
      const list: ListReducerStateType = {
        ...exampleList,
        products: undefined,
      };
      const action: ListReducerActionsType = {
        type: "initList",
        payload: {
          ...exampleList,
          products: undefined,
        },
      };

      // Act
      const newState = listReducer(list, action);

      // Assert
      expect(newState).toEqual(list);
    });

    it("should sort the list by date - most recent first", () => {
      // Arrange
      const firstDate = new Date("2021-01-01T00:00:00.000Z");
      const secondDate = new Date("2021-01-02T00:00:00.000Z");
      const thirdDate = new Date("2021-01-05T00:00:00.000Z");
      const fourthDate = new Date("2021-01-05T00:00:00.000Z");
      const fifthDate = new Date("2021-01-15T00:00:00.000Z");

      const list: ListReducerStateType = {
        ...exampleList,
        products: [
          {
            addedDate: thirdDate,
          },
          {
            addedDate: fifthDate,
          },
          {
            addedDate: secondDate,
          },
          {
            addedDate: fourthDate,
          },
          {
            addedDate: firstDate,
          },
        ] as ShoppingCartType[],
      };
      const action: ListReducerActionsType = {
        type: "sortByDate",
        payload: "recent",
      };

      // Act
      const newState = listReducer(list, action);

      // Assert
      // JSON.stringify is used to compare date objects
      expect(JSON.stringify(newState)).toEqual(
        JSON.stringify({
          ...list,
          products: [
            {
              addedDate: fifthDate,
            },
            {
              addedDate: fourthDate,
            },
            {
              addedDate: thirdDate,
            },
            {
              addedDate: secondDate,
            },
            {
              addedDate: firstDate,
            },
          ],
          listSorting: "recent",
        }),
      );
    });
    it("should sort the list by date - oldest first", () => {
      // Arrange
      const firstDate = new Date("2021-01-01T00:00:00.000Z");
      const secondDate = new Date("2021-01-02T00:00:00.000Z");
      const thirdDate = new Date("2021-01-05T00:00:00.000Z");
      const fourthDate = new Date("2021-01-05T00:00:00.000Z");
      const fifthDate = new Date("2021-01-15T00:00:00.000Z");

      const list: ListReducerStateType = {
        ...exampleList,
        products: [
          {
            addedDate: thirdDate,
          },
          {
            addedDate: fifthDate,
          },
          {
            addedDate: secondDate,
          },
          {
            addedDate: fourthDate,
          },
          {
            addedDate: firstDate,
          },
        ] as ShoppingCartType[],
      };
      const action: ListReducerActionsType = {
        type: "sortByDate",
        payload: "oldest",
      };

      // Act
      const newState = listReducer(list, action);

      // Assert
      // JSON.stringify is used to compare date objects
      expect(JSON.stringify(newState)).toEqual(
        JSON.stringify({
          ...list,
          products: [
            {
              addedDate: firstDate,
            },
            {
              addedDate: secondDate,
            },
            {
              addedDate: thirdDate,
            },
            {
              addedDate: fourthDate,
            },
            {
              addedDate: fifthDate,
            },
          ],
          listSorting: "oldest",
        }),
      );
    });
  });

  describe("should handle sortByPrice action", () => {
    it("should do nothing if passed list does not have products", () => {
      // Arrange
      const list: ListReducerStateType = {
        ...exampleList,
        products: undefined,
      };
      const action: ListReducerActionsType = {
        type: "initList",
        payload: {
          ...exampleList,
          products: undefined,
        },
      };

      // Act
      const newState = listReducer(list, action);

      // Assert
      expect(newState).toEqual(list);
    });

    it("should sort the list by price in ascending order", () => {
      // Arrange
      const firstPrice = {
        price: {
          integer: 10,
        },
      };
      const secondPrice = {
        price: {
          integer: 10,
        },
      };
      const thirdPrice = {
        price: {
          integer: 10,
          decimal: 99,
        },
      };
      const fourthPrice = {
        price: {
          integer: 10,
          decimal: 99,
        },
      };
      const fifthPrice = {
        price: {
          integer: 11,
          decimal: 1,
        },
      };

      const list: ListReducerStateType = {
        ...exampleList,
        products: [
          secondPrice,
          thirdPrice,
          fifthPrice,
          fourthPrice,
          firstPrice,
        ] as ShoppingCartType[],
      };
      const action: ListReducerActionsType = {
        type: "sortByPrice",
        payload: "priceAscending",
      };

      // Act
      const newState = listReducer(list, action);

      // Assert
      expect(newState).toEqual({
        ...list,
        products: [
          firstPrice,
          secondPrice,
          thirdPrice,
          fourthPrice,
          fifthPrice,
        ],
        listSorting: "priceAscending",
      });
    });
    it("should sort the list by price in descending order", () => {
      // Arrange
      const firstPrice = {
        price: {
          integer: 10,
        },
      };
      const secondPrice = {
        price: {
          integer: 10,
        },
      };
      const thirdPrice = {
        price: {
          integer: 10,
          decimal: 99,
        },
      };
      const fourthPrice = {
        price: {
          integer: 10,
          decimal: 99,
        },
      };
      const fifthPrice = {
        price: {
          integer: 11,
          decimal: 1,
        },
      };

      const list: ListReducerStateType = {
        ...exampleList,
        products: [
          secondPrice,
          thirdPrice,
          fifthPrice,
          fourthPrice,
          firstPrice,
        ] as ShoppingCartType[],
      };
      const action: ListReducerActionsType = {
        type: "sortByPrice",
        payload: "priceDescending",
      };

      // Act
      const newState = listReducer(list, action);

      // Assert
      expect(newState).toEqual({
        ...list,
        products: [
          fifthPrice,
          fourthPrice,
          thirdPrice,
          secondPrice,
          firstPrice,
        ],
        listSorting: "priceDescending",
      });
    });
  });

  it("should throw an error if action type is not recognized", () => {
    // Arrange
    const list: ListReducerStateType = exampleList;
    const action: ListReducerActionsType = {
      // @ts-expect-error - intentionally passing wrong action type
      type: "unknownActionType",
    };

    // Act and Assert
    expect(() => listReducer(list, action)).toThrowError();
  });
});
