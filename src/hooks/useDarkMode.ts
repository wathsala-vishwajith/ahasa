import { useEffect, useState } from 'react';

function getInitialDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const useDarkMode = (): boolean => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    const updateDarkMode = () => {
      setDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Listen for class changes (e.g., via MutationObserver)
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Listen for localStorage changes (cross-tab)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme') updateDarkMode();
    };
    window.addEventListener('storage', onStorage);

    // Initial check
    updateDarkMode();

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return darkMode;
};

export default useDarkMode; 