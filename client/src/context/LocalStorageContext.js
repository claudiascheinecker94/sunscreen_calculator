//https://chat.openai.com/c/9df8179a-b54d-441b-9ddd-494847ec17fb
import React, { createContext, useContext, useEffect, useState } from 'react';

const LocalStorageContext = createContext();

export const LocalStorageProvider = ({ children }) => {
  const [localStorageData, setLocalStorageData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('localStorageData'));
    return storedData || {};
  });

  useEffect(() => {
    localStorage.setItem('localStorageData', JSON.stringify(localStorageData));
  }, [localStorageData]);

  return (
    <LocalStorageContext.Provider value={{ localStorageData, setLocalStorageData }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);
  return context;
};