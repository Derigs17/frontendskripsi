import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap'; // Importing necessary components from react-bootstrap

const PeminjamanAdmin = () => {
  const [data, setData] = useState([]); // Data peminjaman menunggu
  const [riwayat, setRiwayat] = useState([]); // Data riwayat yang disetujui/ditolak

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
      <h2 className="mb-4 text-center">Manajemen Peminjaman Inventaris</h2>
      
      {/* Tabel Peminjaman Menunggu */}
      <h4>Peminjaman Menunggu Persetujuan</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
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
              <td>{pinjam.email}</td>
              <td>{pinjam.barang}</td>
              <td>{new Date(pinjam.tgl_mulai).toLocaleDateString()}</td> {/* Hanya menampilkan tanggal, bukan jam */}
              <td>{new Date(pinjam.tgl_selesai).toLocaleDateString()}</td> {/* Hanya menampilkan tanggal, bukan jam */}
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
            <th>Email</th>
            <th>Barang</th>
            <th>Mulai Peminjaman</th>
            <th> Selesai Peminjaman</th>
            <th>Keperluan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {riwayat.map((pinjam, index) => (
            <tr key={pinjam.id}>
              <td>{index + 1}</td>
              <td>{pinjam.nama}</td>
              <td>{pinjam.email}</td>
              <td>{pinjam.barang}</td>
              <td>{new Date(pinjam.tgl_mulai).toLocaleDateString()}</td> {/* Hanya menampilkan tanggal, bukan jam */}
              <td>{new Date(pinjam.tgl_selesai).toLocaleDateString()}</td> {/* Hanya menampilkan tanggal, bukan jam */}
              <td>{pinjam.keperluan}</td>
              <td>{pinjam.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PeminjamanAdmin;
