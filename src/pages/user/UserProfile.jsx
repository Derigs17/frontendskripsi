import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Modal konfirmasi perubahan
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal konfirmasi logout
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('loggedInUserEmail');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      // Cek apakah pengguna sudah login atau belum
      if (!email || isLoggedIn !== 'IsLogin') {
        navigate('/login'); // Kalau belum login, arahkan ke login
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
    // Mengubah state untuk menampilkan modal konfirmasi
    setShowConfirmationModal(true); // Tampilkan modal konfirmasi sebelum update data
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

      console.log('User data updated successfully:', updatedUserData);
      setIsEditing(false); // Kembali ke mode tidak edit setelah menyimpan
      setShowConfirmationModal(false); // Tutup modal setelah perubahan
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleLogoutModalClose = () => {
    setShowLogoutModal(false); // Tutup modal logout
  };

  const handleLogoutModalConfirm = () => {
    handleLogout(); // Lanjutkan dengan logout
    setShowLogoutModal(false); // Tutup modal logout setelah logout
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowConfirmationModal(false); // Tutup modal jika cancel
  };

  return (
    <>
      <Container className='mt-5 mb-5'>
        <Row className='justify-content-center'>
          <Col className='isi-form' xs={{ order: 2, span: 12 }} md={{ order: 2, span: 6 }}>
            <div className='col-md-10'>
              <div id='form-profile' className='container2'>
                <h5 className='mb-4'>Account Settings</h5>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      disabled={!isEditing} // Disabled jika tidak dalam mode edit
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      name="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      disabled={!isEditing} // Disabled jika tidak dalam mode edit
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      disabled={!isEditing} // Disabled jika tidak dalam mode edit
                    />
                  </Form.Group>
                  

                  {isEditing ? (
                    <>
                      <Button variant="success" className='mb-4' type="submit">
                        Save Changes
                      </Button>{' '}
                      <Button variant="secondary" className='mb-4' onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  )}
                </Form>
              </div>
              <Button variant="danger" className='mt-3 ' onClick={() => setShowLogoutModal(true)}>
                Logout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal konfirmasi perubahan data */}
      <Modal show={showConfirmationModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apa Kamu yakin ingin mengubah data profil?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="success" onClick={handleSaveConfirmed}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal konfirmasi logout */}
      <Modal show={showLogoutModal} onHide={handleLogoutModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin keluar dari akun ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLogoutModalClose}>
            Cancel
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
