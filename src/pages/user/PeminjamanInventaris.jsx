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
    nomorTelepon: '',
  });

  const [riwayat, setRiwayat] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Ambil riwayat peminjaman berdasarkan email pengguna yang login
  useEffect(() => {
    const email = localStorage.getItem('loggedInUserEmail');
    if (email) {
      axios.get(`http://localhost:8001/getRiwayatPeminjaman/${email}`)
        .then(response => {
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

    const barangString = formData.barang.join(',');

    // Kirim data peminjaman ke server
    axios.post('http://localhost:8001/submitPeminjaman', {
      email: email,
      ...formData,
      barang: barangString,
    })
      .then((response) => {
        setAlert({
          show: true,
          type: 'success',
          message: response.data.message,
        });

        setRiwayat(prev => [{ ...formData, status: 'Menunggu' }, ...prev]);

        // Reset form data
        setFormData({
          nama: '',
          barang: [],
          tglMulai: '',
          tglSelesai: '',
          keperluan: '',
          nomorTelepon: ''
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
    <div className="page-content mt-3">
      <Container className="py-4">
        <h2 className="mb-4 text-center">Formulir Peminjaman Inventaris</h2>

        {alert.show && (
          <Alert
            variant={alert.type}
            onClose={() => setAlert({ ...alert, show: false })}
            dismissible
          >
            {alert.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} style={{ borderRadius: '10px', padding: '20px', backgroundColor: '#F2F2F2' }}>
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
            <Form.Label>Nomor Telepon</Form.Label>
            <Form.Control
              type="text"
              name="nomorTelepon"
              value={formData.nomorTelepon}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon"
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
                <Form.Label>Tanggal Mulai Peminjaman</Form.Label>
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
                <Form.Label>Tanggal Selesai Peminjaman</Form.Label>
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

        {/* Catatan/Peringatan */}
        <Alert variant="info" className="mt-4">
          <strong>Catatan:</strong>
          <ul>
            <li>Peminjam bertanggung jawab atas kerusakan atau kehilangan barang.</li>
            <li>Barang harus dikembalikan sesuai waktu yang disepakati.</li>
            <li>Dikenakan denda jika terlambat/kondisi rusak.</li>
            <li>Barang tidak boleh dipindahtangankan ke pihak lain.</li>
          </ul>
        </Alert>

        <h4 className='mt-3'>Peminjaman Menunggu Persetujuan</h4>
        <Table striped bordered hover responsive style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>No</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Nama</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Nomor Telepon</th> {/* Kolom Nomor Telepon */}
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Barang</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Mulai Peminjaman</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Selesai Peminjaman</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Keperluan</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.filter(pinjam => pinjam.status === 'Menunggu').map((pinjam, index) => (
              <tr key={pinjam.id}>
                <td>{index + 1}</td>
                <td>{pinjam.nama}</td>
                <td>{pinjam.nomor_telepon}</td> {/* Menampilkan Nomor Telepon */}
                <td>{pinjam.barang}</td>
                <td>{new Date(pinjam.tgl_mulai).toLocaleDateString()}</td>
                <td>{new Date(pinjam.tgl_selesai).toLocaleDateString()}</td>
                <td>{pinjam.keperluan}</td>
                <td>{pinjam.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h4 className='mt-3'>Riwayat Peminjaman</h4>
        <Table striped bordered hover responsive style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>No</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Nama</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Nomor Telepon</th> {/* Kolom Nomor Telepon */}
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Barang</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Mulai Peminjaman</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Selesai Peminjaman</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Keperluan</th>
              <th style={{ backgroundColor: '#0D1B2A', color: '#fff' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.filter(pinjam => pinjam.status !== 'Menunggu').map((pinjam, index) => (
              <tr key={pinjam.id}>
                <td>{index + 1}</td>
                <td>{pinjam.nama}</td>
                <td>{pinjam.nomor_telepon}</td> {/* Menampilkan Nomor Telepon */}
                <td>{pinjam.barang}</td>
                <td>{new Date(pinjam.tgl_mulai).toLocaleDateString()}</td>
                <td>{new Date(pinjam.tgl_selesai).toLocaleDateString()}</td>
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
