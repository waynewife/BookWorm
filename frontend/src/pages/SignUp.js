import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '/users/chand/OneDrive/Desktop/Projects/BookWorm3.0/frontend/src/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signupWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      await signupWithEmail(email, password);
      navigate('/library'); // Redirect to Library after sign-up
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
      navigate('/library'); // Redirect to Library after sign-up
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
          <Link to="/login">
            <button className="ml-4 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600">
              Login
            </button>
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Sign Up for BookWorm</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleEmailSignUp} className="flex flex-col w-80">
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="mb-4 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={handleGoogleSignUp}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Sign Up with Google
        </button>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
        </p>
      </main>
    </div>
  );
}