import React, { createContext, useState, useContext } from "react";

// Renk modu bağlamını oluşturun
const ColorModeContext = createContext({
  mode: "light",
  toggleColorMode: () => {},
});

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}
