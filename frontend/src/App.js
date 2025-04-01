import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeProvider';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Library from './pages/Library';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Read from './pages/Read';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/library" element={<Library />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/read" element={<Read />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}