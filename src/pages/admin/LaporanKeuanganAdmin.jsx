import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import axios from 'axios';

const LaporanKeuanganAdmin = () => {
  const [keterangan, setKeterangan] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [type, setType] = useState('pemasukan'); // Pilih jenis data: pemasukan atau pengeluaran
  const [dataLaporan, setDataLaporan] = useState({
    pemasukan: [],
    pengeluaran: [],
  });

  // Fetch data untuk tabel (Pemasukan dan Pengeluaran)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/getLaporanKeuangan');
        setDataLaporan({
          pemasukan: response.data.pemasukan,
          pengeluaran: response.data.pengeluaran,
        });
      } catch (error) {
        console.error('Error fetching laporan:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      keterangan,
      jumlah,
      tanggal,
    };

    const url = type === 'pemasukan' ? 'http://localhost:8001/addPemasukan' : 'http://localhost:8001/addPengeluaran';

    try {
      await axios.post(url, data);
      alert('Data berhasil ditambahkan');
      setKeterangan('');
      setJumlah('');
      setTanggal('');
      // Refresh data setelah submit
      const response = await axios.get('http://localhost:8001/getLaporanKeuangan');
      setDataLaporan({
        pemasukan: response.data.pemasukan,
        pengeluaran: response.data.pengeluaran,
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Gagal menambah data');
    }
  };

  // Fungsi untuk format tanggal menjadi YYYY-MM-DD (tanpa waktu)
  const formatTanggal = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Mengambil bagian tanggal saja
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Tambah Data Laporan Keuangan</h2>
      
      <Row className="mt-4 justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Header className="bg-info text-white">
              <h5>Tambah {type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="keterangan">
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan keterangan"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="jumlah" className="mt-3">
                  <Form.Label>Jumlah</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan jumlah"
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="tanggal" className="mt-3">
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="type" className="mt-3">
                  <Form.Label>Jenis</Form.Label>
                  <Form.Control
                    as="select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="pemasukan">Pemasukan</option>
                    <option value="pengeluaran">Pengeluaran</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100">
                  Simpan Data
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabel Pemasukan dan Pengeluaran */}
      <Row className="mt-5">
        <Col md={6}>
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
                  {dataLaporan.pemasukan.map((item, idx) => (
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

        <Col md={6}>
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
                  {dataLaporan.pengeluaran.map((item, idx) => (
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

export default LaporanKeuanganAdmin;
