import { createContext, ReactNode } from 'react';

import usePersistedState from '../hooks/usePersistedState';

interface SetThemeProvider {
  children: ReactNode;
}

type SetThemeProviderProps = {
  handleToggleTheme: () => void;
  toggleTheme: string;
};

export const SetToggleThemeContext = createContext({} as SetThemeProviderProps);

export function SetToggleTheme({ children }: SetThemeProvider) {
  const [toggleTheme, setToggleTheme] = usePersistedState('theme', 'light');

  const handleToggleTheme = () => {
    if (toggleTheme === 'light') {
      setToggleTheme('dark');
    } else {
      setToggleTheme('light');
    }
  };

  const themeProvider = {
    handleToggleTheme,
    toggleTheme,
  };

  return (
    <SetToggleThemeContext.Provider value={themeProvider}>
      {children}
    </SetToggleThemeContext.Provider>
  );
}
