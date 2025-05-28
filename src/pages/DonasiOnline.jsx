import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const DonasiOnline = () => {
  const [donasi, setDonasi] = useState(0);

  const handleDonasiChange = (e) => {
    setDonasi(e.target.value);
  };

  const handleDonasiSubmit = (e) => {
    e.preventDefault();
    alert(`Terima kasih atas donasi Anda sebesar Rp ${donasi}`);
    // Anda bisa mengirim data donasi ke server di sini
  };

  return (
    <div>
      <h2>Donasi Online</h2>
      <Form onSubmit={handleDonasiSubmit}>
        <Form.Group controlId="formDonasi">
          <Form.Label>Jumlah Donasi</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Masukkan jumlah donasi" 
            value={donasi} 
            onChange={handleDonasiChange} 
            min="1000"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Donasi
        </Button>
      </Form>
    </div>
  );
};

export default DonasiOnline;
