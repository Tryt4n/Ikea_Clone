// Import hooks from react-router-dom
import { useRouteError } from "react-router-dom";

/**
 * ErrorPage is a functional component that uses the useRouteError hook from react-router-dom to get any routing errors.
 * It renders a fragment containing an h2 element with a generic error message.
 * If the application is not in production mode and the error is an instance of Error, it also renders the error message and stack trace.
 *
 * @returns {JSX.Element} A fragment containing an h2 element with a generic error message, and optionally the error message and stack trace.
 */

function ErrorPage() {
  // Get any routing errors using the useRouteError hook from react-router-dom.
  const error = useRouteError();

  return (
    <>
      <h2>Error - Something went wrong</h2>

      {/* If the application is not in production mode and the error is an instance of Error, render the error message and stack trace. */}
      {import.meta.env.MODE !== "production" && error instanceof Error && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}

export default ErrorPage;
