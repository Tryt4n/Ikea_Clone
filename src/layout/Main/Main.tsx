// Import react router dom dependencies
import { Outlet } from "react-router-dom";

/**
 * Main
 *
 * Component that serves as the main layout for the application. It uses the `Outlet` component from `react-router-dom`
 * to render the component for the current route.
 *
 * The component is wrapped in a `main` HTML element with a class of `page-container`, and the `Outlet` component is wrapped
 * in a `div` element with a class of `main-layout`. These classes can be used to apply styles to the layout.
 *
 * @returns {JSX.Element} The Main component.
 */
export default function Main() {
  return (
    <main className="page-container">
      <div className="main-layout">
        <Outlet />
      </div>
    </main>
  );
}
