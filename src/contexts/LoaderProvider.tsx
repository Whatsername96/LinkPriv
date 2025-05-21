import React, { createContext, useContext, useState, ReactNode } from 'react';

type LoaderContextType = {
  isVisible: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  function showLoader() {
    setIsVisible(true);
  }

  function hideLoader() {
    setIsVisible(false);
  }

  return (
    <LoaderContext.Provider value={{ isVisible, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}
