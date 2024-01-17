import { describe, it, expect } from "vitest";
import { ReducerActionsType, ReducerStateType } from "../types/ReducerTypes";
import { reducer } from "./reducer";
// Constants
import { initState } from "../constants/appInitState";
import { shopsList } from "../../../constants/shopsList";
import { shoppingCart } from "../../../setup-test/test-constants/shoppingCart";
import { exampleList } from "../../../setup-test/test-constants/exampleList";

describe("#reducer App Context function", () => {
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

    const state: ReducerStateType = {
      ...initState,
      shoppingCart: [
        ...shoppingCart,
        {
          ...shoppingCart[0],
          quantity: quantity,
          productNumber: productNumber,
        },
      ],
    };

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
          ...shoppingCart.slice(1),
        ],
      }),
    );
  });

  it("should return the new state based on `removeProductFromShoppingCart` action", () => {
    // Arrange
    const productNumber = "123.456.78";
    const action: ReducerActionsType = {
      type: "removeProductFromShoppingCart",
      payload: productNumber,
    };
    const state: ReducerStateType = {
      ...initState,
      shoppingCart: [
        ...shoppingCart,
        {
          ...shoppingCart[0],
          productNumber: productNumber,
        },
      ],
    };

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
      const state = {
        ...initState,
        favouriteLists: [{ ...exampleList }],
      };

      // Act
      const newState = reducer(state, action);

      // Assert
      expect(newState.favouriteLists.length).toBe(2);
      // JSON.stringify to avoid comparing date on that objects by reference
      expect(JSON.stringify(newState)).toEqual(
        JSON.stringify({
          ...state,
          favouriteLists: [action.payload.list, ...state.favouriteLists],
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
      const state = {
        ...initState,
        favouriteLists: [{ ...exampleList, id: oldListID }],
      };
      const date = new Date();

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
          addedDate: date.toISOString().slice(0, 19), // Check without milliseconds
        },
        {
          ...newState.favouriteLists[0].products[1],
          addedDate: date.toISOString().slice(0, 19), // Check without milliseconds
        },
      ]).toEqual([
        {
          ...state.favouriteLists[0].products![0],
          addedDate: date.toISOString().slice(0, 19), // Check without milliseconds
        },
        {
          ...state.favouriteLists[0].products![1],
          addedDate: date.toISOString().slice(0, 19), // Check without milliseconds
        },
      ]);

      expect(newState.favouriteLists.length).toBe(2);

      localStorage.clear(); // Clear localStorage
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

    localStorage.clear(); // Clear localStorage
  });
});
