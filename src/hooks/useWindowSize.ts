import { useState } from "react";
import useEventListener from "./useEventListener";

/**
 * Hook useWindowSize
 *
 * This hook returns an object containing the current window size.
 * It listens for the 'resize' event and updates the window size whenever the window is resized.
 *
 * @returns {Object} An object with 'width' and 'height' properties representing the current window size.
 */
export default function useWindowSize() {
  // Initialize state with current window width and height
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Use the useEventListener hook to listen for the 'resize' event
  // When the window is resized, update the state with the new window size
  useEventListener("resize", () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  });

  // Return the current window size
  return windowSize;
}
