import { Button } from '../components/ui/button';
import { useTheme } from '../ThemeProvider';
import { Toggle } from '../components/ui/toggle';
import { Link } from 'react-router-dom';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

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
          <Toggle onPressedChange={toggleTheme} pressed={theme === 'dark'}>
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Toggle>
          <Link to="/login">
            <Button className="ml-4">Login / Sign Up</Button>
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
          <Button asChild>
            <Link to="/browse">Start Reading</Link>
          </Button>
          <Button variant="outline">Start Writing</Button>
        </div>
      </main>
    </div>
  );
}