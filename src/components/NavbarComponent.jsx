import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown, Modal } from 'react-bootstrap'; // Add Modal here
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logomasjid from '../assets/logomasjid.png';
import logosementara from '../assets/logosementara.png'; // Gambar logo profile

const NavbarComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); // State untuk modal login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentPath, setCurrentPath] = useState('');  // Simpan path halaman sebelum modal muncul

  useEffect(() => {
    // Cek status login
    // eslint-disable-next-line no-unused-vars
    const email = localStorage.getItem('loggedInUserEmail');
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'IsLogin');
  }, []);

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      setCurrentPath(location.pathname);  // Simpan halaman saat ini
      setShowModal(true);  // Tampilkan modal login jika belum login
    } else {
      navigate('/profile');  // Jika sudah login, arahkan ke halaman profile
    }
  };

  const handlePeminjamanInventarisClick = () => {
    if (!isLoggedIn) {
      setCurrentPath(location.pathname);  // Simpan halaman saat ini
      setShowModal(true);  // Tampilkan modal login jika belum login
    } else {
      navigate('/peminjaman-inventaris');  // Jika sudah login, arahkan ke menu peminjaman inventaris
    }
  };

  // Aktifkan dropdown jika route cocok
  const isJadwalActive = ['/jadwal-sholat', '/jadwal-imam'].includes(location.pathname);
  const isLaporanActive = ['/laporan-kegiatan', '/laporan-keuangan'].includes(location.pathname);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar-custom fixed-top ">
        <Container fluid>
          {/* Brand Logo */}
          <Navbar.Brand as={NavLink} to="/" className="ms-0 d-flex align-items-center">
            <img
              src={logomasjid}
              alt="Logo Masjid"
              style={{ width: '40px', marginRight: '10px', marginLeft: '20px' }}
            />
            <span style={{fontWeight:'450'}} className="">Masjid At-Taqwa</span>
          </Navbar.Brand>

          {/* Toggle Button */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Menu */}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto me-auto ps-5 gap-3 my-2">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>

              {/* Dropdown Jadwal */}
              <NavDropdown
                title="Jadwal"
                id="jadwal-dropdown"
                className={isJadwalActive ? 'active text-warning' : ''}
              >
                <NavDropdown.Item as={NavLink} to="/jadwal-sholat">
                  Jadwal Sholat
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/jadwal-imam">
                  Jadwal Imam
                </NavDropdown.Item>
              </NavDropdown>

              {/* Dropdown Laporan */}
              <NavDropdown
                title="Laporan"
                id="laporan-dropdown"
                className={isLaporanActive ? 'active text-warning' : ''}
              >
                <NavDropdown.Item as={NavLink} to="/laporan-kegiatan">
                  Laporan Kegiatan
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/laporan-keuangan">
                  Laporan Keuangan
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={handlePeminjamanInventarisClick}>
                Peminjaman Inventaris
              </Nav.Link>
            </Nav>

            {/* Logo Profile */}
            <Navbar.Brand className="logo-profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
              <img src={logosementara} alt="profile" style={{ width: '40px', marginRight: '10px', marginLeft: '20px' }} />
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal untuk Pengguna yang Belum Login */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Anda belum login. Silahkan login terlebih dahulu untuk mengakses halaman ini.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavbarComponent;
