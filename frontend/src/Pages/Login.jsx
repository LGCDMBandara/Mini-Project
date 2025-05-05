import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import img from '../Image/Logo.png';
import FrontFooter from '../Component/FrontFooter';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return {};
  }
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Ensure request body is correctly formatted
    const loginData = { email, password };
    console.log('Login attempt with:', loginData);

    try {
      // Try user login
      const userRes = await axios.post('http://localhost:5000/api/users/login', loginData);
      console.log('User login response:', userRes.data);

      if (userRes.data?.token) {
        localStorage.setItem('authToken', userRes.data.token);
        const decoded = decodeToken(userRes.data.token);
        console.log('Decoded user token:', decoded);
        const role = decoded.role || 'user';

        if (role === 'admin') {
          navigate('/adminDashboard');
        } else {
          navigate('/userDashboard');
        }
        return;
      }
    } catch (userErr) {
      console.error('User login error:', userErr.response?.data);
      const userErrorMsg = userErr.response?.data?.error || 'User login failed';
      setError(userErrorMsg);

      // Try admin login only if user login fails
      try {
        const adminRes = await axios.post('http://localhost:5000/api/admins/login', loginData);

        if (adminRes.data?.token) {
          localStorage.setItem('authToken', adminRes.data.token);
          const decoded = decodeToken(adminRes.data.token);
          const role = decoded.role;

          if (role === 'Hospital') {
            navigate('/hospitalDashboard');
          } else if (role === 'BloodBank') {
            localStorage.setItem('userEmail', decoded.email);
            navigate('/baseDashboard');
          } else {
            setError('Invalid admin role');
          }
        } else {
          setError('No token received from admin login');
        }
      } catch (adminErr) {
        const adminErrorMsg = adminErr.response?.data?.error || 'Admin login failed';
        setError(`${userErrorMsg}. Also, ${adminErrorMsg}`);
      }
    }
  };

  return (
    <div className="loginMain">
      <div className="image">
        <img src={img} alt="Logo" />
      </div>
      <div className="wrapper">
        <div className="main">
          <h1>Sign In</h1>
          <p>Sign in and start managing your candidates!</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingInputCustom">Email address</label>
            </Form.Floating>

            <Form.Floating>
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>

            <Link to="/change">
              <Button className="forget-password" variant="link">
                Forget Your Password
              </Button>
            </Link>

            <Button type="submit" variant="primary" className="primary-button">
              Sign In
            </Button>

            <p className="inline">
              Don't have an account?
              <Link to="/signup">
                <Button variant="link" className="link-button">
                  SignUp
                </Button>
              </Link>
            </p>
          </Form>
        </div>
      </div>
      <div className="footer">
        <FrontFooter />
      </div>
    </div>
  );
};

export default Login;