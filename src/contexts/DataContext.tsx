import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface DataContextProps {
  response: string;
  statusCode: number | null;
  setResponse: Dispatch<SetStateAction<string>>;
  setStatusCode: Dispatch<SetStateAction<number | null>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [response, setResponse] = useState<string>('');
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const value: DataContextProps = {
    response,
    statusCode,
    setResponse,
    setStatusCode,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};