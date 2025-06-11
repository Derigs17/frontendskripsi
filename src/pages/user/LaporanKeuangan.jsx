import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const LaporanKeuangan = () => {
  const [pemasukanData, setPemasukanData] = useState([]);
  const [pengeluaranData, setPengeluaranData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pemasukanResponse = await axios.get('http://localhost:8001/getLaporanKeuangan');
        setPemasukanData(pemasukanResponse.data.pemasukan);
        setPengeluaranData(pemasukanResponse.data.pengeluaran);
      } catch (error) {
        console.error('Error fetching laporan keuangan:', error);
      }
    };

    fetchData();
  }, []);

  const totalPemasukan = pemasukanData.reduce((total, item) => total + item.jumlah, 0);
  const totalPengeluaran = pengeluaranData.reduce((total, item) => total + item.jumlah, 0);
  const saldo = totalPemasukan - totalPengeluaran;

  // Format tanggal agar hanya menampilkan tanggal saja (YYYY-MM-DD)
  const formatTanggal = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Mengambil bagian tanggal saja
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Laporan Keuangan Bulan Ini</h2>
        </Col>
      </Row>

      {/* Kartu Saldo Total */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="shadow" style={{ backgroundColor: '#d4edda' }}>
            <Card.Body>
              <h5>Total Pemasukan</h5>
              <p className="h4 text-success">Rp {totalPemasukan.toLocaleString()}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="shadow" style={{ backgroundColor: '#f8d7da' }}>
            <Card.Body>
              <h5>Total Pengeluaran</h5>
              <p className="h4 text-danger">Rp {totalPengeluaran.toLocaleString()}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="shadow" style={{ backgroundColor: '#cce5ff' }}>
            <Card.Body>
              <h5>Total Saldo</h5>
              <p className="h4 text-primary">Rp {saldo.toLocaleString()}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabel Pemasukan dan Pengeluaran */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card>
            <Card.Header className="bg-success text-white">
              <h5>Pemasukan</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Keterangan</th>
                    <th>Jumlah</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {pemasukanData.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.jumlah}</td>
                      <td>{formatTanggal(item.tanggal)}</td> {/* Format tanggal */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card>
            <Card.Header className="bg-danger text-white">
              <h5>Pengeluaran</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Keterangan</th>
                    <th>Jumlah</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {pengeluaranData.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.jumlah}</td>
                      <td>{formatTanggal(item.tanggal)}</td> {/* Format tanggal */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LaporanKeuangan;
