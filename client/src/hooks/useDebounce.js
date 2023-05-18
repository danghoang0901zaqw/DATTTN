import { useEffect, useState } from "react";

const useDebounce = (delay, value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  });
  return debouncedValue;
};
export default useDebounce;
