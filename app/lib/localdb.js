'use client';

import { useEffect, useState } from 'react';
import { _DEBUG } from './tools';

// **********************************************
// function : useLocalStorage
//  storageKey : key to get back the stored content
//  defaultValue : default content to get if no content is stored
// description : React hook to set and get content in local storage
// **********************************************
export default function useLocalStorage (storageKey, defaultValue) {
  const [value, setValue] = useState (initValue());
  
  function initValue() {
    try {
      if (typeof window !== 'undefined') {
        const storedValue = JSON.parse(window.localStorage.getItem(storageKey));
        return storedValue;
      }
    } catch (error) {
        console.error('useLocalStorage', 'get', error);
        return defaultValue;        
    }
    return defaultValue;
  }

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(storageKey, JSON.stringify(value));
      }
    } catch (error) {
      console.error('useLocalStorage', 'set', error);
    }
  }, [value, storageKey]);
  
  return [value, setValue];
}
