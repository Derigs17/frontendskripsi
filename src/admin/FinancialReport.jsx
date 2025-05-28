import React from 'react';
import { Table, Button } from 'react-bootstrap';

const FinancialReport = () => {
  return (
    <div>
      <h2>Laporan Keuangan Masjid</h2>
      <Button variant="info" className="mb-3">Lihat Laporan</Button>

      <Table striped bordered hover>
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

export default FinancialReport;
