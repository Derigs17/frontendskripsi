import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ManageZakat = () => {
  return (
    <div>
      <h2>Manajemen Zakat</h2>
      <Button variant="success" className="mb-3">Tambah Zakat</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Jumlah Zakat</th>
            <th>Jenis Zakat</th>
            <th>Penerima</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12/05/2025</td>
            <td>Rp 1.000.000</td>
            <td>Uang</td>
            <td>Mustahik 1</td>
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

export default ManageZakat;
