import { useLayoutEffect, useRef } from "react";

type EventCallback<T> = (e: T) => void;

export default function useLayoutEventListener<T>(
  eventType: string,
  callback: EventCallback<T>,
  element = window
) {
  const callbackRef = useRef<EventCallback<T>>(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    if (element == null) return;

    const handler = (e: Event) => {
      callbackRef.current(e as T);
    };

    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
