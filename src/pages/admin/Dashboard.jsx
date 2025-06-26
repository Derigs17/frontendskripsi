import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState({
    laporanKeuangan: { pemasukan: 0, pengeluaran: 0, saldo: 0 },
    peminjaman: { pending: 0 },
    users: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const laporanKeuanganResponse = await axios.get('http://localhost:8001/getLaporanKeuangan');
        const peminjamanResponse = await axios.get('http://localhost:8001/getAllRiwayatPeminjaman');
        const usersResponse = await axios.get('http://localhost:8001/getAllUsers');

        setSummaryData({
          laporanKeuangan: {
            pemasukan: laporanKeuanganResponse.data.pemasukan.reduce((acc, item) => acc + item.jumlah, 0),
            pengeluaran: laporanKeuanganResponse.data.pengeluaran.reduce((acc, item) => acc + item.jumlah, 0),
            saldo: laporanKeuanganResponse.data.pemasukan.reduce((acc, item) => acc + item.jumlah, 0) - 
                  laporanKeuanganResponse.data.pengeluaran.reduce((acc, item) => acc + item.jumlah, 0),
          },
          peminjaman: {
            pending: peminjamanResponse.data.filter(peminjaman => peminjaman.status === 'Menunggu').length,
          },
          users: usersResponse.data,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="dashboard-admin mt-5">
      {/* Judul Dashboard */}
      <h2 className="mb-4" style={{ textAlign: 'left' }}>Dashboard Admin</h2>

      <Row>
        {/* Pemasukan */}
        <Col sm={12} md={4} lg={4}>
          <Card className="shadow" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <h5 style={{ fontSize: '20px', color: '#333' }}>Pemasukan Keuangan Masjid</h5>
              <p className="h4" style={{ fontSize: '28px', color: '#28a745' }}>{`Rp ${summaryData.laporanKeuangan.pemasukan.toLocaleString()}`}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Pengeluaran */}
        <Col sm={12} md={4} lg={4}>
          <Card className="shadow" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <h5 style={{ fontSize: '20px', color: '#333' }}>Pengeluaran Keuangan Masjid</h5>
              <p className="h4" style={{ fontSize: '28px', color: '#dc3545' }}>{`Rp ${summaryData.laporanKeuangan.pengeluaran.toLocaleString()}`}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Saldo */}
        <Col sm={12} md={4} lg={4}>
          <Card className="shadow" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <h5 style={{ fontSize: '20px', color: '#333' }}>Saldo Total Bulan Ini</h5>
              <p className="h4" style={{ fontSize: '28px', color: '#007bff' }}>{`Rp ${summaryData.laporanKeuangan.saldo.toLocaleString()}`}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Pending Peminjaman */}
        <Col sm={12} md={6} lg={6}>
          <Card className="shadow" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <h5 style={{ fontSize: '20px', color: '#333' }}>Pending Peminjaman Masjid</h5>
              <p className="h4" style={{ fontSize: '28px', color: '#17a2b8' }}>{summaryData.peminjaman.pending} Data</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Total User */}
        <Col sm={12} md={6} lg={6}>
          <Card className="shadow" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <h5 style={{ fontSize: '20px', color: '#333' }}>Data Users</h5>
              <p className="h4" style={{ fontSize: '28px', color: '#28a745' }}>{summaryData.users.length} Users</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
