import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom'; // Untuk navigasi setelah logout atau login
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea

function UserProfile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
<<<<<<< HEAD
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Modal konfirmasi perubahan
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal konfirmasi logout
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
=======
  const [showModal, setShowModal] = useState(false); // State untuk modal login
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Menandakan apakah sedang dalam mode edit
  const navigate = useNavigate(); // Hook untuk melakukan navigasi
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea

  // Cek status login dan ambil data profil jika sudah login
  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('loggedInUserEmail');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      // Cek apakah pengguna sudah login atau belum
      if (!email || isLoggedIn !== 'IsLogin') {
<<<<<<< HEAD
        navigate('/login'); // Kalau belum login, arahkan ke login
=======
        setShowModal(true); // Tampilkan modal jika belum login
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
      } else {
        await fetchUserProfile(email); // Ambil data profil pengguna jika sudah login
      }
    };

    fetchData();
  }, [navigate]);

<<<<<<< HEAD
=======
  // Fungsi untuk mengambil data profil pengguna berdasarkan email
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
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

<<<<<<< HEAD
=======
  // Fungsi untuk logout
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

<<<<<<< HEAD
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
=======
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
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
  };

  return (
    <>
<<<<<<< HEAD
=======
      {/* Halaman Profil jika sudah login */}
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
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
<<<<<<< HEAD
                      disabled={!isEditing} // Disabled jika tidak dalam mode edit
=======
                      disabled={!isEditing} // Disable input jika tidak dalam mode edit
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      name="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
<<<<<<< HEAD
                      disabled={!isEditing} // Disabled jika tidak dalam mode edit
=======
                      disabled={!isEditing} // Disable input jika tidak dalam mode edit
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
<<<<<<< HEAD
                      disabled={!isEditing} // Disabled jika tidak dalam mode edit
                    />
                  </Form.Group>
                  

=======
                      disabled={!isEditing} // Disable input jika tidak dalam mode edit
                    />
                  </Form.Group>
                  
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
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
<<<<<<< HEAD
              <Button variant="danger" className='mt-3 ' onClick={() => setShowLogoutModal(true)}>
=======
              {/* Tombol Logout */}
              <Button variant="danger" className='mt-3 ' onClick={handleLogout}>
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
                Logout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

<<<<<<< HEAD
=======
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

>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
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
<<<<<<< HEAD
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
=======
>>>>>>> 3f5581965103f06081ac508fad924fe7e4b5d8ea
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserProfile;
