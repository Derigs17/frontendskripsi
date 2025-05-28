import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavbarComponent from './components/NavbarComponent';
import Home from './pages/Home';
import JadwalSholat from './pages/JadwalSholat';
import KegiatanMasjid from './pages/KegiatanMasjid';
import DonasiOnline from './pages/DonasiOnline';
import TransparansiKeuangan from './pages/TransparansiKeuangan';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jadwal-sholat" element={<JadwalSholat />} />
        <Route path="/kegiatan-masjid" element={<KegiatanMasjid />} />
        <Route path="/donasi-online" element={<DonasiOnline />} />
        <Route path="/transparansi-keuangan" element={<TransparansiKeuangan />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
