import { Button } from '@/components/ui/button';
import { useTheme } from '../ThemeProvider';
import { Toggle } from '@/components/ui/toggle';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

export default function Read() {
  const { theme, toggleTheme } = useTheme();
  const [book, setBook] = useState(null);
  const location = useLocation();
  const bookId = new URLSearchParams(location.search).get('bookId');

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
      );
      setBook(response.data);
    };
    fetchBook();
  }, [bookId]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between p-4">
        <h1 className="text-2xl font-bold text-orange-500">BookWorm</h1>
        <Toggle onPressedChange={toggleTheme} pressed={theme === 'dark'}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Toggle>
      </header>
      <main className="p-4">
        <h2 className="text-3xl font-bold mb-4">{book.volumeInfo.title}</h2>
        <p className="text-lg mb-4">{book.volumeInfo.authors?.join(', ')}</p>
        <div className="prose max-w-3xl mx-auto">
          <p>{book.volumeInfo.description || 'No description available.'}</p>
        </div>
        <Button asChild className="mt-4">
          <Link to="/browse">Back to Browse</Link>
        </Button>
      </main>
    </div>
  );
}