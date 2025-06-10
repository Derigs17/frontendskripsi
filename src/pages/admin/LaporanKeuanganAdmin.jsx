import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

const LaporanKeuanganAdmin = () => {
  const [pemasukanData, setPemasukanData] = useState([]);
  const [pengeluaranData, setPengeluaranData] = useState([]);
  const [newPemasukan, setNewPemasukan] = useState({ jumlah: 0, keterangan: '', tanggal: '' });
  const [newPengeluaran, setNewPengeluaran] = useState({ jumlah: 0, keterangan: '', tanggal: '' });

  useEffect(() => {
    // Mengambil data pemasukan dan pengeluaran
    const fetchData = async () => {
      const pemasukanResponse = await axios.get('http://localhost:8001/getPemasukan');
      setPemasukanData(pemasukanResponse.data);

      const pengeluaranResponse = await axios.get('http://localhost:8001/getPengeluaran');
      setPengeluaranData(pengeluaranResponse.data);
    };

    fetchData();
  }, []);

  const handleSubmitPemasukan = async () => {
    try {
      await axios.post('http://localhost:8001/addPemasukan', newPemasukan);
      setNewPemasukan({ jumlah: 0, keterangan: '', tanggal: '' });
      alert('Pemasukan berhasil ditambahkan');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Gagal menambah pemasukan');
    }
  };

  const handleSubmitPengeluaran = async () => {
    try {
      await axios.post('http://localhost:8001/addPengeluaran', newPengeluaran);
      setNewPengeluaran({ jumlah: 0, keterangan: '', tanggal: '' });
      alert('Pengeluaran berhasil ditambahkan');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Gagal menambah pengeluaran');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Edit Laporan Keuangan</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Tambah Pemasukan</h5>
              <Form>
                <Form.Group controlId="formJumlahPemasukan">
                  <Form.Label>Jumlah</Form.Label>
                  <Form.Control
                    type="number"
                    value={newPemasukan.jumlah}
                    onChange={(e) => setNewPemasukan({ ...newPemasukan, jumlah: e.target.value })}
                    placeholder="Jumlah Pemasukan"
                  />
                </Form.Group>

                <Form.Group controlId="formKeteranganPemasukan">
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPemasukan.keterangan}
                    onChange={(e) => setNewPemasukan({ ...newPemasukan, keterangan: e.target.value })}
                    placeholder="Keterangan"
                  />
                </Form.Group>

                <Form.Group controlId="formTanggalPemasukan">
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control
                    type="date"
                    value={newPemasukan.tanggal}
                    onChange={(e) => setNewPemasukan({ ...newPemasukan, tanggal: e.target.value })}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSubmitPemasukan}>Tambah Pemasukan</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Tambah Pengeluaran</h5>
              <Form>
                <Form.Group controlId="formJumlahPengeluaran">
                  <Form.Label>Jumlah</Form.Label>
                  <Form.Control
                    type="number"
                    value={newPengeluaran.jumlah}
                    onChange={(e) => setNewPengeluaran({ ...newPengeluaran, jumlah: e.target.value })}
                    placeholder="Jumlah Pengeluaran"
                  />
                </Form.Group>

                <Form.Group controlId="formKeteranganPengeluaran">
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPengeluaran.keterangan}
                    onChange={(e) => setNewPengeluaran({ ...newPengeluaran, keterangan: e.target.value })}
                    placeholder="Keterangan"
                  />
                </Form.Group>

                <Form.Group controlId="formTanggalPengeluaran">
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control
                    type="date"
                    value={newPengeluaran.tanggal}
                    onChange={(e) => setNewPengeluaran({ ...newPengeluaran, tanggal: e.target.value })}
                  />
                </Form.Group>

                <Button variant="danger" onClick={handleSubmitPengeluaran}>Tambah Pengeluaran</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3>Pemasukan Bulan Ini</h3>
      <Table striped bordered hover>
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
              <td>{item.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Pengeluaran Bulan Ini</h3>
      <Table striped bordered hover>
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
              <td>{item.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LaporanKeuanganAdmin;
