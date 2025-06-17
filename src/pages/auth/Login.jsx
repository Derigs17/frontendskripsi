import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import bgmasjid from '../../images/bglogin.png';  // Gambar latar belakang
import logomasjid from '../../assets/logomasjid.png'; // Logo kecil

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  // Kirim data login ke backend menggunakan axios
  axios
    .post('http://localhost:8001/login', {  // Pastikan URL benar
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.message === 'Login successful') {
        // Menyimpan email pengguna dan role di localStorage
        localStorage.setItem('loggedInUserEmail', response.data.user.email);
        localStorage.setItem('isLoggedIn', 'IsLogin'); // Menyimpan status login
        localStorage.setItem('userRole', response.data.user.role); // Menyimpan role

        // Jika user adalah admin, arahkan ke dashboard admin
        if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard');  // Arahkan ke dashboard admin
        } else {
          navigate('/profile');  // Arahkan ke halaman profil pengguna setelah login
        }
      } else {
        alert('Email atau password salah!');
      }
    })
    .catch((error) => {
      console.error('Login gagal:', error);
      alert('Terjadi kesalahan saat login. Coba lagi.');
    });
};


  return (
    <Container className="login-container d-flex flex-column align-items-center justify-content-center ">
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
            className='mt-5'
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
