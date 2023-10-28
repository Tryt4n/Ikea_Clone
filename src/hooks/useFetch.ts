// import { useEffect, useState } from "react";

// export default function useFetch(url, options = {}) {
//   const [data, setData] = useState(url);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     setData(undefined);
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
//   }, [url]);

//   return { data, isLoading, isError };
// }
