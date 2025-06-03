import React, { useState } from 'react';
import { Container, Table, Form } from 'react-bootstrap';

const imamKhatibList = ['Ust. Dendi', 'Ust. Miftahudin', 'Ust. Asep', 'Ust. Amar Suherna'];
const muazinBilalList = ['Aji', 'Saep', 'Wa Uban', 'Herdi', 'Enas'];

const getFridaysInMonth = (year, month) => {
  const dates = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    if (d.getDay() === 5) {
      dates.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return dates.slice(0, 4);
};

const rotateList = (list, shift) => {
  const len = list.length;
  return list.map((_, i) => list[(i + shift) % len]);
};

const JadwalImam = () => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear] = useState(now.getFullYear());

  const jumatDates = getFridaysInMonth(selectedYear, selectedMonth);
  const bulanLabel = jumatDates[0]?.toLocaleString('id-ID', { month: 'long' });
  const tahunLabel = selectedYear;

  const handleChangeMonth = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const imamList = rotateList(imamKhatibList, selectedMonth);
  const khatibList = rotateList(imamKhatibList.slice().reverse(), selectedMonth);
  const muazinList = rotateList(muazinBilalList, selectedMonth);

  return (
    <div className="page-content">
      <Container className="pt-4">
        <h2 className="text-center mb-4">Jadwal Imam, Khatib, Muazin & Bilal Jumat</h2>

        <Form className="mb-3 d-flex gap-2 justify-content-center">
          <Form.Select value={selectedMonth} onChange={handleChangeMonth} style={{ maxWidth: '200px' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
              </option>
            ))}
          </Form.Select>
        </Form>

        <h5 className="text-center mb-3">{bulanLabel} {tahunLabel}</h5>

        <div style={{ overflowX: 'auto' }}>
          <Table striped bordered hover responsive className="table-jadwal">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Imam</th>
                <th>Khatib</th>
                <th>Muazin & Bilal</th>
              </tr>
            </thead>
            <tbody>
              {jumatDates.map((tgl, index) => {
                const imam = imamList[index % imamList.length];
                let khatib = khatibList[index % khatibList.length];
                if (khatib === imam) {
                  khatib = khatibList[(index + 1) % khatibList.length];
                }
                const muazin = muazinList[index % muazinList.length];

                return (
                  <tr key={index}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {tgl.toLocaleDateString('id-ID', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td>{imam}</td>
                    <td>{khatib}</td>
                    <td>{muazin}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default JadwalImam;
