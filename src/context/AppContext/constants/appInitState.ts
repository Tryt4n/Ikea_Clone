// Import types
import type { ReducerStateType } from "../types/ReducerTypes";

/**
 * Constant of the initial app state.
 *
 * @returns {ReducerStateType} Init state of the App.
 */

export const initState: ReducerStateType = {
  postalCode: "",
  isPostalCodeErrorMessageVisible: false,
  postalCodeErrorMessage: "",
  rememberPostalCodeCheckboxStatus: true,
};
