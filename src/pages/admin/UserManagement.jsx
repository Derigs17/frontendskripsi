import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

const UserManagement = () => {
  const [users, setUsers] = useState([]);  // Menyimpan data user
  const [newUser, setNewUser] = useState({ email: '', role: 'user', name: '', password: '' });  // Menyimpan data user baru
  const [showAddModal, setShowAddModal] = useState(false);  // Menyimpan status modal tambah user
  const [showDeleteModal, setShowDeleteModal] = useState(false);  // Menyimpan status modal konfirmasi hapus
  const [userToDelete, setUserToDelete] = useState(null);  // Menyimpan user yang akan dihapus

  // Ambil data user dari backend saat komponen pertama kali dirender
  useEffect(() => {
    axios.get('http://localhost:8001/getAllUsers')
      .then(response => {
        setUsers(response.data);  // Menyimpan data user yang diterima dari backend
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Fungsi untuk menambah user baru
  const handleAddUser = () => {
    if (!newUser.email || !newUser.role || !newUser.name || !newUser.password) {
      alert('Please provide email, role, name, and password!');
      return;
    }

    // Mengirim request POST ke backend untuk menambah user
    axios.post('http://localhost:8001/addUser', newUser)
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        setUsers([...users, { email: newUser.email, role: newUser.role, name: newUser.name, password: newUser.password }]);  // Menambah user baru ke daftar
        setShowAddModal(false);  // Menutup modal setelah berhasil
        setNewUser({ email: '', role: 'user', name: '', password: '' });  // Reset form input
      })
      .catch(error => {
        console.error("Error adding user:", error);
      });
  };

  // Fungsi untuk menghapus user berdasarkan email
  const handleDeleteUser = (email) => {
    axios.delete(`http://localhost:8001/deleteUser/${email}`)
      .then(() => {
        setUsers(users.filter(user => user.email !== email));  // Menghapus user dari daftar
        setShowDeleteModal(false);  // Menutup modal setelah user dihapus
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  };

  // Fungsi untuk membuka modal konfirmasi hapus
  const openDeleteModal = (email) => {
    setUserToDelete(email);
    setShowDeleteModal(true);
  };

  return (
    <Container>
      <h2>User Management</h2>

      {/* Tombol untuk menambah user */}
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add User
      </Button>

      {/* Tabel untuk menampilkan daftar user */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Name</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.name}</td>
              <td>{user.password}</td>
              <td>
                <Button variant="danger" onClick={() => openDeleteModal(user.email)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal untuk menambah user */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeleteUser(userToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserManagement;
