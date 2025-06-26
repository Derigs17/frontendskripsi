import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const LaporanKegiatanAdmin = () => {
  const [formData, setFormData] = useState({
    judul: '',
    tanggal: '',
    deskripsi: '',
    gambar: null,
    status: 'Akan Datang',
  });

  const [kegiatan, setKegiatan] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gambar: e.target.files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('judul', formData.judul);
    form.append('tanggal', formData.tanggal);
    form.append('deskripsi', formData.deskripsi);
    form.append('gambar', formData.gambar || 'bukabersama.png');
    form.append('status', formData.status);

    try {
      await axios.post('http://localhost:8001/addKegiatan', form);
      alert('Kegiatan berhasil ditambahkan');
      fetchKegiatan();
    } catch (error) {
      console.error('Error saving kegiatan:', error);
      alert('Gagal menambahkan kegiatan');
    }

    setFormData({ judul: '', tanggal: '', deskripsi: '', gambar: null, status: 'Akan Datang' });
    setShowModal(false);
  };

  const fetchKegiatan = async () => {
    try {
      const response = await axios.get('http://localhost:8001/getAllKegiatan');
      setKegiatan(response.data);
    } catch (error) {
      console.error('Error fetching kegiatan:', error);
    }
  };

  const handleStatusChange = async (id) => {
    try {
      await axios.post(`http://localhost:8001/updateStatusKegiatan/${id}`);
      fetchKegiatan();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteKegiatan = async (id) => {
    if (window.confirm('Yakin ingin menghapus kegiatan ini?')) {
      try {
        await axios.delete(`http://localhost:8001/deleteKegiatan/${id}`);
        fetchKegiatan();
      } catch (error) {
        console.error('Error deleting kegiatan:', error);
      }
    }
  };

  React.useEffect(() => {
    fetchKegiatan();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold text-left">Laporan Kegiatan Admin</h2>

      {/* Tombol buka modal tambah kegiatan */}
      <div className="text-left mb-4">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Tambah Kegiatan
        </Button>
      </div>

      {/* Modal Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kegiatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="judul">
              <Form.Label>Judul Kegiatan</Form.Label>
              <Form.Control
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
                placeholder="Masukkan Judul Kegiatan"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tanggal">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="text"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                placeholder="Masukkan Tanggal Kegiatan"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="deskripsi">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                type="text"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                placeholder="Masukkan Deskripsi Kegiatan"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="gambar">
              <Form.Label>Gambar Kegiatan</Form.Label>
              <Form.Control type="file" name="gambar" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status Kegiatan</Form.Label>
              <Form.Control as="select" name="status" value={formData.status} onChange={handleInputChange}>
                <option>Akan Datang</option>
                <option>Telah Selesai</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h3 className="mb-4">Kegiatan Akan Datang</h3>
      <Row className="g-4">
        {kegiatan.filter(kg => kg.status === 'Akan Datang').map((kg) => (
          <Col sm={12} md={6} lg={4} key={kg.id}>
            <Card className="shadow-sm border-light rounded">
              <Card.Img variant="top" src={`http://localhost:8001/uploads/${kg.gambar}`} />
              <Card.Body>
                <Card.Title>{kg.judul}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{kg.tanggal}</Card.Subtitle>
                <Card.Text>{kg.deskripsi}</Card.Text>
                <Button onClick={() => handleStatusChange(kg.id)} variant="success" className="w-100 mb-2">
                  Tandai Selesai
                </Button>
                <Button onClick={() => handleDeleteKegiatan(kg.id)} variant="danger" className="w-100">
                  Hapus
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="mb-4 mt-5">Kegiatan Telah Selesai</h3>
      <Row className="g-4">
        {kegiatan.filter(kg => kg.status === 'Telah Selesai').map((kg) => (
          <Col sm={12} md={6} lg={4} key={kg.id}>
            <Card className="shadow-sm border-light rounded">
              <Card.Img variant="top" src={`http://localhost:8001/uploads/${kg.gambar}`} />
              <Card.Body>
                <Card.Title>{kg.judul}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{kg.tanggal}</Card.Subtitle>
                <Card.Text>{kg.deskripsi}</Card.Text>
                <Button onClick={() => handleDeleteKegiatan(kg.id)} variant="danger" className="w-100">
                  Hapus
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LaporanKegiatanAdmin;
