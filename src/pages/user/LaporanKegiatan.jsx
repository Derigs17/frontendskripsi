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
      const response = await axios.get('http://localhost:8001/getAllKegiatan');
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
    <Container className="my-3">
      <h2 className="mb-4 fw-bold">Kegiatan Akan Datang</h2>
      <Row className="g-4 mb-5">
        {kegiatanAkanDatang.map((kg) => (
          <Col md={4} key={kg.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={`http://localhost:8001/uploads/${kg.gambar}`} />
              <Card.Body>
                <Card.Title>{kg.judul}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{kg.tanggal}</Card.Subtitle>
                <Card.Text>{kg.deskripsi}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mb-4 fw-bold">Kegiatan Telah Selesai</h2>
      <Row className="g-4">
        {kegiatanTelahSelesai.map((kg) => (
          <Col md={4} key={kg.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={`http://localhost:8001/uploads/${kg.gambar}`} />
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
