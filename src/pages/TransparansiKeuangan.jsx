import React from 'react';
import { Table } from 'react-bootstrap';
import bgImage from '../images/bg.jpg'; // Sesuaikan path sesuai letak gambar

const TransparansiKeuangan = () => {
  const divStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Untuk memastikan latar belakang memenuhi seluruh layar
    padding: '20px',
    color: 'white', // Warna teks agar terlihat jelas
  };

  return (
    <div style={divStyle}>
      <h2>Transparansi Keuangan</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Keterangan</th>
            <th>Pemasukan</th>
            <th>Pengeluaran</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12/05/2025</td>
            <td>Donasi Pengajian</td>
            <td>Rp 1.500.000</td>
            <td>Rp 500.000</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TransparansiKeuangan;
