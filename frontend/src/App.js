import { ThemeProvider } from './ThemeProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Library from './pages/Library';
import Profile from './pages/Profile';
import Browse from './pages/Browse';
import Read from './pages/Read';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/read" element={<Read />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;