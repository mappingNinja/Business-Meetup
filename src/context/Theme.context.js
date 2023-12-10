import React, { createContext, useState } from "react";

const initialState = {
  dark: false,
};

export const ThemeContext = createContext(null);

export const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState(initialState);

  const setLightTheme = () => {
    setTheme({ dark: false });
    localStorage.setItem("dark", false);
  };
  const setDarkTheme = () => {
    setTheme({ dark: true });
    localStorage.setItem("dark", true);
  };

  const setLightThemeLogout = () => {
    setTheme({ dark: false });
    localStorage.setItem("logoutThemeDark", false);
    localStorage.setItem("dark", false);
  };
  const setDarkThemeLogout = () => {
    setTheme({ dark: true });
    localStorage.setItem("logoutThemeDark", true);
    localStorage.setItem("dark", true);
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      localStorage.setItem("dark", !prev.dark);

      return {
        dark: !prev.dark,
      };
    });
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setLightTheme,
        setDarkTheme,
        toggleTheme,
        setLightThemeLogout,
        setDarkThemeLogout,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
