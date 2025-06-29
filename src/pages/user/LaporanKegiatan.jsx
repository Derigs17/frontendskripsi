import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const LaporanKegiatanUser = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [kegiatanAkanDatang, setKegiatanAkanDatang] = useState([]);
  const [kegiatanTelahSelesai, setKegiatanTelahSelesai] = useState([]);

  // Ambil data kegiatan dari backend
  const fetchKegiatan = async () => {
    try {
      const response = await axios.get('https://backendskripsi.vercel.app/getAllKegiatan');
      setKegiatan(response.data);
    } catch (error) {
      console.error('Error fetching kegiatan:', error);
    }
  };

  useEffect(() => {
    fetchKegiatan();
  }, []);

  useEffect(() => {
    setKegiatanAkanDatang(kegiatan.filter((kg) => kg.status === 'Akan Datang'));
    setKegiatanTelahSelesai(kegiatan.filter((kg) => kg.status === 'Telah Selesai'));
  }, [kegiatan]);

  return (
    <Container className="mt-5 mb-5">
      {/* Kegiatan Akan Datang */}
      <h2 className="mb-4 text-center" style={{ color: '#ffffff', backgroundColor: '#0D1B2A', padding: '10px', borderRadius: '5px' }}>
  Kegiatan Akan Datang
</h2>
      <Row className="g-4 mb-5">
        {kegiatanAkanDatang.map((kg) => (
          <Col md={4} key={kg.id}>
            <Card className="h-100">
              <img src={kg.gambar} alt="Gambar Kegiatan" />
              <Card.Body>
                <Card.Title>{kg.judul}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{kg.tanggal}</Card.Subtitle>
                <Card.Text>{kg.deskripsi}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Kegiatan Telah Selesai */}
      <h2 className="mb-4 text-center" style={{ color: '#ffffff', backgroundColor: '#0D1B2A', padding: '10px', borderRadius: '5px' }}>
  Kegiatan Telah Selesai
</h2>

      <Row className="g-4">
        {kegiatanTelahSelesai.map((kg) => (
          <Col md={4} key={kg.id}>
            <Card className="h-100">
              <img src={kg.gambar} alt="Gambar Kegiatan" />
              <Card.Body>
                <Card.Title>{kg.judul}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{kg.tanggal}</Card.Subtitle>
                <Card.Text>{kg.deskripsi}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LaporanKegiatanUser;
