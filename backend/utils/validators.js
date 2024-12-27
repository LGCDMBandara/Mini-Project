const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validatePassword = (password) => {
    return password.length >= 6; // Minimum password length
  };
  
  module.exports = { validateEmail, validatePassword };
  