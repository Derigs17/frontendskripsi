// src/Admin/AdminLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const AdminLayout = () => {
  return (
    <div className="admin-container" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', backgroundColor: '#2c3e50', color: 'white', padding: '1rem' }}>
        <h2>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/admin/dashboard" style={{ color: 'white' }}>Dashboard</Link>
          <Link to="/admin/jadwal-imam" style={{ color: 'white' }}>Jadwal Imam</Link>
          <Link to="/admin/peminjaman" style={{ color: 'white' }}>Peminjaman</Link>
          <Link to="/admin/keuangan" style={{ color: 'white' }}>Keuangan</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#ecf0f1' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
