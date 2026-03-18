// src/hooks/useThemeContext.js
// Зберігаємо значення теми dark/light в localStorage

import { useState, useEffect } from 'react';

const useThemeContext = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return [theme, setTheme];
};

export default useThemeContext;
