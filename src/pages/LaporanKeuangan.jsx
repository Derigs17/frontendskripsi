import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

// Data dummy — nanti bisa ambil dari backend atau file JSON
const laporanBulanIni = {
  totalUang: 10500000,
  kotakAmal: 3500000,
  iuranJamaah: 5000000,
  donaturLain: 2000000,
};

const pengeluaranBulanIni = [
  { keterangan: 'Pembelian Karpet Baru', jumlah: 2500000 },
  { keterangan: 'Perbaikan Sound System', jumlah: 1000000 },
  { keterangan: 'Honor Penceramah', jumlah: 500000 },
];

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);

const LaporanKeuangan = () => {
  const totalPengeluaran = pengeluaranBulanIni.reduce((total, item) => total + item.jumlah, 0);
  const saldoAkhir = laporanBulanIni.totalUang - totalPengeluaran;

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Laporan Keuangan Bulan Ini</h2>

      {/* Bagian ringkasan pemasukan */}
      <Row className="g-3 mb-4">
        <Col xs={12} md={3}>
          <Card className="shadow-sm" bg="success" text="white">
            <Card.Body>
              <Card.Title className="fs-6">Total Uang Sekarang</Card.Title>
              <Card.Text className="fs-5">{formatRupiah(laporanBulanIni.totalUang)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card className="shadow-sm" bg="info" text="white">
            <Card.Body>
              <Card.Title className="fs-6">Kotak Amal</Card.Title>
              <Card.Text className="fs-5">{formatRupiah(laporanBulanIni.kotakAmal)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card className="shadow-sm" bg="primary" text="white">
            <Card.Body>
              <Card.Title className="fs-6">Iuran Jamaah</Card.Title>
              <Card.Text className="fs-5">{formatRupiah(laporanBulanIni.iuranJamaah)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card className="shadow-sm" bg="warning" text="dark">
            <Card.Body>
              <Card.Title className="fs-6">Donatur Lain</Card.Title>
              <Card.Text className="fs-5">{formatRupiah(laporanBulanIni.donaturLain)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      {/* Pengeluaran bulan ini */}
      <h5 className="mb-3">Pengeluaran Bulan Ini</h5>
      <Table striped bordered hover responsive className="table-laporan">
        <thead>
          <tr>
            <th>No</th>
            <th>Keterangan</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {pengeluaranBulanIni.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.keterangan}</td>
              <td>{formatRupiah(item.jumlah)}</td>
            </tr>
          ))}
          <tr className="fw-bold">
            <td colSpan={2}>Total Pengeluaran</td>
            <td>{formatRupiah(totalPengeluaran)}</td>
          </tr>
          <tr className="table-success fw-bold">
            <td colSpan={2}>Saldo Akhir Bulan Ini</td>
            <td>{formatRupiah(saldoAkhir)}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default LaporanKeuangan;
