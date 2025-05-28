import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white mt-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2025 Masjid At-Taqwa Wates. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
