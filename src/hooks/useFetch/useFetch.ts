import { useEffect, useRef, useState } from "react";

type FetchReturnType<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
};

/**
 * Hook useFetch
 *
 * This hook fetches data from a given URL and returns the data, a loading state, and an error state.
 *
 * @param URL - The URL from which to fetch data.
 * @param options - Optional. An object containing any custom settings that you want to apply to the request.
 * @returns {Object} An object with 'data', 'isLoading', and 'isError' properties.
 */
export default function useFetch<T>(
  URL: string,
  options: RequestInit = {}
): FetchReturnType<T> {
  // Initialize state variables
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Use a ref to store the options object to prevent unnecessary re-renders
  const optionsRef = useRef(options);

  useEffect(() => {
    // Reset state variables before each fetch
    setData(undefined);
    setIsError(false);
    setIsLoading(true);

    // Create an AbortController instance to be able to cancel the fetch request
    const controller = new AbortController();

    // Fetch data from the given URL
    fetch(URL, { signal: controller.signal, ...optionsRef.current })
      .then((res) => {
        // If the response is OK, return the JSON data
        // Otherwise, reject the promise with the response
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        // Set the fetched data
        setData(data);
      })
      .catch((error) => {
        // If the fetch was aborted, do nothing
        // Otherwise, set the error state
        if (error.name === "AbortError") return;
        setIsError(true);
      })
      .finally(() => {
        // If the fetch was aborted, do nothing
        // Otherwise, set the loading state to false
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });

    // Cancel the fetch request when the component is unmounted or the URL changes
    return () => controller.abort();
  }, [URL]);

  // Return the data, loading state, and error state
  return { data, isLoading, isError };
}
