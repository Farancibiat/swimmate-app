import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from '@/pages/Home';
import PrivateSiteMenu from '@/layouts/PrivateSite';
import { Register } from '@/pages/Register/Register';
import { Login } from '@/pages/Login';
import { NotFound } from '@/pages/NotFound';

export const MainRoutes=()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app/*" element={<PrivateSiteMenu />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

