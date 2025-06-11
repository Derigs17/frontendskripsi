import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const LaporanKegiatanAdmin = () => {
  const [formData, setFormData] = useState({
    judul: '',
    tanggal: '',
    deskripsi: '',
    gambar: null,  // Ini untuk menampung gambar
    status: 'Akan Datang',
  });

  const [kegiatan, setKegiatan] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi untuk menangani perubahan file (gambar)
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gambar: e.target.files[0],
    }));
  };

  // Fungsi untuk menambah atau mengedit kegiatan
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('judul', formData.judul);
    form.append('tanggal', formData.tanggal);
    form.append('deskripsi', formData.deskripsi);
    form.append('gambar', formData.gambar || 'bukabersama.png');
    form.append('status', formData.status);

    try {
      if (isEditing) {
        await axios.post(`http://localhost:8001/updateKegiatan/${editingId}`, form);
      } else {
        await axios.post('http://localhost:8001/addKegiatan', form);
      }
      fetchKegiatan();
    } catch (error) {
      console.error('Error saving kegiatan:', error);
    }

    setFormData({ judul: '', tanggal: '', deskripsi: '', gambar: null, status: 'Akan Datang' });
    setIsEditing(false);
    setEditingId(null);
  };

  // Fungsi untuk mengambil data kegiatan
  const fetchKegiatan = async () => {
    try {
      const response = await axios.get('http://localhost:8001/getAllKegiatan');
      setKegiatan(response.data);
    } catch (error) {
      console.error('Error fetching kegiatan:', error);
    }
  };

  React.useEffect(() => {
    fetchKegiatan();
  }, []);

  return (
    <Container className="my-3">
      <h2 className="mb-4 fw-bold">Laporan Kegiatan Admin</h2>

      {/* Form untuk menambah dan mengedit kegiatan */}
      <Form onSubmit={handleFormSubmit} className="mb-4">
        <Form.Group controlId="judul">
          <Form.Label>Judul Kegiatan</Form.Label>
          <Form.Control
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="tanggal">
          <Form.Label>Tanggal</Form.Label>
          <Form.Control
            type="text"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="deskripsi">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            type="text"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="gambar">
          <Form.Label>Gambar Kegiatan</Form.Label>
          <Form.Control
            type="file"
            name="gambar"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status Kegiatan</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option>Akan Datang</option>
            <option>Telah Selesai</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {isEditing ? 'Update Kegiatan' : 'Tambah Kegiatan'}
        </Button>
      </Form>

      {/* Display kegiatan */}
      <Row className="g-4 mb-5">
        {kegiatan.map((kg) => (
          <Col md={4} key={kg.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={`http://localhost:8001/uploads/${kg.gambar}`} />
              <Card.Body>
                <Card.Title>{kg.judul}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{kg.tanggal}</Card.Subtitle>
                <Card.Text>{kg.deskripsi}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LaporanKegiatanAdmin;
