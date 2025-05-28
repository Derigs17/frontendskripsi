import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const KegiatanMasjid = () => {
  return (
    <div>
      <h2>Kegiatan Masjid</h2>
      <ListGroup>
        <ListGroup.Item>
          <h5>Pengajian Jumat</h5>
          <p>Tanggal: 15/05/2025</p>
          <Button variant="info" href="#">Lihat Detail</Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>Perayaan Hari Raya Idul Fitri</h5>
          <p>Tanggal: 20/05/2025</p>
          <Button variant="info" href="#">Lihat Detail</Button>
        </ListGroup.Item>
        {/* Tambahkan kegiatan lainnya di sini */}
      </ListGroup>
    </div>
  );
};

export default KegiatanMasjid;
