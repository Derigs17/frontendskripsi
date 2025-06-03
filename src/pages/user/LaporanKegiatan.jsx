import React, { useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import bukabersama from '../../images/bukabersama.png';

const kegiatanAkanDatang = [
  {
    id: 1,
    judul: 'Pengajian Ibu-Ibu',
    tanggal: 'Setiap Jumat, setiap bulan',
    deskripsi: 'Pengajian rutin ibu-ibu yang diadakan setiap hari Jumat setiap bulannya.',
  },
  {
    id: 2,
    judul: 'Hari Raya Idul Adha',
    tanggal: '6 Juni 2025',
    deskripsi: 'Pelaksanaan salat Idul Adha dan penyembelihan hewan qurban.',
  },
  {
    id: 3,
    judul: 'Pengajian Akbar',
    tanggal: '12 Juli 2025',
    deskripsi: 'Pengajian akbar terbuka untuk umum bersama ustadz ternama.',
  },
];

const kegiatanSelesai = [
  {
    id: 1,
    judul: 'Pengajian Bapak-Bapak',
    tanggal: '20 Mei 2025',
    deskripsi: 'Kegiatan pengajian rutin bapak-bapak di masjid.',
  },
  {
    id: 2,
    judul: 'Maulid Nabi',
    tanggal: '10 April 2025',
    deskripsi: 'Peringatan Maulid Nabi Muhammad SAW.',
  },
  {
    id: 3,
    judul: 'Buka Bersama',
    tanggal: '5 April 2025',
    deskripsi: 'Buka puasa bersama warga sekitar.',
  },
];

const LaporanKegiatan = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <Container className="my-3">
      {/* Kegiatan Akan Datang */}
      <h2 className="mb-4 fw-bold">Kegiatan Akan Datang</h2>
      <Row className="g-4 mb-5">
        {kegiatanAkanDatang.map((kegiatan) => (
          <Col md={4} key={kegiatan.id}>
            <Card>
              <Card.Img variant="top" src={bukabersama} />
              <Card.Body>
                <Card.Title>{kegiatan.judul}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{kegiatan.tanggal}</Card.Subtitle>
                <Card.Text>{kegiatan.deskripsi}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Kegiatan Telah Selesai */}
      <h2 className="mb-3 fw-bold">Kegiatan yang Telah Selesai</h2>
      <div className="d-flex align-items-center gap-2">
        <Button variant="light" onClick={scrollLeft}>&lt;</Button>

        <div
          ref={scrollRef}
          className="d-flex overflow-x-auto gap-3 pb-3"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            overflowX: 'auto',
          }}
        >
          {kegiatanSelesai.map((kegiatan) => (
            <Card
              key={kegiatan.id}
              className="flex-shrink-0"
              style={{
                minWidth: '260px',
                maxWidth: '260px',
                scrollSnapAlign: 'start',
              }}
            >
              <Card.Img variant="top" src={bukabersama} />
              <Card.Body>
                <Card.Title>{kegiatan.judul}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{kegiatan.tanggal}</Card.Subtitle>
                <Card.Text>{kegiatan.deskripsi}</Card.Text>
                <Button variant="warning" className="text-white fw-semibold">
                  Lihat Dokumentasi
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        <Button variant="light" onClick={scrollRight}>&gt;</Button>
      </div>
    </Container>
  );
};

export default LaporanKegiatan;
