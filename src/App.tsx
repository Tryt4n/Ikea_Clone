// Importing Router dependencies
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

// Importing Context providers
import { AppContextProvider } from "./context/AppContext/AppContext";
import { ToastContextProvider } from "./context/ToastContext/ToastContext";
import { ModalContextProvider } from "./context/ModalContext/ModalContext";

/**
 * `App` is the main component of the application, which includes all context providers and the router.
 *
 * Contexts provided by this component include:
 * - `AppContextProvider`: Provides context for the entire application.
 * - `ToastContextProvider`: Provides context for toast notifications.
 * - `ModalContextProvider`: Provides context for modals.
 *
 * The router is provided by `RouterProvider` and route configuration is imported from `./routes`.
 *
 */

export default function App() {
  return (
    <>
      <AppContextProvider>
        <ToastContextProvider>
          <ModalContextProvider>
            <RouterProvider router={routes} />
          </ModalContextProvider>
        </ToastContextProvider>
      </AppContextProvider>
    </>
  );
}
