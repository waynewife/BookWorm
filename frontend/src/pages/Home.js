import React from 'react';
import { Button } from '../components/ui/button';
import { useTheme } from '../ThemeProvider';
import { Toggle } from '../components/ui/toggle';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { FaFilm, FaTv, FaBook } from 'react-icons/fa';

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
    <div className={cn("min-h-screen", theme === 'light' ? "bg-white text-gray-900" : "bg-gray-900 text-white")}>
      {/* Header */}
      <header className={cn("flex items-center justify-between p-4", theme === 'light' ? "bg-white" : "bg-gray-800", "shadow")}>
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-orange-500">BookWorm</h1>
          <nav className="flex space-x-4">
            <Link to="/browse" className="text-gray-600 hover:text-orange-500">Browse</Link>
            <Link to="/library" className="text-gray-600 hover:text-orange-500">Library</Link>
            <Link to="/community" className="text-gray-600 hover:text-orange-500">Community</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className={cn("p-2 border rounded-md", theme === 'light' ? "border-gray-300" : "border-gray-600 bg-gray-800 text-white")}
          />
          <Link to="/write" className="text-gray-600 hover:text-orange-500">Write</Link>
          <Link to="/premium" className="text-gray-600 hover:text-orange-500">Try Premium</Link>
          <Toggle onPressedChange={toggleTheme} pressed={theme === 'dark'}>
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Toggle>
          {user ? (
            <>
              <span className="text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className={cn("px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600")}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className={cn("px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600")}>
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Section */}
      <main className="relative flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-white">
        {/* Decorative Orange Shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-orange-500 rounded-bl-[100px] z-0" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-orange-500 rounded-tr-[100px] z-0" />

        {/* Text Content */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold text-orange-500">Hi, we’re BookWorm.</h1>
          <p className="mt-4 text-lg text-gray-600">
            The world’s largest book reading community. Discover millions of stories and share your own! Join 90 million readers today.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link to="/browse">
              <button className={cn("px-6 py-3 rounded-md bg-orange-500 text-white hover:bg-orange-600")}>
                Start Reading
              </button>
            </Link>
            <Link to="/write">
              <button className={cn("px-6 py-3 rounded-md bg-orange-500 text-white hover:bg-orange-600")}>
                Start Writing
              </button>
            </Link>
          </div>
        </div>

        {/* Devices Image */}
        <div className="relative z-10 mt-8 md:mt-0">
          <img
            src="/devices.png"
            alt="Devices showing BookWorm app"
            className="w-full max-w-md"
            onError={() => console.log("Failed to load devices.png")}
          />
          <div className="hidden text-center text-gray-500">
            [Image of devices showing BookWorm app]
          </div>
        </div>
      </main>

      {/* See Your Story Section */}
      <section className="px-8 py-16 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">See Your Story...</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow text-center">
            <FaFilm className="text-4xl mb-4 text-orange-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Get produced to movie or film</h3>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow text-center">
            <FaTv className="text-4xl mb-4 text-orange-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Get adapted to a TV series</h3>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow text-center">
            <FaBook className="text-4xl mb-4 text-orange-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Get published</h3>
          </div>
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-500">BookWorm Studios</span>
            <span className="text-orange-500 text-2xl">📖</span>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your original story could be the next big hit
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 dark:bg-gray-700 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © 2025 BookWorm. All rights reserved.
        </p>
      </footer>
    </div>
  );
}