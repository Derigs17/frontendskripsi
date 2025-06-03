import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Table } from 'react-bootstrap';
import axios from 'axios';  // Import axios untuk HTTP request

const inventarisList = ['Tenda', 'Keranda', 'Kursi', 'Meja', 'Sound System', 'Kipas Angin', 'Proyektor'];

const PeminjamanInventaris = () => {
  const [formData, setFormData] = useState({
    nama: '',
    barang: [],
    tglMulai: '',
    tglSelesai: '',
    keperluan: '',
  });

  const [riwayat, setRiwayat] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 // Pada bagian handleSubmit di frontend
const handleSubmit = (e) => {
  e.preventDefault();

  // Ambil email dari localStorage
  const email = localStorage.getItem('loggedInUserEmail');

  // Validasi tanggal dan barang
  if (new Date(formData.tglSelesai) < new Date(formData.tglMulai)) {
    setAlert({
      show: true,
      type: 'danger',
      message: 'Tanggal selesai tidak boleh lebih awal dari tanggal mulai.',
    });
    return;
  }

  if (formData.barang.length === 0) {
    setAlert({
      show: true,
      type: 'danger',
      message: 'Silakan pilih minimal satu barang.',
    });
    return;
  }

  // Konversi barang menjadi string yang dipisahkan dengan koma
  const barangString = formData.barang.join(',');

  // Kirim data peminjaman ke server, termasuk email dan barang yang sudah diubah menjadi string
  axios.post('http://localhost:8001/submitPeminjaman', {
    email: email, // Kirim email yang diambil dari localStorage
    ...formData,  // Kirim data form lainnya
    barang: barangString // Kirim barang dalam format string
  })
  .then((response) => {
    setAlert({
      show: true,
      type: 'success',
      message: response.data.message,
    });

    // Simpan riwayat peminjaman
    setRiwayat(prev => [...prev, formData]);

    // Reset form data
    setFormData({
      nama: '',
      barang: [],
      tglMulai: '',
      tglSelesai: '',
      keperluan: '',
    });
  })
  .catch((error) => {
    setAlert({
      show: true,
      type: 'danger',
      message: 'Terjadi kesalahan saat mengajukan peminjaman.',
    });
  });
};


  return (
    <div className="page-content">
      <Container className="py-4">
        <h3 className="mb-4 text-center">Formulir Peminjaman Inventaris</h3>

        {alert.show && (
          <Alert
            variant={alert.type}
            onClose={() => setAlert({ ...alert, show: false })}
            dismissible
          >
            {alert.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Peminjam</Form.Label>
            <Form.Control
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pilih Inventaris</Form.Label>
            <Form.Select
              onChange={(e) => {
                const selected = e.target.value;
                if (selected && !formData.barang.includes(selected)) {
                  setFormData(prev => ({
                    ...prev,
                    barang: [...prev.barang, selected]
                  }));
                }
              }}
            >
              <option value="">-- Pilih Barang --</option>
              {inventarisList.map((item, idx) => (
                <option key={idx} value={item}>{item}</option>
              ))}
            </Form.Select>

            <div className="mt-2 d-flex flex-wrap gap-2">
              {formData.barang.map((item, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#e2e3e5',
                  padding: '4px 10px',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        barang: prev.barang.filter((b) => b !== item)
                      }))
                    }
                    style={{
                      marginLeft: '8px',
                      background: 'transparent',
                      border: 'none',
                      color: '#333',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tanggal Mulai Pinjam</Form.Label>
                <Form.Control
                  type="date"
                  name="tglMulai"
                  value={formData.tglMulai}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tanggal Selesai Pinjam</Form.Label>
                <Form.Control
                  type="date"
                  name="tglSelesai"
                  value={formData.tglSelesai}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Keperluan</Form.Label>
            <Form.Control
              as="textarea"
              name="keperluan"
              rows={3}
              value={formData.keperluan}
              onChange={handleChange}
              placeholder="Contoh: Acara pengajian, rapat RT, dll"
              required
            />
          </Form.Group>

          <div className="text-end">
            <Button variant="primary" type="submit">Ajukan Peminjaman</Button>
          </div>
        </Form>

        {riwayat.length > 0 && (
          <div className="mt-5">
            <h5>Riwayat Peminjaman (sementara)</h5>
            <Table striped bordered hover responsive className="table-riwayat">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Barang</th>
                  <th>Tgl Mulai</th>
                  <th>Tgl Selesai</th>
                  <th>Keperluan</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.nama}</td>
                    <td>{entry.barang.join(', ')}</td>
                    <td>{entry.tglMulai}</td>
                    <td>{entry.tglSelesai}</td>
                    <td>{entry.keperluan}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PeminjamanInventaris;
