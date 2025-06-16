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

  // Fungsi untuk menambah kegiatan
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('judul', formData.judul);
    form.append('tanggal', formData.tanggal);
    form.append('deskripsi', formData.deskripsi);
    form.append('gambar', formData.gambar || 'bukabersama.png');
    form.append('status', formData.status);  // Status awal akan tetap 'Akan Datang'

    try {
      await axios.post('http://localhost:8001/addKegiatan', form);
      alert('Kegiatan berhasil ditambahkan');
      fetchKegiatan(); // Memuat data terbaru setelah menambah kegiatan
    } catch (error) {
      console.error('Error saving kegiatan:', error);
      alert('Gagal menambahkan kegiatan');
    }

    // Reset form
    setFormData({ judul: '', tanggal: '', deskripsi: '', gambar: null, status: 'Akan Datang' });
  };

  // Fungsi untuk mengambil semua kegiatan
  const fetchKegiatan = async () => {
    try {
      const response = await axios.get('http://localhost:8001/getAllKegiatan');
      setKegiatan(response.data); // Memasukkan semua data kegiatan ke state
    } catch (error) {
      console.error('Error fetching kegiatan:', error);
    }
  };

  // Fungsi untuk mengubah status kegiatan menjadi "Telah Selesai"
  const handleStatusChange = async (id) => {
    try {
      // Panggil endpoint untuk memperbarui status kegiatan menjadi "Telah Selesai"
      await axios.post(`http://localhost:8001/updateStatusKegiatan/${id}`);
      fetchKegiatan();  // Memuat ulang data setelah status kegiatan diubah
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  React.useEffect(() => {
    fetchKegiatan();  // Memuat data kegiatan pertama kali
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold text-center">Laporan Kegiatan Admin</h2>

      {/* Form untuk menambah kegiatan */}
      <Form onSubmit={handleFormSubmit} className="mb-5">
        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="judul">
              <Form.Label>Judul Kegiatan</Form.Label>
              <Form.Control
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
                placeholder="Masukkan Judul Kegiatan"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="tanggal">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="text"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                placeholder="Masukkan Tanggal Kegiatan"
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group controlId="deskripsi">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                type="text"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                placeholder="Masukkan Deskripsi Kegiatan"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="gambar">
              <Form.Label>Gambar Kegiatan</Form.Label>
              <Form.Control
                type="file"
                name="gambar"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
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
          </Col>
          <Col md={12}>
            <Button variant="primary" type="submit" className="w-100">
              Tambah Kegiatan
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Menampilkan kegiatan yang Akan Datang */}
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
                <Button onClick={() => handleStatusChange(kg.id)} variant="success" className="w-100">
                  Tandai Selesai
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Menampilkan kegiatan yang Telah Selesai */}
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LaporanKegiatanAdmin;
