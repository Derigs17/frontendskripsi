import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';

const JadwalSholat = () => {
  const [jadwalSholat, setJadwalSholat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const kota = 'Sukabumi'; // Ganti dengan kota yang Anda inginkan
  const negara = 'Indonesia'; // Ganti dengan negara yang Anda inginkan

  useEffect(() => {
    // Ambil data jadwal sholat untuk satu bulan
    axios
      .get(`https://api.aladhan.com/v1/calendarByCity`, {
        params: {
          city: kota,
          country: negara,
          method: 2, // Metode perhitungan sholat (2 adalah ISNA)
          month: new Date().getMonth() + 1, // Bulan ini
          year: new Date().getFullYear(), // Tahun ini
        },
      })
      .then((response) => {
        setJadwalSholat(response.data.data);
        setLoading(false); // Selesai mengambil data
      })
      .catch((error) => {
        console.error("Ada kesalahan saat mengambil data:", error);
        setLoading(false);
      });

    // Set interval untuk memperbarui waktu setiap detik
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const formattedDate = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      setCurrentDateTime(`${formattedTime} - ${formattedDate}`);
    }, 1000); // Update setiap 1 detik

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {/* Menampilkan waktu dan tanggal saat ini */}
              <div 
                style={{
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  textAlign: 'center', 
                  marginBottom: '10px',
                  fontFamily: 'Roboto Mono, monospace' // Menggunakan font Roboto Mono
                }}
              >
                {currentDateTime.split(' - ')[0]} {/* Menampilkan jam dan detik */}
              </div>
              <div 
                style={{
                  fontSize: '20px', 
                  textAlign: 'center', 
                  fontFamily: 'Roboto Mono, monospace'
                }}
              >
                {currentDateTime.split(' - ')[1]} {/* Menampilkan tanggal */}
              </div>

              <Card.Title className='pt-3'>Jadwal Sholat</Card.Title>
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status" />
                </div>
              ) : (
                <div className="table-responsive"> {/* Membuat tabel responsif */}
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Tanggal</th>
                        <th>Subuh</th>
                        <th>Dzuhur</th>
                        <th>Ashar</th>
                        <th>Maghrib</th>
                        <th>Isha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jadwalSholat.map((item, index) => (
                        <tr key={index}>
                          <td>{item.date.gregorian.date}</td>
                          <td>{item.timings.Fajr}</td>
                          <td>{item.timings.Dhuhr}</td>
                          <td>{item.timings.Asr}</td>
                          <td>{item.timings.Maghrib}</td>
                          <td>{item.timings.Isha}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JadwalSholat;
