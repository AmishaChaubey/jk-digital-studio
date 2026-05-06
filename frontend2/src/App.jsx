import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import Services from './pages/Services';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/services" element={<Services />} />

        {/* 🔒 Protected Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;