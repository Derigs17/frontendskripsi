  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

  // Layouts
  import UserLayout from './layout/UserLayout';
  import AdminLayout from './layout/AdminLayout';

  // Pages (User)
  import Home from './pages/user/Home';
  import JadwalSholat from './pages/user/JadwalSholat';
  import JadwalImam from './pages/user/JadwalImam';
  import LaporanKegiatan from './pages/user/LaporanKegiatan';
  import LaporanKeuangan from './pages/user/LaporanKeuangan';
  import PeminjamanInventaris from './pages/user/PeminjamanInventaris';
  import UserProfile from './pages/user/UserProfile'; // Import User Profile

  // Pages (Admin)
  import Dashboard from './pages/admin/Dashboard';
  import PeminjamanAdmin from './pages/admin/PeminjamanAdmin';
  import JadwalImamAdmin from './pages/admin/JadwalImamAdmin';
  import LaporanKegiatanAdmin from './pages/admin/LaporanKegiatanAdmin';
  import LaporanKeuanganAdmin from './pages/admin/LaporanKeuanganAdmin';

  import UserManagement from './pages/admin/UserManagement';  // Import User Management

  // Auth Pages
  import Login from './pages/auth/Login';
  import Register from './pages/auth/Register';

  function App() {
    return (
      <Router>
        <Routes>

          {/* ROUTE UNTUK USER */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="jadwal-sholat" element={<JadwalSholat />} />
            <Route path="jadwal-imam" element={<JadwalImam />} />
            <Route path="laporan-kegiatan" element={<LaporanKegiatan />} />
            <Route path="laporan-keuangan" element={<LaporanKeuangan />} />
            <Route path="peminjaman-inventaris" element={<PeminjamanInventaris />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* ROUTE UNTUK ADMIN */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="peminjaman" element={<PeminjamanAdmin />} />
            <Route path="jadwal-imam" element={<JadwalImamAdmin />} />
            <Route path="laporan-kegiatan" element={<LaporanKegiatanAdmin />} />
            <Route path="laporan-keuangan" element={<LaporanKeuanganAdmin />} />
            
            <Route path="user-management" element={<UserManagement />} /> {/* Add route for User Management */}
          </Route>

          {/* ROUTE UNTUK LOGIN DAN REGISTER */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    );
  }

  export default App;
