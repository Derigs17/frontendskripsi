import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const LaporanKeuanganAdmin = () => {
  const [keterangan, setKeterangan] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [type, setType] = useState('pemasukan'); // Pilih jenis data: pemasukan atau pengeluaran

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
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Gagal menambah data');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Tambah Data Laporan Keuangan</h2>
      
      <Row className="mt-4">
        <Col md={6}>
          <Card>
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

                <Button variant="primary" type="submit" className="mt-3">
                  Simpan Data
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LaporanKeuanganAdmin;
