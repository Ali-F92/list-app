import { useEffect } from "react";
import { useSearchParams } from "react-router";

export function useSyncSearchParam(key: string, value: string) {
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    });
  }, [key, value, setSearchParams]);
}
