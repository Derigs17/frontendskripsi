import React from 'react';
import { Button, Table } from 'react-bootstrap';

const ManageActivities = () => {
  return (
    <div>
      <h2>Pengelolaan Kegiatan Masjid</h2>
      <Button variant="primary" className="mb-3">Tambah Kegiatan</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Kegiatan</th>
            <th>Tanggal</th>
            <th>Deskripsi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Pengajian Jumat</td>
            <td>15/05/2025</td>
            <td>Pengajian mingguan untuk jamaah</td>
            <td>
              <Button variant="warning">Edit</Button>{' '}
              <Button variant="danger">Hapus</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ManageActivities;
