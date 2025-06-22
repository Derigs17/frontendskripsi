import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const JadwalImamAdmin = () => {
  const [jadwal, setJadwal] = useState([]);
  const [newJadwal, setNewJadwal] = useState({
    id: '',
    tanggal: '',
    imam: '',
    khatib: '',
    muazin: '',
    bilal: '',
  });

  const [showForm, setShowForm] = useState(false); // Menampilkan form input jadwal
  const [showModal, setShowModal] = useState(false); // Untuk modal konfirmasi
  const [modalAction, setModalAction] = useState(''); // Tindakan modal (edit / delete / add)
  
  // Ambil data jadwal dari API
  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    try {
      const response = await axios.get('http://localhost:8001/getAllJadwalImam');
      setJadwal(response.data);  // Menyimpan data jadwal yang diambil dari backend
    } catch (error) {
      console.error("Error fetching jadwal:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewJadwal({ ...newJadwal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Menentukan action berdasarkan apakah itu update atau add
    const action = newJadwal.id ? 'edit' : 'add';
    setModalAction(action);  // Menentukan tindakan untuk modal konfirmasi
    setShowModal(true); // Tampilkan modal konfirmasi
  };

  const handleEdit = (item) => {
    setNewJadwal({
      id: item.id,
      tanggal: item.tanggal,
      imam: item.imam,
      khatib: item.khatib,
      muazin: item.muazin,
      bilal: item.bilal,
    });
    setShowForm(true); // Tampilkan form untuk edit
  };

  const handleDelete = (id) => {
    setModalAction('delete');
    setNewJadwal({ ...newJadwal, id });
    setShowModal(true); // Tampilkan modal konfirmasi untuk delete
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8001/deleteJadwalImam/${newJadwal.id}`);
      if (response.data.success) {
        fetchJadwal();  // Refresh jadwal setelah delete
        setShowModal(false); // Menutup modal setelah delete
      }
    } catch (error) {
      console.error("Error deleting jadwal:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmSave = async () => {
    const url = newJadwal.id
      ? `http://localhost:8001/updateJadwalImam/${newJadwal.id}`
      : 'http://localhost:8001/addJadwalImam';
    
    try {
      const response = await axios.post(url, newJadwal);
      if (response.data.success) {
        fetchJadwal(); // Refresh jadwal setelah simpan
        setNewJadwal({ id: '', tanggal: '', imam: '', khatib: '', muazin: '', bilal: '' });
        setShowForm(false); // Menutup form setelah simpan
        setShowModal(false); // Menutup modal setelah simpan
      }
    } catch (error) {
      console.error("Error submitting jadwal:", error);
    }
  };

  return (
    <Container>
      <h2>Jadwal Imam, Khatib, Muazin & Bilal (Admin)</h2>
      <Button variant="primary" onClick={() => { setShowForm(true); setNewJadwal({ id: '', tanggal: '', imam: '', khatib: '', muazin: '', bilal: '' }); }}>Tambah Jadwal</Button>

      {/* Form Input Jadwal */}
      {showForm && (
        <Form onSubmit={handleSubmit} className="mt-3">
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
          <Button variant="success" type="submit">
            {newJadwal.id ? 'Update Jadwal' : 'Simpan Jadwal'}
          </Button>
          <Button variant="secondary" onClick={() => { setShowForm(false); setNewJadwal({ id: '', tanggal: '', imam: '', khatib: '', muazin: '', bilal: '' }); }} className="ms-2">
            Batal
          </Button>
        </Form>
      )}

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Imam</th>
            <th>Khatib</th>
            <th>Muazin</th>
            <th>Bilal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jadwal.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
              <td>{item.imam}</td>
              <td>{item.khatib}</td>
              <td>{item.muazin}</td>
              <td>{item.bilal}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)} className="ms-2">
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Konfirmasi */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === 'edit' ? 'Edit Jadwal Imam' : 'Konfirmasi Simpan'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === 'edit' ? (
            <p>Jadwal berhasil disimpan</p>
          ) : (
            <p>Apakah Anda yakin ingin menyimpan jadwal ini?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          {modalAction === 'edit' || modalAction === 'add' ? (
            <Button variant="primary" onClick={handleConfirmSave}>
              Simpan
            </Button>
          ) : (
            <Button variant="danger" onClick={confirmDelete}>
              Hapus
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default JadwalImamAdmin;
