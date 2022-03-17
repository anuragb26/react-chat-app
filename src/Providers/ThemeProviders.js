import React, { useState } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("light");
  const theme = {
    light: {
      sidePanel: {
        backgroundColor: "#3c2f3e",
        color: "white",
      },
      chatPanel: { backgroundColor: "#e9e6ea", color: "black" },
      message: { backgroundColor: "white", color: "black" },
      chatInputText: { backgroundColor: "white", color: "black" },
    },
    dark: {
      sidePanel: {
        backgroundColor: "black",
        color: "white",
        opacity: "0.8",
      },
      chatPanel: {
        backgroundColor: "black",
        color: "white",
      },
      message: {
        backgroundColor: "black",
        color: "white",
      },
      chatInputText: {
        backgroundColor: "#808080",
        color: "white",
      },
    },
  };
  const toggleTheme = () => {
    setThemeColor(themeColor === "dark" ? "light" : "dark");
  };
  return (
    <ThemeContext.Provider value={{ theme: theme[themeColor], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
