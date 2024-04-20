import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface DataContextProps {
  response2: string;
  statusCode2: number | null;
  imagePath: string;
  setResponse2: Dispatch<SetStateAction<string>>;
  setStatusCode2: Dispatch<SetStateAction<number | null>>;
  setImagePath: Dispatch<SetStateAction<string>>;
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
  const [response2, setResponse2] = useState<string>('');
  const [statusCode2, setStatusCode2] = useState<number | null>(null);
  const [imagePath, setImagePath] = useState<string>('');

  const value: DataContextProps = {
    response2,
    statusCode2,
    imagePath,
    setResponse2,
    setStatusCode2,
    setImagePath,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};