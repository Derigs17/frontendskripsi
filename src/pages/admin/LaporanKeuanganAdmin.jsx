import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const LaporanKeuanganAdmin = () => {
  const [keterangan, setKeterangan] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [type, setType] = useState('pemasukan');
  const [dataLaporan, setDataLaporan] = useState({ pemasukan: [], pengeluaran: [] });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

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
    const data = { keterangan, jumlah, tanggal };
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
      setEditId(null);
      setShowFormModal(false);

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
    setEditId(id);
    setType(type);
    setShowFormModal(true);
  };

  const handleDelete = async () => {
    try {
      const url = `http://localhost:8001/delete${type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}/${deleteId}`;
      await axios.delete(url);
      alert('Data berhasil dihapus');
      setShowModal(false);
      setDeleteId(null);
      const response = await axios.get('http://localhost:8001/getLaporanKeuangan');
      setDataLaporan({
        pemasukan: response.data.pemasukan,
        pengeluaran: response.data.pengeluaran,
      });
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Gagal menghapus data');
      setShowModal(false);
    }
  };

  const handleShowModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCancelEdit = () => {
    setKeterangan('');
    setJumlah('');
    setTanggal('');
    setEditId(null);
    setShowFormModal(false);
  };

  const formatTanggal = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Laporan Keuangan</h2>

      <Button variant="primary" className="mb-3" onClick={() => {
        setEditId(null);
        setKeterangan('');
        setJumlah('');
        setTanggal('');
        setType('pemasukan');
        setShowFormModal(true);
      }}>
        Tambah Data
      </Button>

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
                        <Button variant="warning" size="sm" onClick={() => handleEdit(item.id, item.keterangan, item.jumlah, item.tanggal, 'pemasukan')}>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => handleShowModal(item.id)} className="ms-2">Hapus</Button>
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
                        <Button variant="warning" size="sm" onClick={() => handleEdit(item.id, item.keterangan, item.jumlah, item.tanggal, 'pengeluaran')}>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => handleShowModal(item.id)} className="ms-2">Hapus</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Form Tambah/Edit */}
      <Modal show={showFormModal} onHide={handleCancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit' : 'Tambah'} {type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="keterangan">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control type="text" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="jumlah" className="mt-3">
              <Form.Label>Jumlah</Form.Label>
              <Form.Control type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="tanggal" className="mt-3">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="type" className="mt-3">
              <Form.Label>Jenis</Form.Label>
              <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="pemasukan">Pemasukan</option>
                <option value="pengeluaran">Pengeluaran</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" className="mt-3" variant="primary">
              {editId ? 'Update Data' : 'Simpan Data'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus data ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Batal</Button>
          <Button variant="danger" onClick={handleDelete}>Hapus</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LaporanKeuanganAdmin;
