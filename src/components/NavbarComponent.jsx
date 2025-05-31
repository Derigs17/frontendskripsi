import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import logomasjid from '../assets/logomasjid.png';

const NavbarComponent = () => {
  const location = useLocation();

  // Aktifkan dropdown jika route cocok
  const isJadwalActive = ['/jadwal-sholat', '/jadwal-imam'].includes(location.pathname);
  const isLaporanActive = ['/laporan-kegiatan', '/laporan-keuangan'].includes(location.pathname);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar-custom fixed-top ">
      <Container fluid>
        {/* Brand Logo */}
        <Navbar.Brand as={NavLink} to="/" className="ms-0 d-flex align-items-center">
          <img
            src={logomasjid}
            alt="Logo Masjid"
            style={{ width: '40px', marginRight: '10px', marginLeft: '20px' }}
          />
          <span className="">Masjid At-Taqwa</span>
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Menu */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto me-auto ps-5 gap-3 "  >
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

            <Nav.Link as={NavLink} to="/peminjaman-inventaris">
              Peminjaman Inventaris
            </Nav.Link>
          </Nav>

          {/* Tombol Masuk */}
          <Nav className="ms-4 " style={{ marginRight: '20px', }}>
            <Button variant="warning" className="btn-masuk" >Masuk</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
