import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const PeminjamanAdmin = () => {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPeminjaman, setNewPeminjaman] = useState({ namaBarang: '', peminjam: '', tanggalPinjam: '', tanggalKembali: '' });
  const [editingPeminjaman, setEditingPeminjaman] = useState(null);

  useEffect(() => {
    // Fetch peminjaman data (replace with actual API call)
    fetchPeminjamanData();
  }, []);

  const fetchPeminjamanData = async () => {
    // Dummy data, replace with real data fetching
    const data = [
      { id: 1, namaBarang: 'Mikrofon', peminjam: 'John Doe', tanggalPinjam: '2023-06-01', tanggalKembali: '2023-06-05' },
      { id: 2, namaBarang: 'Proyektor', peminjam: 'Jane Smith', tanggalPinjam: '2023-06-02', tanggalKembali: '2023-06-06' },
    ];
    setPeminjamanList(data);
  };

  const handleAddPeminjaman = () => {
    if (!newPeminjaman.namaBarang || !newPeminjaman.peminjam || !newPeminjaman.tanggalPinjam || !newPeminjaman.tanggalKembali) {
      Swal.fire('Error', 'Semua kolom harus diisi!', 'error');
      return;
    }

    // Add new peminjaman (replace with actual API call)
    const newPeminjamanData = { ...newPeminjaman, id: peminjamanList.length + 1 };
    setPeminjamanList([...peminjamanList, newPeminjamanData]);
    setNewPeminjaman({ namaBarang: '', peminjam: '', tanggalPinjam: '', tanggalKembali: '' });
    setShowModal(false);
    Swal.fire('Success', 'Peminjaman berhasil ditambahkan!', 'success');
  };

  const handleEditPeminjaman = (peminjaman) => {
    setEditingPeminjaman(peminjaman);
    setShowModal(true);
    setNewPeminjaman(peminjaman);
  };

  const handleUpdatePeminjaman = () => {
    if (!newPeminjaman.namaBarang || !newPeminjaman.peminjam || !newPeminjaman.tanggalPinjam || !newPeminjaman.tanggalKembali) {
      Swal.fire('Error', 'Semua kolom harus diisi!', 'error');
      return;
    }

    // Update peminjaman (replace with actual API call)
    setPeminjamanList(peminjamanList.map(p => (p.id === editingPeminjaman.id ? newPeminjaman : p)));
    setEditingPeminjaman(null);
    setShowModal(false);
    Swal.fire('Success', 'Peminjaman berhasil diperbarui!', 'success');
  };

  const handleDeletePeminjaman = (id) => {
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: 'Data peminjaman ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete peminjaman (replace with actual API call)
        setPeminjamanList(peminjamanList.filter(peminjaman => peminjaman.id !== id));
        Swal.fire('Deleted!', 'Peminjaman telah dihapus.', 'success');
      }
    });
  };

  return (
    <div>
      <h2>Manajemen Peminjaman</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>Tambah Peminjaman</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nama Barang</th>
            <th>Peminjam</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Kembali</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {peminjamanList.map((peminjaman) => (
            <tr key={peminjaman.id}>
              <td>{peminjaman.namaBarang}</td>
              <td>{peminjaman.peminjam}</td>
              <td>{peminjaman.tanggalPinjam}</td>
              <td>{peminjaman.tanggalKembali}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditPeminjaman(peminjaman)}>Edit</Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDeletePeminjaman(peminjaman.id)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal untuk Tambah/Edit Peminjaman */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingPeminjaman ? 'Edit Peminjaman' : 'Tambah Peminjaman'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNamaBarang">
              <Form.Label>Nama Barang</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Barang"
                value={newPeminjaman.namaBarang}
                onChange={(e) => setNewPeminjaman({ ...newPeminjaman, namaBarang: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPeminjam">
              <Form.Label>Peminjam</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Peminjam"
                value={newPeminjaman.peminjam}
                onChange={(e) => setNewPeminjaman({ ...newPeminjaman, peminjam: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formTanggalPinjam">
              <Form.Label>Tanggal Pinjam</Form.Label>
              <Form.Control
                type="date"
                value={newPeminjaman.tanggalPinjam}
                onChange={(e) => setNewPeminjaman({ ...newPeminjaman, tanggalPinjam: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formTanggalKembali">
              <Form.Label>Tanggal Kembali</Form.Label>
              <Form.Control
                type="date"
                value={newPeminjaman.tanggalKembali}
                onChange={(e) => setNewPeminjaman({ ...newPeminjaman, tanggalKembali: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
          <Button
            variant="primary"
            onClick={editingPeminjaman ? handleUpdatePeminjaman : handleAddPeminjaman}
          >
            {editingPeminjaman ? 'Perbarui Peminjaman' : 'Tambah Peminjaman'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PeminjamanAdmin;
