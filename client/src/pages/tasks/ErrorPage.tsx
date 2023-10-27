import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h2>Error - Something went wrong</h2>
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
