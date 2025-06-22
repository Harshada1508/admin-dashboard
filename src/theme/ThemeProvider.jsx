import React, { useEffect, useState } from 'react';

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div>
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-700 text-sm px-2 py-1 rounded"
      >
        {dark ? 'Light Mode' : 'Dark Mode'}
      </button>
      {children}
    </div>
  );
}
