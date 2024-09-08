import { useState, useEffect } from "react";

export const useTheme = () => {
  const [colorMode, setColorMode] = useState("light");

  useEffect(() => {
    const savedColorMode = localStorage.getItem("colorMode");
    if (savedColorMode) {
      setColorMode(savedColorMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("colorMode", colorMode);
  }, [colorMode]);

  return { colorMode, setColorMode };
};
