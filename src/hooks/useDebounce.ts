import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, 500]);

  return debouncedValue;
}
