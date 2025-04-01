import React from 'react';
import { Button } from '../components/ui/button';
import { useTheme } from '../ThemeProvider';
import { ThemeProvider } from '../ThemeProvider';
import { Toggle } from '../components/ui/toggle';
import { useAuth } from '/users/chand/OneDrive/Desktop/Projects/BookWorm3.0/frontend/src/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex justify-between p-4 bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-orange-500">BookWorm</h1>
          <nav className="ml-4">
            <Link to="/browse" className="mx-2 hover:text-orange-500">Browse</Link>
            <Link to="/library" className="mx-2 hover:text-orange-500">Library</Link>
          </nav>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          <Link to="/login">
            <button className="ml-4 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600">
              Login / Sign Up
            </button>
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-5xl font-bold text-orange-500">Hi, we’re BookWorm.</h1>
        <p className="mt-4 text-lg max-w-md">
          The world’s largest book reading community. Discover millions of stories and share your own!
        </p>
        <img src="/devices.png" alt="Devices" className="mt-6 w-1/2" />
        <div className="mt-6 flex space-x-4">
          <Link to="/browse">
            <button className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600">
              Start Reading
            </button>
          </Link>
          <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
            Start Writing
          </button>
        </div>
      </main>
    </div>
  );
}