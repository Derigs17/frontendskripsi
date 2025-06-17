import React, { useState, useEffect } from 'react';
import { Container, Table, Form } from 'react-bootstrap';

const JadwalImam = () => {
  const [jadwal, setJadwal] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // +1 karena month dimulai dari 0
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const bulanLabel = new Date(selectedYear, selectedMonth - 1).toLocaleString('id-ID', { month: 'long' });
  
  // Ambil data jadwal berdasarkan bulan dan tahun yang dipilih
  useEffect(() => {
    fetchJadwal();
  }, [selectedMonth, selectedYear]); // Fetch ulang setiap bulan atau tahun berubah

  const fetchJadwal = async () => {
    const response = await fetch(`http://localhost:8001/getJadwalImamForMonth?bulan=${selectedMonth}&tahun=${selectedYear}`);
    const data = await response.json();
    setJadwal(data);
  };

  const handleChangeMonth = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleChangeYear = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  return (
    <div className="page-content">
      <Container className="mt-5">
        <h2 className="text-center mb-4">Jadwal Imam, Khatib, Muazin & Bilal Jumat</h2>

        <Form className="mb-4 d-flex gap-4 justify-content-center">
          <Form.Select 
            value={selectedMonth} 
            onChange={handleChangeMonth} 
            style={{ 
              maxWidth: '200px', 
              borderRadius: '10px', 
              borderColor: '#0D1B2A ', 
              backgroundColor: '#fff9e6', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
              </option>
            ))}
          </Form.Select>

          <Form.Select 
            value={selectedYear} 
            onChange={handleChangeYear} 
            style={{ 
              maxWidth: '200px', 
              borderRadius: '10px', 
              borderColor: '#0D1B2A ', 
              backgroundColor: '#fff9e6', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
            }}
          >
            {Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </Form>

        <h5 className="text-center mb-4">{bulanLabel} {selectedYear}</h5>

        <div style={{ overflowX: 'auto',borderRadius: '10px', }}>
          <Table 
            striped 
            bordered 
            hover 
            responsive 
            className="table-jadwal-imam"
           style={{}}
          >
            <thead>
              <tr>
                <th style={{ backgroundColor: '#0D1B2A ', color: '#fff', textAlign: 'center' }}>Tanggal</th>
                <th style={{ backgroundColor: '#0D1B2A ', color: '#fff', textAlign: 'center' }}>Imam</th>
                <th style={{ backgroundColor: '#0D1B2A ', color: '#fff', textAlign: 'center' }}>Khatib</th>
                <th style={{ backgroundColor: '#0D1B2A ', color: '#fff', textAlign: 'center' }}>Muazin</th>
                <th style={{ backgroundColor: '#0D1B2A ', color: '#fff', textAlign: 'center' }}>Bilal</th>
              </tr>
            </thead>
            <tbody>
              {jadwal.map((item) => (
                <tr 
                  key={item.id} 
                  
                >
                  <td >
                    {new Date(item.tanggal).toLocaleDateString('id-ID', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td>{item.imam}</td>
                  <td>{item.khatib}</td>
                  <td>{item.muazin}</td>
                  <td>{item.bilal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default JadwalImam;
