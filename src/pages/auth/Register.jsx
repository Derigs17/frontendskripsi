import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for sending requests
import bgmasjid from '../../images/bglogin.png';  // Gambar latar belakang
import logomasjid from '../../assets/logomasjid.png'; // Logo kecil

const Register = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Send the registration data to backend using axios
    axios
      .post('https://backendskripsi.vercel.app/register', {  // URL disesuaikan dengan backend Anda (port 8001)
        nama: nama,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.message === 'Registration successful') {
          alert('Registration successful!');
          navigate('/login');  // Redirect to login page
        } else {
          alert('Registration failed! Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again later.');
      });
  };

  return (
    <Container className="login-container d-flex flex-column align-items-center justify-content-center">
      <Row className="login-content align-items-center mb-5">
        <Col
          className="login-form d-flex flex-column align-items-center justify-content-center"
          style={{
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            height: '550px',
            padding: '20px',
            backgroundColor: '#fff'
          }}
        >
          <img
            src={logomasjid}
            alt="Logo"
            style={{ width: '80px', height: '80px' }}
            className="mb-2 mt-3"
          />
          <h2 className="mb-4">Daftar</h2>
          
          <Form onSubmit={handleRegister}>
            <Form.Group className="text-start mb-3" controlId="formBasicNama">
                <h5>Nama</h5>
              <Form.Control
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="text-start mb-3" controlId="formBasicEmail">
                <h5>Email</h5>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="text-start mb-3" controlId="formBasicPassword">
                <h5>Password</h5>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="secondary"
              type="submit"
              style={{
                backgroundColor: '#34745C',
                display: 'block',
                margin: 'auto',
                height: '35px',
                width: '220px',
              }}
            >
              Register
            </Button>

            <p className="mt-3 text-center mb-5">
              Already have an account?{' '}
              <a href="/login" style={{ color: '#34745C' }}>
                Login here
              </a>
            </p>
          </Form>
        </Col>

        <Col className="image-login">
          <img
            src={bgmasjid}
            alt="Background Image"
            className="img-fluid"
            style={{
              width: '520px',
              borderRadius: '10px',
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
