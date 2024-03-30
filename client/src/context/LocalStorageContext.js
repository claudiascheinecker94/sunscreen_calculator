//https://chat.openai.com/c/9df8179a-b54d-441b-9ddd-494847ec17fb
import React, { createContext, useContext, useEffect, useState } from 'react';

const LocalStorageContext = createContext();

export const LocalStorageProvider = ({ id, children }) => {
  
  const [localStorageData, setLocalStorageData] = useState({});
  const userKey = `localStorageData_${id}`;
  //result of console.log(userKey) - localStorageData_65c9201a67566c8e654f3f3f

  useEffect(() => {
    console.log('inside useEffect' + userKey);
    const storedData = JSON.parse(localStorage.getItem(userKey));
    if (storedData) {
      setLocalStorageData(storedData);
    }
  }, [userKey]);


  const updateLocalStorageData = (id, newData) => {
    setLocalStorageData(newData);
    localStorage.setItem(userKey, JSON.stringify(newData));
  };

  return (
    <LocalStorageContext.Provider value={{ localStorageData, updateLocalStorageData }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error('useLocalStorage must be used within a LocalStorageProvider');
  }
  const { localStorageData = {}, updateLocalStorageData } = context;

  return { localStorageData, updateLocalStorageData };
};