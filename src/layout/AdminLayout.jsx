  // src/layout/AdminLayout.jsx
  import React, { useState } from 'react';
  import { Outlet, Link } from 'react-router-dom';

  const AdminLayout = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard');

    return (
      <div className="admin-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Admin</h2>
          <ul>
            <li>
              <Link
                to="/admin"
                className={activeMenu === 'dashboard' ? 'active' : ''}
                onClick={() => setActiveMenu('dashboard')}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/peminjaman"
                className={activeMenu === 'peminjaman' ? 'active' : ''}
                onClick={() => setActiveMenu('peminjaman')}
              >
                Peminjaman
              </Link>
            </li>
            <li>
              <Link
                to="/admin/jadwal-imam"
                className={activeMenu === 'jadwal-imam' ? 'active' : ''}
                onClick={() => setActiveMenu('jadwal-imam')}
              >
                Jadwal Imam
              </Link>
            </li>
            <li>
              <Link
                to="/admin/laporan-kegiatan"
                className={activeMenu === 'laporan-kegiatan' ? 'active' : ''}
                onClick={() => setActiveMenu('laporan-kegiatan')}
              >
                Laporan Kegiatan
              </Link>
            </li>
            <li>
              <Link
                to="/admin/laporan-keuangan"
                className={activeMenu === 'laporan-keuangan' ? 'active' : ''}
                onClick={() => setActiveMenu('laporan-keuangan')}
              >
                Laporan Keuangan
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className={activeMenu === 'settings' ? 'active' : ''}
                onClick={() => setActiveMenu('settings')}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Main content area */}
        <div className="main-content">
          <Outlet />  {/* This will render the content (Dashboard, Peminjaman, etc.) */}
        </div>
      </div>
    );
  };

  export default AdminLayout;
