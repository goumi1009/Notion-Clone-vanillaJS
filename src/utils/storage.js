const storage = window.localStorage;

export const getItem = (key, defaultValue) => {
  const storedValue = JSON.parse(storage.getItem(key)) || defaultValue;
  return storedValue;
};

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
