import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const ThemeContext = createContext(null);

const demoUser = {
  name: 'Maya Patel',
  role: 'Store Manager',
  business: 'TradeFlow Market',
};

export function AppProviders({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('pos:user');
    return storedUser ? JSON.parse(storedUser) : demoUser;
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('pos:theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('pos:theme', theme);
  }, [theme]);

  const authValue = useMemo(
    () => ({
      user,
      login: (payload) => {
        const nextUser = { ...demoUser, email: payload.email };
        localStorage.setItem('pos:user', JSON.stringify(nextUser));
        setUser(nextUser);
      },
      logout: () => {
        localStorage.removeItem('pos:user');
        setUser(null);
      },
    }),
    [user],
  );

  const themeValue = useMemo(
    () => ({ theme, toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')) }),
    [theme],
  );

  return (
    <AuthContext.Provider value={authValue}>
      <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}
