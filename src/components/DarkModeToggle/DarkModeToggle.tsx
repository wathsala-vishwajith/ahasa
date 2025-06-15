import { useEffect, useState } from 'react';
import { FaSun, FaRegMoon } from 'react-icons/fa';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      className={`dark-mode-toggle${darkMode ? ' dark' : ''}`}
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <FaSun size={22} /> : <FaRegMoon size={22} />}
    </button>
  );
};

export default DarkModeToggle;
