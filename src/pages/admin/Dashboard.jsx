import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState({
    laporanKeuangan: { pemasukan: 0, pengeluaran: 0, saldo: 0 },
    peminjaman: { pending: 0, total: 0 },
    jadwalImam: [],
    kegiatan: [],
    users: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const laporanKeuanganResponse = await axios.get('http://localhost:8001/getLaporanKeuangan');
        const peminjamanResponse = await axios.get('http://localhost:8001/getAllRiwayatPeminjaman');
        const jadwalImamResponse = await axios.get('http://localhost:8001/getJadwalImamForMonth?bulan=6&tahun=2025');
        const kegiatanResponse = await axios.get('http://localhost:8001/getAllKegiatan');
        const usersResponse = await axios.get('http://localhost:8001/getAllUsers');

        setSummaryData({
          laporanKeuangan: {
            pemasukan: laporanKeuanganResponse.data.pemasukan.length,
            pengeluaran: laporanKeuanganResponse.data.pengeluaran.length,
            saldo: laporanKeuanganResponse.data.pemasukan.length - laporanKeuanganResponse.data.pengeluaran.length,
          },
          peminjaman: {
            pending: peminjamanResponse.data.filter(peminjaman => peminjaman.status === 'Menunggu').length,
            total: peminjamanResponse.data.length,
          },
          jadwalImam: jadwalImamResponse.data,
          kegiatan: kegiatanResponse.data.slice(0, 5),
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
      <Row>
        {/* Laporan Keuangan */}
        <Col sm={12} md={6} lg={6}>
          <div className="box laporan-keuangan">
            <h4>Laporan Keuangan</h4>
            <div>
              <p>Pemasukan: {summaryData.laporanKeuangan.pemasukan}</p>
              <p>Pengeluaran: {summaryData.laporanKeuangan.pengeluaran}</p>
              <p>Saldo: {summaryData.laporanKeuangan.saldo}</p>
            </div>
            <Button variant="primary" href="/admin/laporan-keuangan">Lihat Detail</Button>
          </div>
        </Col>

        {/* Peminjaman */}
        <Col sm={12} md={6} lg={6}>
          <div className="box peminjaman">
            <h4>Peminjaman</h4>
            <div>
              <p>Total Peminjaman: {summaryData.peminjaman.total}</p>
              <p>Peminjaman Menunggu: {summaryData.peminjaman.pending}</p>
            </div>
            <Button variant="primary" href="/admin/peminjaman">Lihat Detail</Button>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Jadwal Imam */}
        <Col sm={12} md={6} lg={6}>
          <div className="box jadwal-imam">
            <h4>Jadwal Imam</h4>
            <div>
              <p>Jadwal Imam Terbaru:</p>
              {summaryData.jadwalImam.slice(0, 2).map((jadwal, index) => (
                <p key={index}>{jadwal.tanggal} - {jadwal.imam}</p>
              ))}
            </div>
            <Button variant="primary" href="/admin/jadwal-imam">Lihat Detail</Button>
          </div>
        </Col>

        {/* Laporan Kegiatan */}
        <Col sm={12} md={6} lg={6}>
          <div className="box laporan-kegiatan">
            <h4>Laporan Kegiatan</h4>
            <div>
              <p>Kegiatan Terbaru:</p>
              {summaryData.kegiatan.map((kegiatan, index) => (
                <p key={index}>{kegiatan.judul} - {kegiatan.tanggal}</p>
              ))}
            </div>
            <Button variant="primary" href="/admin/laporan-kegiatan">Lihat Detail</Button>
          </div>
        </Col>
      </Row>

      <Row>
        {/* User Management */}
        <Col sm={12} md={6} lg={6}>
          <div className="box user-management">
            <h4>User Management</h4>
            <div>
              <p>Total Users: {summaryData.users.length}</p>
            </div>
            <Button variant="primary" href="/admin/user-management">Lihat Detail</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
