  import React, { useEffect, useState } from 'react';
  import { Container, Row, Col, Card } from 'react-bootstrap';
  import bgSholat from '../images/bgwaktusolat.png';

  const JadwalSholat = () => {
    const [jadwal, setJadwal] = useState(null);
    const [now, setNow] = useState(new Date());
    const kota = 'Jakarta'; // Ganti sesuai lokasi masjid kamu

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
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      aspectRatio: '2 / 1',
      borderRadius: '50px',
    }}
  >
    <Card.Body
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        backgroundColor: 'rgba(0,0,0,0.05)', // Darken the overlay
        width: '100%',
        height: '100%',
        borderRadius: '40px',
      }}
    >
      <h1 style={{ fontSize: '6rem', fontWeight: 'bold', fontFamily: 'Mono', color: '#000' }}>
        {now.toLocaleTimeString('id-ID')}
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#fff' }}>{formatTanggal(now)}</p>

      {/* Check if jadwal is available */}
      {jadwal ? (
        <div className="d-flex justify-content-center flex-column mt-4" style={{ gap: '1px' }}>
          {/* Subuh above Terbit */}
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

          {/* Other prayer times in one row */}
          <div className="d-flex justify-content-center flex-wrap" style={{ gap: '25px' }}>
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
    );
  };

  export default JadwalSholat;
