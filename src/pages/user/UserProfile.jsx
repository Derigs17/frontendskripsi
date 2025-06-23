import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Ikon untuk melihat/menyembunyikan password
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); 
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  // State untuk toggle password
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('loggedInUserEmail');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if (!email || isLoggedIn !== 'IsLogin') {
        navigate('/login'); // Redirect ke halaman login jika belum login
      } else {
        await fetchUserProfile(email); // Ambil data profil pengguna jika sudah login
      }
    };

    fetchData();
  }, [navigate]);

  const fetchUserProfile = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8001/getUserProfile/${encodeURIComponent(email)}`);
      if (response.data) {
        setUserData(response.data);
      } else {
        console.error('Empty user data response');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const email = localStorage.getItem('loggedInUserEmail');
      await axios.post('http://localhost:8001/logout', { email });

      localStorage.removeItem('loggedInUserEmail');
      localStorage.removeItem('isLoggedIn');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmationModal(true); // Tampilkan modal konfirmasi saat menyimpan perubahan
  };

  const handleSaveConfirmed = async () => {
    try {
      const updatedUserData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      };

      // Simpan perubahan profil
      await axios.post(`http://localhost:8001/updateUserProfile/${encodeURIComponent(userData.email)}`, updatedUserData);
      setIsEditing(false); // Kembali ke mode non-edit setelah menyimpan
      setShowConfirmationModal(false); // Tutup modal setelah perubahan
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleLogoutModalClose = () => {
    setShowLogoutModal(false); // Tutup modal logout
  };

  const handleLogoutModalConfirm = () => {
    handleLogout(); // Proses logout
    setShowLogoutModal(false); // Tutup modal logout setelah logout
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowConfirmationModal(false); // Tutup modal jika dibatalkan
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);  // Toggle visibility password
  };

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={{ order: 2, span: 12 }} md={{ order: 2, span: 6 }}>
            <Card className="shadow-lg p-4">
              <Card.Header className="text-center">
                <h5>Pengaturan Akun</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nama"
                      name="name"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Alamat email"
                      name="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}  // Tampilkan password jika showPassword true
                        placeholder="Password"
                        name="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        disabled={!isEditing}
                      />
                      <Button variant="link" onClick={togglePasswordVisibility} className="ml-2">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Ikon mata */}
                      </Button>
                    </div>
                  </Form.Group>

                  {isEditing ? (
                    <div className="d-flex justify-content-between">
                      <Button variant="success" type="submit">
                        Simpan Perubahan
                      </Button>
                      <Button variant="secondary" onClick={handleCancel}>
                        Batal
                      </Button>
                    </div>
                  ) : (
                    <Button variant="primary" onClick={() => setIsEditing(true)} className="w-100">
                      Edit
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>

            <Button variant="danger" className="mt-3 w-100" onClick={() => setShowLogoutModal(true)}>
              Logout
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Modal konfirmasi perubahan data */}
      <Modal show={showConfirmationModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin mengubah data profil?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Batal
          </Button>
          <Button variant="success" onClick={handleSaveConfirmed}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal konfirmasi logout */}
      <Modal show={showLogoutModal} onHide={handleLogoutModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin keluar dari akun ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLogoutModalClose}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleLogoutModalConfirm}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserProfile;
