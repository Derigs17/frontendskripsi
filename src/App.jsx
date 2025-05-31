import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import UserLayout from './layout/UserLayout';
import AdminLayout from './layout/AdminLayout';

// Pages (User)
import Home from './pages/Home';
import JadwalSholat from './pages/JadwalSholat';
import JadwalImam from './pages/JadwalImam';
import LaporanKegiatan from './pages/LaporanKegiatan';
import LaporanKeuangan from './pages/LaporanKeuangan';
import PeminjamanInventaris from './pages/PeminjamanInventaris';

// Pages (Admin)
import Dashboard from './admin/Dashboard';
import PeminjamanAdmin from './admin/PeminjamanAdmin';
import JadwalImamAdmin from './admin/JadwalImamAdmin';
import LaporanKegiatanAdmin from './admin/LaporanKegiatanAdmin';
import LaporanKeuanganAdmin from './admin/LaporanKeuanganAdmin';
import Settings from './admin/Settings';

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
        </Route>

        {/* ROUTE UNTUK ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="peminjaman" element={<PeminjamanAdmin />} />
          <Route path="jadwal-imam" element={<JadwalImamAdmin />} />
          <Route path="laporan-kegiatan" element={<LaporanKegiatanAdmin />} />
          <Route path="laporan-keuangan" element={<LaporanKeuanganAdmin />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
