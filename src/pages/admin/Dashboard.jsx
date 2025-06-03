import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Selamat Datang di Dashboard Admin</h1>

      <div className="dashboard-welcome">
        <p>Ini adalah halaman utama untuk admin. Silakan pilih menu di bawah untuk mengelola data:</p>
      </div>

      <div className="dashboard-links">
        <div className="dashboard-card">
          <h3>Peminjaman Inventaris</h3>
          <p>Kelola peminjaman inventaris masjid.</p>
          <Link to="/admin/peminjaman" className="btn-dashboard">Kelola Peminjaman</Link>
        </div>

        <div className="dashboard-card">
          <h3>Jadwal Imam</h3>
          <p>Kelola jadwal imam untuk sholat Jumat.</p>
          <Link to="/admin/jadwal-imam" className="btn-dashboard">Kelola Jadwal Imam</Link>
        </div>

        <div className="dashboard-card">
          <h3>Laporan Kegiatan</h3>
          <p>Kelola laporan kegiatan masjid.</p>
          <Link to="/admin/laporan-kegiatan" className="btn-dashboard">Lihat Laporan</Link>
        </div>

        <div className="dashboard-card">
          <h3>Laporan Keuangan</h3>
          <p>Kelola laporan keuangan masjid.</p>
          <Link to="/admin/laporan-keuangan" className="btn-dashboard">Lihat Laporan</Link>
        </div>

        <div className="dashboard-card">
          <h3>Pengaturan</h3>
          <p>Kelola pengaturan aplikasi.</p>
          <Link to="/admin/settings" className="btn-dashboard">Pengaturan</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
