import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Nav, Button, Modal, Container } from 'react-bootstrap'; // Import Button, Modal, and Container from React Bootstrap

const AdminLayout = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false); // State untuk collapse sidebar
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State untuk modal logout
  const navigate = useNavigate();

  // Pengecekan login status ketika pertama kali halaman di-render
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole'); // Pastikan menyimpan role setelah login

    // Jika belum login atau bukan admin, arahkan ke halaman login
    if (isLoggedIn !== 'IsLogin' || userRole !== 'admin') {
      navigate('/login'); // Redirect ke halaman login
    } else {
      // If logged in, retrieve the active menu from localStorage
      const savedActiveMenu = localStorage.getItem('activeMenu');
      if (savedActiveMenu) {
        setActiveMenu(savedActiveMenu);
      }
    }
  }, [navigate]);

  // Toggle untuk sidebar collapse
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Fungsi untuk logout dan membersihkan session
  const handleLogout = () => {
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setShowLogoutModal(false); // Tutup modal setelah logout
    navigate('/login'); // Redirect ke halaman login setelah logout
  };

  // Function to handle menu item click
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem('activeMenu', menu); // Save active menu to localStorage
  };

  return (
    <div className={`admin-wrapper ${collapsed ? 'collapsed' : ''}`}>
      <Container fluid>
        {/* Sidebar */}
        <div className="sidebar">
          <h2 style={{ color: '#333', fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
            Admin
          </h2>
          <Nav defaultActiveKey="/admin/dashboard" className="flex-column">
            <Nav.Link 
              as={Link} 
              to="/admin" 
              className={activeMenu === 'dashboard' ? 'active' : ''} 
              onClick={() => handleMenuClick('dashboard')}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/peminjaman" 
              className={activeMenu === 'peminjaman' ? 'active' : ''} 
              onClick={() => handleMenuClick('peminjaman')}
            >
              Peminjaman
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/jadwal-imam" 
              className={activeMenu === 'jadwal-imam' ? 'active' : ''} 
              onClick={() => handleMenuClick('jadwal-imam')}
            >
              Jadwal Imam
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/laporan-kegiatan" 
              className={activeMenu === 'laporan-kegiatan' ? 'active' : ''} 
              onClick={() => handleMenuClick('laporan-kegiatan')}
            >
              Laporan Kegiatan
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/laporan-keuangan" 
              className={activeMenu === 'laporan-keuangan' ? 'active' : ''} 
              onClick={() => handleMenuClick('laporan-keuangan')}
            >
              Laporan Keuangan
            </Nav.Link>
           
            <Nav.Link 
              as={Link} 
              to="/admin/user-management" 
              className={activeMenu === 'user-management' ? 'active' : ''} 
              onClick={() => handleMenuClick('user-management')}
            >
              User Management
            </Nav.Link>
          </Nav>

          {/* Admin Profile Section - Logout Button */}
          <div className="admin-profile mt-auto">
            <Button 
              variant="danger" 
              className="w-100" 
              onClick={() => setShowLogoutModal(true)} // Show logout modal
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Hamburger Toggle Button */}
        <Button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? '>' : '<'}
        </Button>

        {/* Main Content */}
        <div className="main-content">
          <Outlet />
        </div>
      </Container>

      {/* Modal konfirmasi logout */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin keluar dari akun ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminLayout;
