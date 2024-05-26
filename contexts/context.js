import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState('index'); // Initialize to 'index'

  return (
    <AppContext.Provider
      value={{
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
