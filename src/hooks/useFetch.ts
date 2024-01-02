import { useEffect, useRef, useState } from "react";

type FetchReturnType<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
};

export default function useFetch<T>(URL: string, options: RequestInit = {}): FetchReturnType<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const optionsRef = useRef(options);

  useEffect(() => {
    setData(undefined);
    setIsError(false);
    setIsLoading(true);
    const controller = new AbortController();

    fetch(URL, { signal: controller.signal, ...optionsRef.current })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setIsError(true);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [URL]);

  return { data, isLoading, isError };
}
