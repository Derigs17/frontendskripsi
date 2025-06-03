import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';  // Import Link

const AdminLayout = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Pengecekan login status ketika pertama kali halaman di-render
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole'); // Pastikan menyimpan role setelah login

    // Jika belum login atau bukan admin, arahkan ke halaman login
    if (isLoggedIn !== 'IsLogin' || userRole !== 'admin') {
      navigate('/login'); // Redirect ke halaman login
    }
  }, [navigate]);

  // Toggle untuk sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`admin-wrapper ${collapsed ? 'collapsed' : ''}`}>
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
          <li>
            <Link
              to="/admin/user-management"
              className={activeMenu === 'user-management' ? 'active' : ''}
              onClick={() => setActiveMenu('user-management')}
            >
              User Management
            </Link>
          </li>
        </ul>
      </div>

      {/* Hamburger Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {collapsed ? '>' : '<'}
      </button>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
