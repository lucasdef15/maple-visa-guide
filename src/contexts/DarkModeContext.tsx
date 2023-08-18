import { createContext, useState } from 'react';

interface DarkModeContextValue {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DarkModeContext = createContext<DarkModeContextValue>({
  darkMode: false,
  setDarkMode: () => {},
});

const DarkModeProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const contextValue: DarkModeContextValue = {
    darkMode,
    setDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };
