import React, { useState } from 'react';
import { Container, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const JadwalImamAdmin = () => {
  const [newJadwal, setNewJadwal] = useState({
    tanggal: '',
    imam: '',
    khatib: '',
    muazin: '',
    bilal: ''
  });
  const [showForm, setShowForm] = useState(false); // Menampilkan form input jadwal
  const [showModal, setShowModal] = useState(false); // Modal konfirmasi
  const [isSubmitting, setIsSubmitting] = useState(false); // Menandakan proses submit
  const [isEditMode, setIsEditMode] = useState(false); // Untuk menandakan mode edit

  // Menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJadwal({ ...newJadwal, [name]: value });
  };

  // Menangani tombol "Tambah Jadwal" untuk menampilkan form
  const handleAdd = () => {
    setShowForm(true); // Menampilkan form untuk menambah jadwal
  };

  // Menangani tombol Simpan (menampilkan modal konfirmasi)
  const handleSave = () => {
    setShowModal(true); // Tampilkan modal konfirmasi saat klik simpan
  };

  // Menangani konfirmasi Simpan di modal
  const handleConfirmSave = async () => {
    setIsSubmitting(true); // Menandakan bahwa data sedang diproses
    try {
      // Simulasi mengirim data ke backend (gunakan API endpoint yang sesuai)
      const response = await axios.post('http://localhost:8001/addJadwalImam', newJadwal);
      if (response.data.success) {
        // Reset form dan sembunyikan modal setelah data berhasil disimpan
        setNewJadwal({
          tanggal: '',
          imam: '',
          khatib: '',
          muazin: '',
          bilal: ''
        });
        setShowForm(false);
        setShowModal(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting jadwal:", error);
      setIsSubmitting(false);
    }
  };

  // Menangani batal (menutup modal konfirmasi tanpa menyimpan data)
  const handleCancel = () => {
    setShowModal(false); // Menutup modal tanpa menyimpan
  };

  return (
    <Container>
      <h2>Tambah Jadwal Imam, Khatib, Muazin & Bilal (Admin)</h2>
      <Button variant="primary" onClick={handleAdd}>Tambah Jadwal</Button>

      {/* Form untuk menambah jadwal */}
      {showForm && (
        <Form className="mt-3">
          <Form.Group controlId="tanggal">
            <Form.Label>Tanggal</Form.Label>
            <Form.Control
              type="date"
              name="tanggal"
              value={newJadwal.tanggal}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="imam">
            <Form.Label>Imam</Form.Label>
            <Form.Control
              type="text"
              name="imam"
              value={newJadwal.imam}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="khatib">
            <Form.Label>Khatib</Form.Label>
            <Form.Control
              type="text"
              name="khatib"
              value={newJadwal.khatib}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="muazin">
            <Form.Label>Muazin</Form.Label>
            <Form.Control
              type="text"
              name="muazin"
              value={newJadwal.muazin}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="bilal">
            <Form.Label>Bilal</Form.Label>
            <Form.Control
              type="text"
              name="bilal"
              value={newJadwal.bilal}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="success" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan Jadwal'}
          </Button>
        </Form>
      )}

      {/* Modal Konfirmasi */}
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menambahkan jadwal ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleConfirmSave}>
            Ya, Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default JadwalImamAdmin;
