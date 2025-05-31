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

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jadwal-sholat" element={<JadwalSholat />} />
        <Route path="/jadwal-imam" element={<JadwalImam />} />
        <Route path="/laporan-kegiatan" element={<LaporanKegiatan />} />
        <Route path="/laporan-keuangan" element={<LaporanKeuangan />} />
        <Route path="/peminjaman-inventaris" element={<PeminjamanInventaris />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
