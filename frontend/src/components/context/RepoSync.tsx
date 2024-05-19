import { createContext, useState } from 'react';

export const DataContext = createContext<any>(null);

export const DataProvider = ({ children }:{children:any}) => {
  const [syncedReops, setSyncedRepos] = useState({});

  return (
    <DataContext.Provider value={{ syncedReops, setSyncedRepos }}>
      {children}
    </DataContext.Provider>
  );
};