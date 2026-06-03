'use client';

import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xl mx-3 hover:text-yellow-500 transition-colors duration-200"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
