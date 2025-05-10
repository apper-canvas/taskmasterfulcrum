import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || 
          (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    toast.info(
      `Switched to ${!darkMode ? 'dark' : 'light'} mode`, 
      { icon: !darkMode ? "🌙" : "☀️" }
    );
  };

  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  
  return (
    <div className="min-h-screen">
      <button 
        onClick={toggleDarkMode}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-surface-200 dark:bg-surface-700 shadow-lg hover:bg-surface-300 dark:hover:bg-surface-600 transition-all duration-200"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
      </button>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-xl shadow-soft font-medium text-sm"
      />
    </div>
  );
}

export default App;