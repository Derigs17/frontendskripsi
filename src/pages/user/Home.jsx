import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import bgmasjid from '../../images/bgmasjid.png'; // Gambar masjid
import bgSholat from '../../images/bgwaktusolat.png'; // Gambar jadwal sholat
import parkir from '../../assets/parkir.png'; // Gambar ikon parkir
import solat from '../../assets/solat.png'; // Gambar ikon sholat
import wudhu from '../../assets/wudhu.png'; // Gambar ikon wudhu
import infaq from '../../assets/infaq.png'; // Gambar ikon infaq
import iftar from '../../assets/iftar.png'; // Gambar ikon iftar
import zakat from '../../assets/zakat.png'; // Gambar ikon zakat
import qurban from '../../assets/qurban.png'; // Gambar ikon qurban
import itikaf from '../../assets/itikaf.png'; // Gambar ikon itikaf
import tadarus from '../../assets/tadarus.png'; // Gambar ikon tadarus
import aktifitas from '../../assets/aktifitas.png'; // Gambar ikon aktivitas
import mengaji from '../../assets/mengaji.png'; // Gambar ikon mengaji
import toilet from '../../assets/toilet.png'; // Gambar ikon toilet

const Home = () => {
  const [jadwal, setJadwal] = useState(null);
  const [now, setNow] = useState(new Date());
  const kota = 'Karawang'; // Ganti sesuai lokasi masjid kamu

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=Indonesia&method=11`)
      .then((res) => res.json())
      .then((data) => setJadwal(data.data.timings));
  }, []);

  const formatWaktu = (waktu) => `${waktu} WIB`;
  const formatTanggal = (tgl) =>
    tgl.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const waktuSholat = [
    { key: 'Fajr', label: 'Subuh' },
    { key: 'Sunrise', label: 'Terbit' },
    { key: 'Dhuhr', label: 'Dzuhur' },
    { key: 'Asr', label: 'Ashar' },
    { key: 'Maghrib', label: 'Maghrib' },
    { key: 'Isha', label: 'Isya' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
        className="home-hero"
        style={{
          backgroundImage: `url(${bgmasjid})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',  // Menjaga konten tetap di tengah
          padding: '20px',  // Memberi sedikit padding agar tidak terlalu menempel ke atas
        }}
      >
        <div
          className="home-hero-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.10)',
            zIndex: 1,
          }}
        />

        <Container
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',  // Pastikan konten bisa menyesuaikan
            justifyContent: 'center',
            height: '100%',  // Agar konten tidak berada di bagian atas
          }}
        >
          <Row>
            <Col xs={12} md={7} lg={6}>
              <h5
                className="home-subtitle"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  textAlign: 'left',
                }}
              >
                Masjid Adalah Rumah Allah
              </h5>
              <h1
                className="home-title"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                  textAlign: 'left',
                }}
              >
                Selamat Datang! <br /> di Website Masjid At-Taqwa
              </h1>
              <p
                className="home-description"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  marginBottom: '2rem',
                  fontWeight: '400',
                  lineHeight: 1.4,
                  maxWidth: '600px',
                  textAlign: 'left',
                }}
              >
                buatlah masjid sebagai tempat yang nyaman untuk beribadah, belajar, dan berinteraksi sosial. Kami menyediakan berbagai informasi dan layanan untuk mendukung kegiatan keagamaan Anda.
              </p>
              
            </Col>
          </Row>
        </Container>
      </div>


      {/* Jadwal Sholat Section */}
      <Container className="py-5">
        <h2 className="text-center mb-2">Jadwal Waktu Sholat Harian Masjid At-Taqwa</h2>
        <p className="text-center text-muted mb-4">
          Setiap detik adalah panggilan cinta dari-Nya. Waktu sholat bukan hanya jadwal,
          tapi pertemuan jiwa dengan Sang Pencipta. Waktunya kembali pada Allah.
        </p>
        <Card
          className="text-white overflow-hidden"
          style={{
            backgroundImage: `url(${bgSholat})`,
            backgroundSize: 'cover', // Gambar latar menyesuaikan layar
            backgroundPosition: 'center', // Fokus gambar di tengah
            width: '80%', // Ukuran lebar 80% untuk layar besar
            height: 'auto', // Menjaga proporsi gambar
            margin: '0 auto',
            borderRadius: '50px',
            padding: '0.5rem', // Padding agar gambar tidak menempel
            // Menambahkan media query untuk layar kecil
            '@media (max-width: 768px)': {
              width: '100%', // Mengatur gambar menjadi 100% di layar kecil
              backgroundSize: 'cover', // Menjaga gambar menutupi area dengan baik di layar kecil
            }
          }}
        >

          <Card.Body
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              backgroundColor: 'rgba(0,0,0,0.01)', // Darken the overlay
              width: '100%',
              height: '100%',
              borderRadius: '40px',
              padding: '1rem',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 6rem)', // Ukuran font responsif
                fontWeight: 'bold',
                fontFamily: 'Roboto Mono, monospace', // Menggunakan font monospace
                color: '#000',
              }}
            >
              {now.toLocaleTimeString('id-ID')}
            </h1>
            <p style={{
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '10px',
              fontFamily: 'Roboto Mono, monospace', // Menggunakan font Roboto Mono
              color: '#000'
            }}>{formatTanggal(now)}</p>

            {jadwal ? (
              <div
                className="d-flex flex-column justify-content-center align-items-center mt-4"
                style={{ gap: '1rem', width: '100%' }}
              >
                {/* Subuh card */}
                <Card
                  bg="dark"
                  text="white"
                  className="text-center shadow-sm mb-3"
                  style={{
                    minWidth: '95px',
                    maxWidth: '120px',
                    borderRadius: '12px',
                    padding: '0.6rem',
                  }}
                >
                  <Card.Body>
                    <Card.Title className="mb-1" style={{ fontSize: '0.9rem' }}>
                      Subuh
                    </Card.Title>
                    <Card.Text style={{ fontSize: '0.8rem' }}>
                      {formatWaktu(jadwal['Fajr'])}
                    </Card.Text>
                  </Card.Body>
                </Card>

                {/* Other prayer times */}
                <div
                  className="d-flex justify-content-center flex-wrap"
                  style={{
                    gap: '15px',
                    flexDirection: 'row', // Horizontal on large screens
                    justifyContent: 'center',
                    flexWrap: 'wrap', // Wrap to new row in smaller screens
                  }}
                >
                  {waktuSholat.slice(1).map((item) => (
                    <Card
                      key={item.key}
                      bg={item.key === 'Sunrise' ? 'white' : 'dark'}
                      text={item.key === 'Sunrise' ? 'dark' : 'white'}
                      className="text-center shadow-sm"
                      style={{
                        minWidth: '95px',
                        maxWidth: '120px',
                        borderRadius: '12px',
                        padding: '0.6rem',
                        margin: '5px',
                      }}
                    >
                      <Card.Body>
                        <Card.Title className="mb-1" style={{ fontSize: '0.9rem' }}>
                          {item.label}
                        </Card.Title>
                        <Card.Text style={{ fontSize: '0.8rem' }}>
                          {formatWaktu(jadwal[item.key])}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-white">Memuat jadwal...</p>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Layanan dan Fasilitas Section */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Layanan dan Fasilitas Masjid</h2>
        <p className="text-center text-muted mb-4">
          Kami menyediakan berbagai layanan dan fasilitas untuk kenyamanan Anda beribadah.
        </p>

        <Row className="d-flex flex-wrap justify-content-center gap-4">
          {/* Area Parkir */}
          <Col className="service-icon text-center">
            <img
              src={parkir}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Area Parkir"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Area Parkir</h5>
            <p>Area parkir luas dan aman untuk kendaraan Anda, tersedia dekat dengan pintu masuk.</p>
          </Col>
          {/* Area Sholat */}
          <Col className="service-icon text-center">
            <img
              src={solat}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Area Sholat"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Sholat Berjamaah</h5>
            <p>Tempat sholat yang nyaman dan luas untuk berjamaah dengan pengaturan yang rapi.</p>
          </Col>
          {/* Area Wudhu */}
          <Col className="service-icon text-center">
            <img
              src={wudhu}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Area Wudhu"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Air Wudhu</h5>
            <p>Fasilitas wudhu yang bersih dan nyaman untuk memudahkan ibadah Anda.</p>
          </Col>
          {/* Infaq */}
          <Col className="service-icon text-center">
            <img
              src={infaq}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Infaq"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Infaq & Sodakoh</h5>
            <p>Tempat untuk menyalurkan infaq dan sodakoh yang dikelola dengan baik.</p>
          </Col>
          {/* Aktifitas */}
          <Col className="service-icon text-center">
            <img
              src={aktifitas}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Aktifitas"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Kegiatan Keagamaan</h5>
            <p>Berbagai kegiatan keagamaan rutin untuk mendukung spiritualitas jamaah.</p>
          </Col>
          {/* Mengaji */}
          <Col className="service-icon text-center">
            <img
              src={mengaji}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Mengaji"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Mengajar Anak Mengaji</h5>
            <p>Program mengaji untuk anak-anak agar bisa mempelajari Al-Qur'an dengan baik.</p>
          </Col>
        </Row>

        <Row className="d-flex flex-wrap justify-content-center gap-4">
          {/* Iftar */}
          <Col className="service-icon text-center">
            <img
              src={iftar}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Iftar"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Iftar & Buka Puasa</h5>
            <p>Menyiapkan hidangan untuk berbuka puasa bagi jamaah setiap hari di bulan Ramadhan.</p>
          </Col>
          {/* Zakat */}
          <Col className="service-icon text-center">
            <img
              src={zakat}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Zakat"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Pengelolaan Zakat</h5>
            <p>Fasilitas pengumpulan dan pendistribusian zakat yang efisien dan aman.</p>
          </Col>
          {/* Qurban */}
          <Col className="service-icon text-center">
            <img
              src={qurban}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Qurban"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Qurban Idul Adha</h5>
            <p>Pelaksanaan ibadah qurban dengan penyaluran yang tepat sasaran setiap tahun.</p>
          </Col>
          {/* Itikaf */}
          <Col className="service-icon text-center">
            <img
              src={itikaf}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Itikaf"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Itikaf Bersama</h5>
            <p>Fasilitas untuk melaksanakan ibadah itikaf dengan nyaman selama bulan Ramadhan.</p>
          </Col>
          {/* Tadarus */}
          <Col className="service-icon text-center">
            <img
              src={tadarus}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Tadarus"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Kajian & Tadarus</h5>
            <p>Program kajian dan tadarus untuk memperdalam ilmu agama dan memahami Al-Qur'an.</p>
          </Col>
          {/* Toilet */}
          <Col className="service-icon text-center">
            <img
              src={toilet}  // Menggunakan gambar lokal yang sudah diimpor
              alt="Toilet"
              style={{ width: '50px', height: '50px' }}
            />
            <h5 className="mt-2">Toilet</h5>
            <p>Fasilitas toilet yang bersih dan nyaman untuk jamaah.</p>
          </Col>
        </Row>
      </Container>


    </div>
  );
};

export default Home;
