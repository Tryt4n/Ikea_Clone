/**
 * @file This is the main entry point for the React application.
 * It imports necessary React dependencies, global styles, and the main App component.
 * It then uses ReactDOM to render the App component into the root div element.
 */

// Importing React dependencies
// import React from "react";
import ReactDOM from "react-dom/client";

// Importing the main App component
import App from "./App";

// Importing global styles
import "./style.scss";

// Using ReactDOM to render the App component into the root div element
// Add type assertion to avoid TS error, because we know that the root element exists
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
