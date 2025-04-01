import React from 'react';
import { Button } from '../components/ui/button';
import { useTheme } from '../ThemeProvider';
import { Toggle } from '../components/ui/toggle';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Login() {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginWithEmail, loginWithGoogle } = useAuth();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      navigate('/library'); // Redirect to Library after login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/library'); // Redirect to Library after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <header className="flex justify-between p-4 bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-orange-500">
            <Link to="/">BookWorm</Link>
          </h1>
        </div>
        <div className="flex items-center">
          <Link to="/signup">
            <button className="ml-4 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600">
              Sign Up
            </button>
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Login to BookWorm</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleEmailLogin} className="flex flex-col w-80">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="mb-4 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Login with Google
        </button>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Don’t have an account? <Link to="/signup" className="text-orange-500 hover:underline">Sign Up</Link>
        </p>
      </main>
    </div>
  );
}