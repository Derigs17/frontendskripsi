// validasiregister.js
export const validateRegister = (nama, email, password) => {
  // Validasi nama (tidak boleh kosong)
  if (!nama) {
    return {
      success: false,
      message: 'Nama tidak boleh kosong!'
    };
  }

  // Validasi email (harus dalam format yang benar)
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email || !emailPattern.test(email)) {
    return {
      success: false,
      message: 'Email tidak valid!'
    };
  }

  // Validasi password (minimal 6 karakter)
  if (!password || password.length < 6) {
    return {
      success: false,
      message: 'Password harus terdiri dari minimal 6 karakter!'
    };
  }

  // Jika semua validasi lolos
  return {
    success: true
  };
};
