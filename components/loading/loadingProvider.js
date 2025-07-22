'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 3 seconds minimum loading time

    return () => clearTimeout(timer);
  }, []);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
