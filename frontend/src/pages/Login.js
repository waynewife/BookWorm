import { Button } from '@/components/ui/button';
import { useTheme } from '../ThemeProvider';
import { Toggle } from '@/components/ui/toggle';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/profile');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between p-4">
        <h1 className="text-2xl font-bold text-orange-500">BookWorm</h1>
        <Toggle onPressedChange={toggleTheme} pressed={theme === 'dark'}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Toggle>
      </header>
      <main className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-3xl font-bold mb-4">Login to BookWorm</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded mb-4"
        />
        <Button onClick={handleLogin}>Login</Button>
      </main>
    </div>
  );
}