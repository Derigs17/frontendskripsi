import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi setelah logout atau login

function UserProfile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showModal, setShowModal] = useState(false); // State untuk modal login
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Menandakan apakah sedang dalam mode edit
  const navigate = useNavigate(); // Hook untuk melakukan navigasi

  // Cek status login dan ambil data profil jika sudah login
  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('loggedInUserEmail');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      // Cek apakah pengguna sudah login atau belum
      if (!email || isLoggedIn !== 'IsLogin') {
        setShowModal(true); // Tampilkan modal jika belum login
      } else {
        await fetchUserProfile(email); // Ambil data profil pengguna jika sudah login
      }
    };

    fetchData();
  }, [navigate]);

  // Fungsi untuk mengambil data profil pengguna berdasarkan email
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

  // Fungsi untuk logout
  const handleLogout = async () => {
    try {
      const email = localStorage.getItem('loggedInUserEmail');
      await axios.post('http://localhost:8001/logout', { email });

      // Menghapus data login di localStorage dan mengarahkan ke halaman login
      localStorage.removeItem('loggedInUserEmail');
      localStorage.removeItem('isLoggedIn');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Fungsi untuk menyimpan perubahan data profil
  const handleSubmit = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-unused-vars
    const updatedUserData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    setShowConfirmationModal(true);
  };

  // Fungsi untuk mengonfirmasi perubahan data profil
  const handleSaveConfirmed = async () => {
    try {
      const email = localStorage.getItem('loggedInUserEmail');
      await axios.post(`http://localhost:8001/updateUserProfile/${encodeURIComponent(email)}`, userData);

      console.log('User data updated successfully:', userData);
      setIsEditing(false); // Set mode edit ke false setelah simpan
      setShowConfirmationModal(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  // Fungsi untuk membatalkan perubahan
  const handleCancel = () => {
    setIsEditing(false); // Set mode edit ke false jika cancel
    setShowConfirmationModal(false);
  };

  // Fungsi untuk menutup modal login dan tetap di home
  const handleCloseModal = () => {
    setShowModal(false); // Tutup modal login
    navigate('/'); // Arahkan ke halaman home, bukan login
  };

  // Fungsi untuk login, setelah login mengarahkannya ke halaman login
  const handleLoginRedirect = () => {
    setShowModal(false); // Tutup modal login
    navigate('/login'); // Arahkan ke halaman login
  };

  return (
    <>
      {/* Halaman Profil jika sudah login */}
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
                      disabled={!isEditing} // Disable input jika tidak dalam mode edit
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      name="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      disabled={!isEditing} // Disable input jika tidak dalam mode edit
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      disabled={!isEditing} // Disable input jika tidak dalam mode edit
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
              {/* Tombol Logout */}
              <Button variant="danger" className='mt-3 ' onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal untuk Pengguna yang Belum Login */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Anda belum login. Silahkan login terlebih dahulu untuk mengakses User Profile.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginRedirect}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

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
    </>
  );
}

export default UserProfile;
