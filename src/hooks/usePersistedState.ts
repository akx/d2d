import React, { SetStateAction } from "react";

type UsePersistedState = <T>(key: string, defaultValue: T) => [T, React.Dispatch<SetStateAction<T>>];

function usePersistedState<T>(
  storage: Storage,
  storageKey: string,
  key: string,
  defaultValue: T,
): [T, React.Dispatch<SetStateAction<T>>] {
  const fullKey = `${storageKey}:${key}`;
  const [value, setValue] = React.useState<T>(() => {
    const storedValue = storage.getItem(fullKey);
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue) as T;
      } catch (e) {
        console.error(`Failed to parse stored value for key ${fullKey}:`, e);
      }
    }
    return defaultValue;
  });
  React.useEffect(() => {
    storage.setItem(fullKey, JSON.stringify(value));
  }, [storage, fullKey, value]);
  return [value, setValue];
}

export function createPersistedState(storageKey: string, storage: Storage): [UsePersistedState] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hook: UsePersistedState = (key, defaultValue) => usePersistedState(storage, storageKey, key, defaultValue);
  return [hook];
}
