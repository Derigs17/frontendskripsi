import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Menggunakan axios untuk request

import bgmasjid from '../../images/bglogin.png';  // Gambar latar belakang
import logomasjid from '../../assets/logomasjid.png'; // Logo kecil

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError('Email dan password tidak boleh kosong');
    return;
  }

  try {
    const response = await axios.post('https://backendskripsi.vercel.app/login', {
      email: email,
      password: password,
    });

    if (response.data.message === 'Login successful') {
      localStorage.setItem('loggedInUserEmail', email);
      localStorage.setItem('isLoggedIn', 'IsLogin');
      localStorage.setItem('userRole', response.data.user.role);

      // Routing sesuai role
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/profile');
      }
    } else {
      setError(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    setError('Terjadi kesalahan saat login. Silakan coba lagi.');
  }

  // console.log("Try login - email:", email);
  // console.log("Try login - password:", password);
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
            backgroundColor: '#fff',
          }}
        >
          <img
            src={logomasjid}
            alt="Logo"
            style={{ width: '80px', height: '80px' }}
            className="mb-2 mt-4"
          />
          <h2 className="mb-4">Masuk</h2>

          {/* Menampilkan pesan error jika ada */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form onSubmit={handleLogin}>
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
              className="mt-5"
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
              Login
            </Button>

            <p className="mt-3 text-center mb-5">
              Don't have an account?{' '}
              <a href="/register" style={{ color: '#34745C' }}>
                Create Account
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
              width: '450px',
              borderRadius: '10px',
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
