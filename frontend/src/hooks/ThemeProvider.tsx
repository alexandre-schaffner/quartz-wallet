import { createSignal, createContext, useContext } from "solid-js";

const ThemeContext = createContext();

export function ThemeProvider(props) {
  const themes = ["light", "dark", "solarpunk"];
  const [theme, setSignalTheme] = createSignal(themes[0]);

  function setTheme(_theme: number | string) {
    if (typeof (_theme) === "number" && _theme < themes.length && _theme >= 0)
      setSignalTheme(themes[_theme]);
    else if (typeof (_theme) === "string")
      setSignalTheme(_theme);
  }

  return (
    <ThemeContext.Provider value={{ themes, theme, setTheme }}>
      <div class={theme()}>
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() { return useContext(ThemeContext); }