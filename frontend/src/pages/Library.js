import { Button } from '@/components/ui/button';
import { useTheme } from '../ThemeProvider';
import { Toggle } from '@/components/ui/toggle';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Library() {
  const { theme, toggleTheme } = useTheme();
  const [readingList, setReadingList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchReadingList(storedUser.email);
    }
  }, []);

  const fetchReadingList = async (email) => {
    const response = await axios.get('http://localhost:5000/api/reading-list', {
      params: { email },
    });
    setReadingList(response.data);
  };

  const removeFromReadingList = async (bookId) => {
    await axios.delete('http://localhost:5000/api/reading-list', {
      data: { email: user.email, bookId },
    });
    setReadingList(readingList.filter((book) => book.bookId !== bookId));
  };

  if (!user) return <div>Please login to view your library</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between p-4">
        <h1 className="text-2xl font-bold text-orange-500">BookWorm</h1>
        <Toggle onPressedChange={toggleTheme} pressed={theme === 'dark'}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Toggle>
      </header>
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Reading List</h2>
        <div className="grid grid-cols-3 gap-4">
          {readingList.map((book) => (
            <div key={book.bookId} className="bg-card p-4 rounded-lg shadow">
              <img
                src={book.cover || ''}
                alt={book.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="font-bold">{book.title}</h3>
              <p>{book.authors?.join(', ')}</p>
              <Button
                variant="destructive"
                onClick={() => removeFromReadingList(book.bookId)}
                className="mt-2"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}