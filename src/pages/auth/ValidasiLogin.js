import axios from 'axios';

// Fungsi untuk memvalidasi login
export const validateLogin = async (email, password) => {
  try {
    // Kirim data login ke backend menggunakan axios
    const response = await axios.post('http://localhost:8001/login', {
      email: email,
      password: password,
    });

    if (response.data.message === 'Login successful') {
      // Jika login berhasil, kembalikan data user
      return {
        success: true,
        data: response.data.user,
      };
    } else {
      // Jika login gagal
      return {
        success: false,
        message: 'Email atau password salah!',
      };
    }
  } catch (error) {
    console.error('Login gagal:', error);
    return {
      success: false,
      message: 'Terjadi kesalahan saat login. Coba lagi.',
    };
  }
};
