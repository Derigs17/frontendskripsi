import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';

import Home from './pages/Home';
import JadwalSholat from './pages/JadwalSholat';
import JadwalImam from './pages/JadwalImam';
import LaporanKegiatan from './pages/LaporanKegiatan';
import LaporanKeuangan from './pages/LaporanKeuangan';
import PeminjamanInventaris from './pages/PeminjamanInventaris';

// Admin Layout & Pages
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import PeminjamanAdmin from './admin/PeminjamanAdmin';

function App() {
  return (
    <Router>
      <Routes>
        {/* ROUTE UMUM DENGAN NAVBAR & FOOTER */}
        <Route
          path="/*"
          element={
            <div className="d-flex flex-column min-vh-100">
              <NavbarComponent />
              <main className="flex-fill">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/jadwal-sholat" element={<JadwalSholat />} />
                  <Route path="/jadwal-imam" element={<JadwalImam />} />
                  <Route path="/laporan-kegiatan" element={<LaporanKegiatan />} />
                  <Route path="/laporan-keuangan" element={<LaporanKeuangan />} />
                  <Route path="/peminjaman-inventaris" element={<PeminjamanInventaris />} />
                </Routes>
              </main>
              <FooterComponent />
            </div>
          }
        />

        {/* ROUTE ADMIN DENGAN LAYOUT KHUSUS */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="peminjaman" element={<PeminjamanAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
