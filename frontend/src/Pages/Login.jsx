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

    const loginData = { email, password };

    try {
      try {
        const userRes = await axios.post('http://localhost:5000/api/users/login', loginData);

        if (userRes.data?.token) {
          const token = userRes.data.token;
          localStorage.setItem('token', token);
          const decoded = decodeToken(token);

          const role = decoded.role?.toLowerCase() || '';
          if (role === 'user') {
            navigate('/userdashboard');
            return;
          } else if (role === 'admin') {
            navigate('/admindashboard');
            return;
          } else {
            setError('Unknown user role');
            localStorage.removeItem('token');
            return;
          }
        } else {
          throw new Error('No token received from user login');
        }
      } catch (userErr) {
        console.error('User login error:', userErr.response?.data || userErr.message);
      }

      try {
        const adminRes = await axios.post('http://localhost:5000/api/admins/login', loginData);

        if (adminRes.data?.token) {
          const token = adminRes.data.token;
          localStorage.setItem('token', token);
          const decoded = decodeToken(token);

          const role = decoded.role?.toLowerCase() || '';
          const adminId = decoded.id;

          if (role === 'hospital') {
            navigate('/hospitaldashboard');
          } else if (role === 'bloodbank') {
            navigate(`/basedashboard/${adminId}`);
          } else if (role === 'admin') {
            navigate('/admindashboard');
          } else {
            setError('Invalid admin role');
            localStorage.removeItem('token');
          }
        } else {
          throw new Error('No token received from admin login');
        }
      } catch (adminErr) {
        console.error('Admin login error:', adminErr.response?.data || adminErr.message);
        setError(adminErr.response?.data?.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Unexpected error in handleSubmit:', err.message);
      setError('An unexpected error occurred. Please try again.');
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
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email address</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </Form.Floating>

            <Link to="/change">
              <Button variant="link" className="forget-password">
                Forget Your Password
              </Button>
            </Link>

            <Button type="submit" variant="primary" className="primary-button">
              Sign In
            </Button>

            <p className="inline">
              Don't have an account?
              <Link to="/signup">
                <Button variant="link" className="link-button">SignUp</Button>
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