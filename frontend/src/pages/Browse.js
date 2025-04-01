import { Button } from '../components/ui/button';
import { useTheme } from '../ThemeProvider';
import { ThemeProvider } from '../ThemeProvider';
import { Toggle } from '../components/ui/toggle';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Browse() {
  const { theme, toggleTheme } = useTheme();
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('fiction');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    const fetchBooks = async () => {
      const readingLevel = storedUser?.preferences?.readingLevel || 'beginner';
      const response = await axios.get('http://localhost:5000/api/books', {
        params: { q: searchQuery, readingLevel },
      });
      setBooks(response.data);
    };
    fetchBooks();
  }, [searchQuery]);

  const addToReadingList = async (book) => {
    if (!user) {
      alert('Please login to add books to your reading list');
      return;
    }
    const bookData = {
      bookId: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      cover: book.volumeInfo.imageLinks?.thumbnail || '',
    };
    await axios.post('http://localhost:5000/api/reading-list', {
      email: user.email,
      book: bookData,
    });
    alert('Book added to reading list!');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between p-4">
        <h1 className="text-2xl font-bold text-orange-500">BookWorm</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded mr-4"
          />
          <Toggle onPressedChange={toggleTheme} pressed={theme === 'dark'}>
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Toggle>
        </div>
      </header>
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Top Picks for You</h2>
        <div className="grid grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-card p-4 rounded-lg shadow">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || ''}
                alt={book.volumeInfo.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="font-bold">{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <div className="flex space-x-2 mt-2">
                <Button onClick={() => addToReadingList(book)}>
                  Add to Reading List
                </Button>
                <Button asChild variant="outline">
                  <Link to={`/read?bookId=${book.id}`}>Read</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}