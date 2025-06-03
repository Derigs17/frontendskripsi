// src/Admin/PeminjamanAdmin.jsx
import React, { useState } from 'react';

const dummyData = [
  { id: 1, nama: 'Ahmad', barang: 'Proyektor', tanggal: '2025-06-01', status: 'Pending' },
  { id: 2, nama: 'Siti', barang: 'Kursi Lipat', tanggal: '2025-06-03', status: 'Pending' },
];

const PeminjamanAdmin = () => {
  const [data, setData] = useState(dummyData);

  const handleKonfirmasi = (id) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, status: 'Disetujui' } : item
    );
    setData(updated);
  };

  return (
    <div>
      <h2>Manajemen Peminjaman Inventaris</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Barang</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pinjam) => (
            <tr key={pinjam.id}>
              <td>{pinjam.nama}</td>
              <td>{pinjam.barang}</td>
              <td>{pinjam.tanggal}</td>
              <td>{pinjam.status}</td>
              <td>
                {pinjam.status === 'Pending' ? (
                  <button onClick={() => handleKonfirmasi(pinjam.id)}>Konfirmasi</button>
                ) : (
                  'Sudah Disetujui'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeminjamanAdmin;
