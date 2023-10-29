// import { useEffect, useState } from "react";
// import { ArticlesType } from "../layout/Articles/types/ArticleTypes";

// export default function useFetch(url: string | ArticlesType, options = {}) {
//   const [data, setData] = useState(url);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     setData("");
//     setIsError(false);
//     setIsLoading(true);
//     const controller = new AbortController();

//     fetch(url as string, { signal: controller.signal, ...options })
//       .then((res) => {
//         if (res.status === 200) {
//           return res.json();
//         }
//         return Promise.reject(res);
//       })
//       .then((data) => {
//         setData(data);
//       })
//       .catch((error) => {
//         if (error.name === "AbortError") return;
//         setIsError(true);
//       })
//       .finally(() => {
//         if (controller.signal.aborted) return;
//         setIsLoading(false);
//       });

//     return () => controller.abort();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [url]);

//   return { data, isLoading, isError };
// }

import { useEffect, useState } from "react";

interface FetchReturnType<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
}

export default function useFetch<T>(URL: string, options: RequestInit = {}): FetchReturnType<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setData(undefined);
    setIsError(false);
    setIsLoading(true);
    const controller = new AbortController();

    fetch(URL, { signal: controller.signal, ...options })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL]);

  return { data, isLoading, isError };
}
