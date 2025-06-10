import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const LaporanKeuangan = () => {
  const [pemasukanData, setPemasukanData] = useState([]);
  const [pengeluaranData, setPengeluaranData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pemasukanResponse = await axios.get('http://localhost:8001/getPemasukan');
      setPemasukanData(pemasukanResponse.data);

      const pengeluaranResponse = await axios.get('http://localhost:8001/getPengeluaran');
      setPengeluaranData(pengeluaranResponse.data);
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Laporan Keuangan Bulan Ini</h2>

      <h3>Pemasukan Bulan Ini</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Keterangan</th>
            <th>Jumlah</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {pemasukanData.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.keterangan}</td>
              <td>{item.jumlah}</td>
              <td>{item.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Pengeluaran Bulan Ini</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Keterangan</th>
            <th>Jumlah</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {pengeluaranData.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.keterangan}</td>
              <td>{item.jumlah}</td>
              <td>{item.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LaporanKeuangan;
