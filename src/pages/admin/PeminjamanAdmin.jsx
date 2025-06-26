import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal } from 'react-bootstrap'; // Importing necessary components from react-bootstrap

const PeminjamanAdmin = () => {
  const [data, setData] = useState([]); // Data peminjaman menunggu
  const [riwayat, setRiwayat] = useState([]); // Data riwayat yang disetujui/ditolak
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Ambil semua riwayat peminjaman dari server
    axios.get('http://localhost:8001/getAllRiwayatPeminjaman')
      .then(response => {
        // Pisahkan data berdasarkan status
        const filteredData = response.data.filter(item => item.status === 'Menunggu');
        const riwayatData = response.data.filter(item => item.status !== 'Menunggu');
        
        // Urutkan berdasarkan ID (id terbesar di atas)
        const sortedFilteredData = filteredData.sort((a, b) => b.id - a.id);
        const sortedRiwayatData = riwayatData.sort((a, b) => b.id - a.id);

        setData(sortedFilteredData);
        setRiwayat(sortedRiwayatData);
      })
      .catch(error => {
        console.error('Error fetching peminjaman data:', error);
      });
  }, []);

  // Fungsi konfirmasi penghapusan
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true); // Menampilkan modal konfirmasi
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8001/deleteRiwayatPeminjaman/${deleteId}`)
      .then(() => {
        // Hapus data dari riwayat setelah berhasil dihapus
        setRiwayat(riwayat.filter(item => item.id !== deleteId));
        setShowModal(false);
      })
      .catch(error => console.error('Error deleting record:', error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  const handleKonfirmasi = (id, status) => {
    // Perbarui status peminjaman ke Disetujui atau Ditolak
    axios.post(`http://localhost:8001/updateStatusPeminjaman/${id}`, { status })
      .then(() => {
        // Update data di frontend setelah status diperbarui
        setData(data.filter(item => item.id !== id)); // Hapus data dari tabel Menunggu
        setRiwayat([{ ...data.find(item => item.id === id), status }, ...riwayat]); // Tambahkan ke riwayat di atas
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-left">Manajemen Peminjaman Inventaris</h2>

      {/* Tabel Peminjaman Menunggu */}
      <h4>Peminjaman Menunggu Persetujuan</h4>
<Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>No</th>
      <th>Nama</th>
      <th>Nomor Telepon</th> {/* Kolom Nomor Telepon */}
      <th>Email</th>
      <th>Barang</th>
      <th>Mulai Peminjaman</th>
      <th>Selesai Peminjaman</th>
      <th>Keperluan</th>
      <th>Status</th>
      <th>Aksi</th>
    </tr>
  </thead>
  <tbody>
    {data.map((pinjam, index) => (
      <tr key={pinjam.id}>
        <td>{index + 1}</td>
        <td>{pinjam.nama}</td>
        <td>{pinjam.nomor_telepon}</td> {/* Menampilkan Nomor Telepon */}
        <td>{pinjam.email}</td>
        <td>{pinjam.barang}</td>
        <td>{new Date(pinjam.tgl_mulai).toLocaleDateString()}</td>
        <td>{new Date(pinjam.tgl_selesai).toLocaleDateString()}</td>
        <td>{pinjam.keperluan}</td>
        <td>{pinjam.status}</td>
        <td>
          {pinjam.status === 'Menunggu' ? (
            <>
              <Button
                variant="success"
                onClick={() => handleKonfirmasi(pinjam.id, 'Disetujui')}
                className="me-2"
              >
                Setujui
              </Button>
              <Button
                variant="danger"
                onClick={() => handleKonfirmasi(pinjam.id, 'Ditolak')}
              >
                Tolak
              </Button>
            </>
          ) : (
            'Sudah Disetujui/Tolak'
          )}
        </td>
      </tr>
    ))}
  </tbody>
</Table>


      {/* Tabel Riwayat Peminjaman (Disetujui/Tolak) */}
      <h4>Riwayat Peminjaman</h4>
<Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>No</th>
      <th>Nama</th>
      <th>Nomor Telepon</th> {/* Kolom Nomor Telepon */}
      <th>Email</th>
      <th>Barang</th>
      <th>Mulai Peminjaman</th>
      <th>Selesai Peminjaman</th>
      <th>Keperluan</th>
      <th>Status</th>
      <th>Aksi</th>
    </tr>
  </thead>
  <tbody>
    {riwayat.map((pinjam, index) => (
      <tr key={pinjam.id}>
        <td>{index + 1}</td>
        <td>{pinjam.nama}</td>
        <td>{pinjam.nomor_telepon}</td> {/* Menampilkan Nomor Telepon */}
        <td>{pinjam.email}</td>
        <td>{pinjam.barang}</td>
        <td>{new Date(pinjam.tgl_mulai).toLocaleDateString()}</td>
        <td>{new Date(pinjam.tgl_selesai).toLocaleDateString()}</td>
        <td>{pinjam.keperluan}</td>
        <td>{pinjam.status}</td>
        <td>
          <Button variant="danger" onClick={() => handleDelete(pinjam.id)}>
            Hapus
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


      {/* Modal konfirmasi hapus */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus peminjaman ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PeminjamanAdmin;
