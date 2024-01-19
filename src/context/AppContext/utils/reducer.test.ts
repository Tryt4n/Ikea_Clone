import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { reducer } from "./reducer";
// Utils
import { areDatesEqual } from "../../../setup-test/test-utils";
// Constants
import { initState } from "../constants/appInitState";
import { shopsList } from "../../../constants/shopsList";
import { shoppingCart } from "../../../setup-test/test-constants/shoppingCart";
import { exampleList } from "../../../setup-test/test-constants/exampleList";
// Types
import type {
  ReducerActionsType,
  ReducerStateType,
} from "../types/ReducerTypes";
import type { FavouritesListType } from "../types/FavouritesListType";

describe("#reducer App Context function", () => {
  let currentDate: Date;

  beforeEach(() => {
    localStorage.clear(); // Clear localStorage

    // Set current date to the current date without milliseconds
    currentDate = new Date();
    currentDate.setMilliseconds(0);
  });
  afterEach(() => {
    localStorage.clear(); // Clear localStorage
  });

  it("should return the new state based on `setPostalCode` action", () => {
    // Arrange
    const action: ReducerActionsType = {
      type: "setPostalCode",
      payload: "12-456",
    };

    // Act
    const newState = reducer(initState, action);

    // Assert
    expect(newState).toEqual({
      ...initState,
      postalCode: action.payload,
      isPostalCodeErrorMessageVisible: false,
    });
  });

  it("should return the new state based on `showErrorMessage` action", () => {
    // Arrange
    const action: ReducerActionsType = {
      type: "showErrorMessage",
      payload: "Error message",
    };

    // Act
    const newState = reducer(initState, action);

    // Assert
    expect(newState).toEqual({
      ...initState,
      isPostalCodeErrorMessageVisible: true,
      postalCodeErrorMessage: action.payload,
    });
  });

  it("should return the new state based on `togglePostalCodeCheckbox` action", () => {
    // Arrange
    const action: ReducerActionsType = {
      type: "togglePostalCodeCheckbox",
      payload: true,
    };

    // Act
    const newState = reducer(initState, action);

    // Assert
    expect(newState).toEqual({
      ...initState,
      rememberPostalCodeCheckboxStatus: action.payload,
    });
  });

  it("should return the new state based on `deletePostalCode` action", () => {
    // Arrange
    const action: ReducerActionsType = {
      type: "deletePostalCode",
    };

    // Act
    const newState = reducer(initState, action);

    // Assert
    expect(newState).toEqual({
      ...initState,
      postalCode: "",
    });
  });

  it("should return the new state based on `chooseShop` action", () => {
    // Arrange
    const action: ReducerActionsType = {
      type: "chooseShop",
      payload: shopsList[0],
    };

    // Act
    const newState = reducer(initState, action);

    // Assert
    expect(newState).toEqual({
      ...initState,
      chosenShop: action.payload,
    });
  });

  it("should return the new state based on `addToShoppingCart` action", () => {
    // Arrange
    const action: ReducerActionsType = {
      type: "addToShoppingCart",
      payload: shoppingCart,
    };

    // Act
    const newState = reducer(initState, action);

    // Assert
    expect(newState).toEqual({
      ...initState,
      shoppingCart: action.payload,
    });
  });

  it("should return the new state based on `restoreShoppingCart` action", () => {
    // Arrange
    const action: ReducerActionsType = {
      type: "restoreShoppingCart",
      payload: shoppingCart,
    };

    // Act
    const newState = reducer(initState, action);

    // Assert
    expect(newState).toEqual({
      ...initState,
      shoppingCart: action.payload,
    });
  });

  it("should return the new state based on `changeProductQuantity` action", () => {
    // Arrange
    const productNumber = "123.456.78";
    const quantity = 1;
    const changeQuantityTo = 5;

    const action: ReducerActionsType = {
      type: "changeProductQuantity",
      payload: {
        value: changeQuantityTo,
        productNumber: productNumber,
      },
    };

    // Find product
    const productIndex = shoppingCart.findIndex(
      (product) => product.productNumber === productNumber,
    );

    // If product not found throw error
    if (productIndex === -1) {
      throw new Error(`Product with number ${productNumber} not found`);
    }

    // Create new shopping cart
    const newShoppingCart = [
      ...shoppingCart.slice(0, productIndex),
      {
        ...shoppingCart[productIndex],
        quantity: quantity,
      },
      ...shoppingCart.slice(productIndex + 1),
    ];

    const state: ReducerStateType = {
      ...initState,
      shoppingCart: newShoppingCart,
    };

    // Mock for localStorage
    localStorage.setItem("shoppingCart", JSON.stringify(state.shoppingCart));

    // Act
    const newState = reducer(state, action);

    // Assert // JSON.stringify to avoid comparing date on that objects by reference
    expect(JSON.stringify(newState)).toEqual(
      JSON.stringify({
        ...state,
        shoppingCart: [
          {
            ...shoppingCart[0],
            quantity: changeQuantityTo,
          },
          { ...shoppingCart[1] },
        ],
      }),
    );
  });

  describe("should return the new state based on `removeProductFromShoppingCart` action", () => {
    it("if product number is valid removes it from shopping cart", () => {
      // Arrange
      const productNumber = "123.456.78";
      const action: ReducerActionsType = {
        type: "removeProductFromShoppingCart",
        payload: productNumber,
      };

      // Find product
      const productIndex = shoppingCart.findIndex(
        (product) => product.productNumber === productNumber,
      );

      // If product not found throw error
      if (productIndex === -1) {
        throw new Error(`Product with number ${productNumber} not found`);
      }

      // Create new shopping cart
      const newShoppingCart = [
        ...shoppingCart.slice(0, productIndex),
        {
          ...shoppingCart[productIndex],
          productNumber: productNumber,
        },
        ...shoppingCart.slice(productIndex + 1),
      ];

      const state: ReducerStateType = {
        ...initState,
        shoppingCart: newShoppingCart,
      };

      // Mock for localStorage
      localStorage.setItem("shoppingCart", JSON.stringify(state.shoppingCart));

      // Act
      const newState = reducer(state, action);

      // Assert // JSON.stringify to avoid comparing date on that objects by reference
      expect(JSON.stringify(newState)).toEqual(
        JSON.stringify({
          ...initState,
          shoppingCart: [...shoppingCart.slice(1)],
        }),
      );
    });

    it("if the product number is invalid do nothing", () => {
      // Arrange
      const productNumber = "some invalid product number";
      const action: ReducerActionsType = {
        type: "removeProductFromShoppingCart",
        payload: productNumber,
      };
      const state: ReducerStateType = {
        ...initState,
        shoppingCart: shoppingCart,
      };

      // Mock for localStorage
      localStorage.setItem("shoppingCart", JSON.stringify(state.shoppingCart));

      // Act
      const newState = reducer(state, action);

      // Assert // JSON.stringify to avoid comparing date on that objects by reference
      expect(JSON.stringify(newState)).toEqual(
        JSON.stringify({
          ...initState,
          shoppingCart: shoppingCart,
        }),
      );
    });
  });

  it("should return the new state based on `clearShoppingCart` action", () => {
    // Arrange
    const action: ReducerActionsType = {
      type: "clearShoppingCart",
    };

    // Act
    const newState = reducer(initState, action);

    // Assert
    expect(newState).toEqual({
      ...initState,
      shoppingCart: undefined,
    });
    expect(localStorage.getItem("shoppingCart")).toBeNull();
  });

  describe("should return the new state based on `createNewList` action", () => {
    it("if there is no lists add new list", () => {
      // Arrange
      const listId = "1234";
      const action: ReducerActionsType = {
        type: "createNewList",
        payload: {
          list: exampleList,
          oldListId: listId,
        },
      };

      // Act
      const newState = reducer(initState, action);

      // Assert
      expect(newState).toEqual({
        ...initState,
        favouriteLists: [exampleList],
      });
    });

    it("if there is at least one list add another one", () => {
      // Arrange
      const listId = "1234";
      const action: ReducerActionsType = {
        type: "createNewList",
        payload: {
          list: {
            ...exampleList,
            id: listId,
            products: [exampleList.products![0], exampleList.products![1]],
          },
        },
      };
      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [{ ...exampleList }],
      };

      // Mock for localStorage
      localStorage.setItem(
        "favouriteLists",
        JSON.stringify([{ ...exampleList }]),
      );

      // Act
      const newState = reducer(state, action);

      // Assert
      expect(newState.favouriteLists.length).toBe(2);
      // JSON.stringify to avoid comparing date on that objects by reference
      expect(JSON.stringify(newState)).toEqual(
        JSON.stringify({
          ...state,
          favouriteLists: [action.payload.list, ...state.favouriteLists!],
        }),
      );
    });

    it("if the list being passed is a list from which the user wants to move products to the newly created list.", () => {
      // Arrange
      const newlyCreatedListID = "1234";
      const oldListID = "9999";
      const action: ReducerActionsType = {
        type: "createNewList",
        payload: {
          list: {
            ...exampleList,
            id: newlyCreatedListID,
            products: [exampleList.products![0], exampleList.products![1]],
          },
          oldListId: oldListID,
        },
      };
      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [{ ...exampleList, id: oldListID }],
      };

      // Mock for localStorage
      localStorage.setItem(
        "favouriteLists",
        JSON.stringify([{ ...exampleList, id: oldListID }]),
      );

      // Act
      const newState = reducer(state, action);

      // Assert
      expect(newState.favouriteLists[0].id).toBe(newlyCreatedListID);
      expect([
        {
          ...newState.favouriteLists[0].products[0],
          addedDate: currentDate,
        },
        {
          ...newState.favouriteLists[0].products[1],
          addedDate: currentDate,
        },
      ]).toEqual([
        {
          ...state.favouriteLists![0].products![0],
          addedDate: currentDate,
        },
        {
          ...state.favouriteLists![0].products![1],
          addedDate: currentDate,
        },
      ]);

      expect(newState.favouriteLists.length).toBe(2);
    });
  });

  it("should return the new state based on `setEditingList` action", () => {
    // Arrange
    const action: ReducerActionsType = {
      type: "setEditingList",
      payload: exampleList,
    };

    // Mock for localStorage
    localStorage.setItem(
      "favouriteLists",
      JSON.stringify([{ ...exampleList }]),
    );

    // Act
    const newState = reducer(initState, action);

    // Assert // JSON.stringify to avoid comparing date on that objects by reference
    expect(JSON.stringify(newState)).toEqual(
      JSON.stringify({
        ...initState,
        editingList: action.payload,
      }),
    );
  });

  describe("should return the new state based on `changeListName` action", () => {
    it("if there is no lists do nothing", () => {
      // Arrange
      const action: ReducerActionsType = {
        type: "changeListName",
        payload: exampleList,
      };

      // Act
      const newState = reducer(initState, action);

      // Assert
      expect(newState).toEqual(initState);
    });

    it("if there is at least one list update it", () => {
      // Arrange
      const newName = "New name";
      const action: ReducerActionsType = {
        type: "changeListName",
        payload: { ...exampleList, name: newName },
      };

      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [exampleList],
      };

      // Mock for localStorage
      localStorage.setItem(
        "favouriteLists",
        JSON.stringify(state.favouriteLists),
      );

      // Act
      const newState = reducer(state, action);

      // Assert
      expect(newState.favouriteLists[0].name).toBe(newName);
      expect(
        areDatesEqual(newState.favouriteLists[0].lastEdit, currentDate),
      ).toBe(true);
    });

    it("if list does not exist do nothing", () => {
      // Arrange
      const action: ReducerActionsType = {
        type: "changeListName",
        payload: { ...exampleList, id: "some invalid id" },
      };

      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [exampleList],
      };

      // Mock for localStorage
      localStorage.setItem(
        "favouriteLists",
        JSON.stringify(state.favouriteLists),
      );

      // Act
      const newState = reducer(state, action);

      // Assert
      expect(newState).toEqual(state);
    });
  });

  describe("should return the new state based on `deleteList` action", () => {
    it("if there is no lists do nothing", () => {
      // Arrange
      const action: ReducerActionsType = {
        type: "deleteList",
        payload: exampleList.id,
      };

      // Act
      const newState = reducer(initState, action);

      // Assert
      expect(newState).toEqual(initState);
    });

    it("if there is only one list delete it", () => {
      // Arrange
      const listId = "test-id";
      const action: ReducerActionsType = {
        type: "deleteList",
        payload: listId,
      };

      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [{ ...exampleList, id: listId }],
      };

      localStorage.setItem(
        "favouriteLists",
        JSON.stringify(state.favouriteLists),
      );

      // Act
      const newState = reducer(state, action);

      // Assert
      expect(JSON.stringify(newState)).toEqual(
        JSON.stringify({
          ...initState,
          favouriteLists: [],
        }),
      );
    });

    it("if there is at least one list delete passed list by id", () => {
      // Arrange
      const listId = "test-id";
      const secondListId = "second-test-id";
      const action: ReducerActionsType = {
        type: "deleteList",
        payload: listId,
      };

      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [
          { ...exampleList, id: listId },
          { ...exampleList, id: secondListId },
        ],
      };

      localStorage.setItem(
        "favouriteLists",
        JSON.stringify(state.favouriteLists),
      );

      // Act
      const newState = reducer(state, action);

      // Assert
      expect(JSON.stringify(newState)).toEqual(
        JSON.stringify({
          ...initState,
          favouriteLists: [{ ...exampleList, id: secondListId }],
        }),
      );
    });
  });

  describe("should return the new state based on `addProductsToList` action", () => {
    it("if there is no lists create new one with passed id and one product", () => {
      // Arrange
      const action: ReducerActionsType = {
        type: "addProductsToList",
        payload: {
          listId: exampleList.id,
          products: [exampleList.products![0]],
        },
      };

      // Act
      const newState = reducer(initState, action);

      // Assert
      expect(newState).toEqual({
        ...initState,
        favouriteLists: [
          {
            ...exampleList,
            name: "Moja lista",
            lastEdit: currentDate,
            products: [{ ...exampleList.products![0], addedDate: currentDate }],
          },
        ],
      });
    });

    it("if there is at least one list add products to passed list", () => {
      // Arrange
      const listId = "some id";

      const passedProducts = [
        { ...exampleList.products![0] },
        { ...exampleList.products![1] },
      ];
      const action: ReducerActionsType = {
        type: "addProductsToList",
        payload: {
          listId: listId,
          products: passedProducts,
        },
      };

      const listProducts = [
        { ...exampleList.products![2] },
        { ...exampleList.products![3] },
      ];
      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [
          {
            ...exampleList,
            id: listId,
            products: listProducts,
          },
        ],
      };

      localStorage.setItem(
        "favouriteLists",
        JSON.stringify(state.favouriteLists),
      );

      // Act
      const newState = reducer(state, action);

      const updatedPassedProducts = passedProducts.map((product) => {
        return {
          ...product,
          addedDate: currentDate,
        };
      });

      const expectedProducts = [...listProducts, ...updatedPassedProducts];

      // Assert
      expect(newState.favouriteLists[0].products.length).toBe(4);
      expect(JSON.stringify(newState)).toEqual(
        JSON.stringify({
          ...state,
          favouriteLists: [
            {
              ...state.favouriteLists![0],
              lastEdit: currentDate,
              products: expectedProducts,
            },
          ],
        }),
      );
    });
  });

  describe("should return the new state based on `moveProductsFromOneListToAnother` action", () => {
    it("if there is no lists do nothing", () => {
      // Arrange
      const action: ReducerActionsType = {
        type: "moveProductsFromOneListToAnother",
        payload: {
          products: exampleList.products!,
          listWhereProductIsMovedID: "some id",
          originalListId: "other id",
        },
      };

      // Act
      const newState = reducer(initState, action);

      // Assert
      expect(newState).toEqual(initState);
    });

    it("if there is at least one list and both passed list ids are valid", () => {
      // Arrange
      const movedListId = "moved list id";
      const originalListId = "original list id";

      const action: ReducerActionsType = {
        type: "moveProductsFromOneListToAnother",
        payload: {
          products: exampleList.products!,
          listWhereProductIsMovedID: movedListId,
          originalListId: originalListId,
        },
      };

      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [
          {
            ...exampleList,
            id: movedListId,
            products: [],
          },
          {
            ...exampleList,
            id: originalListId,
            products: exampleList.products,
          },
        ],
      };

      localStorage.setItem(
        "favouriteLists",
        JSON.stringify(state.favouriteLists),
      );

      // Act
      const newState = reducer(state, action);

      const expectedLists = [
        {
          ...exampleList,
          id: movedListId,
          lastEdit: currentDate,
          products: [
            ...exampleList.products!.map((product) => {
              return {
                ...product,
                addedDate: currentDate,
              };
            }),
          ],
        },
        {
          ...state.favouriteLists![0],
          id: originalListId,
          lastEdit: currentDate,
          products: [],
        },
      ];

      // Assert
      expect(newState.favouriteLists[0].products).toStrictEqual(
        expectedLists[0].products,
      );
      expect(newState.favouriteLists[1].products).toStrictEqual([]);
      expect(newState).toEqual({
        ...state,
        favouriteLists: expectedLists,
      });
    });

    it("if there is at least one list and both passed list ids are valid, but products array is empty", () => {
      // Arrange
      const movedListId = "moved list id";
      const originalListId = "original list id";

      const action: ReducerActionsType = {
        type: "moveProductsFromOneListToAnother",
        payload: {
          products: [],
          listWhereProductIsMovedID: movedListId,
          originalListId: originalListId,
        },
      };

      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [
          {
            ...exampleList,
            id: movedListId,
            products: [],
          },
          {
            ...exampleList,
            id: originalListId,
            products: [],
          },
        ],
      };

      localStorage.setItem(
        "favouriteLists",
        JSON.stringify(state.favouriteLists),
      );

      // Act
      const newState = reducer(state, action);

      const expectedLists: FavouritesListType[] = [
        {
          ...exampleList,
          id: movedListId,
          lastEdit: currentDate,
          products: [],
        },
        {
          ...state.favouriteLists![0],
          id: originalListId,
          lastEdit: currentDate,
          products: [],
        },
      ];

      // Assert
      expect(newState.favouriteLists[0].products).toStrictEqual([]);
      expect(newState.favouriteLists[1].products).toStrictEqual([]);
      expect(newState).toEqual({
        ...state,
        favouriteLists: expectedLists,
      });
    });

    it("if there is at least one list and both passed list ids are valid but products are repeated", () => {
      // Arrange
      const movedListId = "moved list id";
      const originalListId = "original list id";

      const movedProducts = [...exampleList.products!];
      movedProducts[0].quantity = 1;
      const action: ReducerActionsType = {
        type: "moveProductsFromOneListToAnother",
        payload: {
          products: movedProducts,
          listWhereProductIsMovedID: movedListId,
          originalListId: originalListId,
        },
      };

      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [
          {
            ...exampleList,
            id: movedListId,
            products: [{ ...exampleList.products![0], quantity: 1 }],
          },
          {
            ...exampleList,
            id: originalListId,
            products: exampleList.products,
          },
        ],
      };

      localStorage.setItem(
        "favouriteLists",
        JSON.stringify(state.favouriteLists),
      );

      // Act
      const newState = reducer(state, action);

      const expectedLists = [
        {
          ...exampleList,
          id: movedListId,
          lastEdit: currentDate,
          products: [
            ...exampleList.products!.map((product) => {
              return {
                ...product,
                addedDate: currentDate,
              };
            }),
          ],
        },
        {
          ...state.favouriteLists![0],
          id: originalListId,
          lastEdit: currentDate,
          products: [],
        },
      ];
      expectedLists[0].products[0].quantity =
        movedProducts[0].quantity +
        state.favouriteLists![0].products![0].quantity;

      // Assert
      expect(newState.favouriteLists[0].products).toStrictEqual(
        expectedLists[0].products,
      );
      expect(newState.favouriteLists[1].products).toStrictEqual([]);
      expect(newState).toEqual({
        ...state,
        favouriteLists: expectedLists,
      });
    });

    it("if there is at least one list and both passed list ids are valid but list where products are moved does not have `products` property", () => {
      // Arrange
      const movedListId = "moved list id";
      const originalListId = "original list id";

      const action: ReducerActionsType = {
        type: "moveProductsFromOneListToAnother",
        payload: {
          products: exampleList.products!,
          listWhereProductIsMovedID: movedListId,
          originalListId: originalListId,
        },
      };

      const state: ReducerStateType = {
        ...initState,
        favouriteLists: [
          {
            ...exampleList,
            id: movedListId,
            products: undefined, //! Set products to undefined
          },
          {
            ...exampleList,
            id: originalListId,
          },
        ],
      };

      localStorage.setItem(
        "favouriteLists",
        JSON.stringify(state.favouriteLists),
      );

      // Act
      const newState = reducer(state, action);

      const expectedLists = [
        {
          ...exampleList,
          id: movedListId,
          lastEdit: currentDate,
          products: [
            ...exampleList.products!.map((product) => {
              return {
                ...product,
                addedDate: currentDate,
              };
            }),
          ],
        },
        {
          ...state.favouriteLists![0],
          id: originalListId,
          lastEdit: currentDate,
          products: [],
        },
      ];

      // Assert
      expect(newState.favouriteLists[0].products).toStrictEqual(
        expectedLists[0].products,
      );
      expect(newState.favouriteLists[1].products).toStrictEqual([]);
      expect(newState).toEqual({
        ...state,
        favouriteLists: expectedLists,
      });
    });
  });
});
