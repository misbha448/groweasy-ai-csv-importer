/**
 * Custom Hooks
 * Reusable React logic
 */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useAsync Hook - Handle async operations
 * @param {Function} asyncFunction - Async function to execute
 * @param {boolean} immediate - Execute immediately on mount
 * @param {Array} dependencies - Dependency array
 * @returns {Object} - State and helpers
 */
export function useAsync(asyncFunction, immediate = true, dependencies = []) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err);
      setStatus('error');
      throw err;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      const timer = setTimeout(() => {
        execute();
      }, 0);

      return () => clearTimeout(timer);
    }
    return undefined;
    // The dependency list is an intentional hook API parameter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute, immediate, ...dependencies]);

  return { execute, status, data, error };
}

/**
 * useLocalStorage Hook - Persist state to localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value
 * @returns {Array} - [value, setValue]
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return defaultValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error writing to localStorage: ${error}`);
    }
  };

  return [value, setStoredValue];
}

/**
 * useDebounce Hook - Debounce value changes
 * @param {*} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {*} - Debounced value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * usePrevious Hook - Access previous value
 * @param {*} value - Current value
 * @returns {*} - Previous value
 */
export function usePrevious(value) {
  const [state, setState] = useState({
    current: value,
    previous: undefined
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState((prevState) => ({
        current: value,
        previous: prevState.current
      }));
    }, 0);

    return () => clearTimeout(timer);
  }, [value]);

  return state.previous;
}

/**
 * useMount Hook - Run effect on mount
 * @param {Function} callback - Callback to run
 */
export function useMount(callback) {
  useEffect(() => {
    callback();
  }, [callback]);
}

/**
 * useUnmount Hook - Run effect on unmount
 * @param {Function} callback - Callback to run
 */
export function useUnmount(callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => callbackRef.current();
  }, []);
}
