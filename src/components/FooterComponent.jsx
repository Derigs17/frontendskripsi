import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto shadow-sm">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <p className="mb-0">
              &copy; 2025 <strong>Masjid At-Taqwa Wates</strong>. All Rights Reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <small>🌙 Dibangun dengan keikhlasan & React ❤️</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
