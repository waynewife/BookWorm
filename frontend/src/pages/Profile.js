import { useTheme } from '../ThemeProvider';
import { useAuth } from '/users/chand/OneDrive/Desktop/Projects/BookWorm3.0/frontend/src/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Please log in to view your profile.
        </h1>
        <Link to="/login">
          <button className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600">
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <header className="flex justify-between p-4 bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-orange-500">
            <Link to="/">BookWorm</Link>
          </h1>
          <nav className="ml-4">
            <Link to="/browse" className="mx-2 hover:text-orange-500">Browse</Link>
            <Link to="/library" className="mx-2 hover:text-orange-500">Library</Link>
            <Link to="/profile" className="mx-2 hover:text-orange-500">Profile</Link>
          </nav>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          <span className="ml-4 text-gray-600 dark:text-gray-300">{user.email}</span>
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Your Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Email: {user.email}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          More profile details coming soon!
        </p>
      </main>
    </div>
  );
}