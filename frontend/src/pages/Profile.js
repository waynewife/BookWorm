import { Button } from '../components/ui/button';
import { useTheme } from '../ThemeProvider';
import { Toggle } from '../components/ui/toggle';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [readingLevel, setReadingLevel] = useState('beginner');
  const [fontPreference, setFontPreference] = useState('default');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setReadingLevel(storedUser.preferences.readingLevel);
      setFontPreference(storedUser.preferences.fontPreference);
      // Apply font preference to the entire app
      document.documentElement.classList.toggle('font-dyslexic', storedUser.preferences.fontPreference === 'open-dyslexic');
    }
  }, []);

  const handlePreferencesUpdate = async () => {
    await axios.post('http://localhost:5000/api/preferences', {
      email: user.email,
      readingLevel,
      fontPreference,
    });
    // Update local storage
    const updatedUser = { ...user, preferences: { readingLevel, fontPreference } };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    // Apply font preference
    document.documentElement.classList.toggle('font-dyslexic', fontPreference === 'open-dyslexic');
    alert('Preferences updated!');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between p-4">
        <h1 className="text-2xl font-bold text-orange-500">BookWorm</h1>
        <Toggle onPressedChange={toggleTheme} pressed={theme === 'dark'}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Toggle>
      </header>
      <div className="bg-orange-500 text-white p-6 text-center">
        <h2 className="text-3xl font-bold">Welcome, {user.email}</h2>
        <p>Customize your reading experience</p>
      </div>
      <main className="p-4">
        <div className="mb-4">
          <label className="block mb-2">Reading Level</label>
          <select
            value={readingLevel}
            onChange={(e) => setReadingLevel(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Font Preference</label>
          <select
            value={fontPreference}
            onChange={(e) => setFontPreference(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="default">Default</option>
            <option value="open-dyslexic">Open Dyslexic</option>
          </select>
        </div>
        <Button onClick={handlePreferencesUpdate}>Save Preferences</Button>
      </main>
    </div>
  );
}