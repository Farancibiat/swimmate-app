import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from '@/pages/Home';
import Dashboard from '@/layouts/Dashboard';
import { Register } from '@/pages/Register/Register';
import { Login } from '@/pages/Login';

export const MainRoutes=()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
      </Routes>
    </Router>
  );
}

