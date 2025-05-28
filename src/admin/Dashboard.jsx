import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard Admin</h2>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Donasi</Card.Title>
              <Card.Text>Rp 5.000.000</Card.Text>
              <Button variant="primary">Lihat Detail</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Zakat</Card.Title>
              <Card.Text>Rp 2.000.000</Card.Text>
              <Button variant="primary">Lihat Detail</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Pengeluaran</Card.Title>
              <Card.Text>Rp 1.500.000</Card.Text>
              <Button variant="primary">Lihat Detail</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
