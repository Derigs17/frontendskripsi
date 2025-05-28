import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Gunakan NavLink untuk berpindah halaman
import logomasjid from '../images/logomasjid.png';

const sections = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'jadwal-sholat', label: 'Waktu Solat', path: '/jadwal-sholat' },
  { id: 'kegiatan-masjid', label: 'Kegiatan', path: '/kegiatan-masjid' },
  { id: 'donasi-online', label: 'Donasi', path: '/donasi-online' },
  { id: 'transparansi-keuangan', label: 'Keuangan', path: '/transparansi-keuangan' },
];

const NavbarComponent = () => {
  const [, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentSection = 'home';

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && scrollPosition >= el.offsetTop) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar expand="lg" className="navbar-custom fixed-top" bg="light">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src={logomasjid}
            alt="Logo Masjid"
            style={{ width: '50px', marginRight: '15px' }}
          />
          Masjid At-Taqwa
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto">
            {sections.map((section) => (
              <NavLink
                key={section.id}
                to={section.path}  // Menggunakan 'to' untuk navigasi ke halaman yang berbeda
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {section.label}
              </NavLink>
            ))}
          </Nav>
          <Button variant="warning" className="btn-masuk">
            Masuk
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
