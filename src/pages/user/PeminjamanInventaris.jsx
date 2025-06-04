import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert, Table } from 'react-bootstrap';
import axios from 'axios';

const inventarisList = ['Tenda', 'Keranda', 'Kursi', 'Meja', 'Sound System', 'Kipas Angin', 'Proyektor'];

const PeminjamanInventaris = () => {
  const [formData, setFormData] = useState({
    nama: '',
    barang: [],
    tglMulai: '',
    tglSelesai: '',
    keperluan: '',
  });

  const [riwayat, setRiwayat] = useState([]); // Data riwayat yang disetujui/ditolak
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Ambil riwayat peminjaman berdasarkan email pengguna yang login
  useEffect(() => {
    const email = localStorage.getItem('loggedInUserEmail');
    if (email) {
      axios.get(`http://localhost:8001/getRiwayatPeminjaman/${email}`)
        .then(response => {
          // Urutkan data berdasarkan id (id terbesar di atas)
          const sortedData = response.data.sort((a, b) => b.id - a.id);
          setRiwayat(sortedData);
        })
        .catch(error => {
          console.error('Error fetching riwayat peminjaman:', error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      setRiwayat(prev => [{ ...formData, status: 'Menunggu' }, ...prev]);

      // Reset form data
      setFormData({
        nama: '',
        barang: [],
        tglMulai: '',
        tglSelesai: '',
        keperluan: '',
      });
    })
    // eslint-disable-next-line no-unused-vars
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

        {/* Tabel Peminjaman Inventaris (Menunggu) */}
        <h4>Peminjaman Menunggu Persetujuan</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Barang</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Keperluan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.filter(pinjam => pinjam.status === 'Menunggu').map((pinjam, index) => (
              <tr key={pinjam.id}>
                <td>{index + 1}</td>
                <td>{pinjam.nama}</td>
                <td>{pinjam.barang}</td>
                <td>{new Date(pinjam.tgl_mulai).toLocaleString()}</td>
                <td>{new Date(pinjam.tgl_selesai).toLocaleString()}</td>
                <td>{pinjam.keperluan}</td>
                <td>{pinjam.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Tabel Riwayat Peminjaman */}
        <h4>Riwayat Peminjaman</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Barang</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Keperluan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.filter(pinjam => pinjam.status !== 'Menunggu').map((pinjam, index) => (
              <tr key={pinjam.id}>
                <td>{index + 1}</td>
                <td>{pinjam.nama}</td>
                <td>{pinjam.barang}</td>
                <td>{new Date(pinjam.tgl_mulai).toLocaleString()}</td>
                <td>{new Date(pinjam.tgl_selesai).toLocaleString()}</td>
                <td>{pinjam.keperluan}</td>
                <td>{pinjam.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default PeminjamanInventaris;
