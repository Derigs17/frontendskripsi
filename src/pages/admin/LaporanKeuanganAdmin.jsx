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
  const [editId, setEditId] = useState(null); // Menyimpan ID yang sedang diedit

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

    // Jika ada editId, berarti mengupdate data, jika tidak, berarti menambah data
    const url = editId
      ? `http://localhost:8001/update${type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}/${editId}`
      : type === 'pemasukan'
      ? 'http://localhost:8001/addPemasukan'
      : 'http://localhost:8001/addPengeluaran';

    try {
      await axios.post(url, data);
      alert(editId ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
      setKeterangan('');
      setJumlah('');
      setTanggal('');
      setEditId(null); // Reset ID setelah submit

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

  const handleEdit = (id, keterangan, jumlah, tanggal, type) => {
    setKeterangan(keterangan);
    setJumlah(jumlah);
    setTanggal(tanggal);
    setEditId(id); // Set ID saat edit
    setType(type); // Set jenis data yang sedang diedit (pemasukan atau pengeluaran)
  };

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`http://localhost:8001/delete${type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}/${id}`);
      alert('Data berhasil dihapus');
      // Refresh data setelah delete
      const response = await axios.get('http://localhost:8001/getLaporanKeuangan');
      setDataLaporan({
        pemasukan: response.data.pemasukan,
        pengeluaran: response.data.pengeluaran,
      });
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Gagal menghapus data');
    }
  };

  const formatTanggal = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Mengambil bagian tanggal saja
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Tambah Data Laporan Keuangan</h2>

      {/* Form Input Data Pemasukan/Pengeluaran */}
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
                  {editId ? 'Update Data' : 'Simpan Data'}
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
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataLaporan.pemasukan.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.jumlah}</td>
                      <td>{formatTanggal(item.tanggal)}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(item.id, item.keterangan, item.jumlah, item.tanggal, 'pemasukan')}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id, 'pemasukan')}
                          className="ml-2"
                        >
                          Hapus
                        </Button>
                      </td>
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
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataLaporan.pengeluaran.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.jumlah}</td>
                      <td>{formatTanggal(item.tanggal)}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(item.id, item.keterangan, item.jumlah, item.tanggal, 'pengeluaran')}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id, 'pengeluaran')}
                          className="ml-2"
                        >
                          Hapus
                        </Button>
                      </td>
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
