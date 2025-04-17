import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./login.css";
import img from '../Image/Logo.png';
import FrontFooter from '../Component/FrontFooter';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
          
            console.log('Response from server:', response);
          
            if (response.data && response.data.token) {
              console.log('Token received:', response.data.token);

              localStorage.setItem('authToken', response.data.token);
          
              const decodedToken = decodeToken(response.data.token);
              console.log('Decode Token:', decodedToken.role);

              if (decodedToken.role === 'admin') {
                window.location.href = '/adminDashboard';
              } else {
                window.location.href = '/userDashboard';
              }
            } else {
                window.location.href = '/';
              console.error('No token found in response');
              setError('Login failed, please try again.');
            }
          
          } catch (err) {
            if (err.response && err.response.status === 400) {
              setError(err.response.data.error);
            } else {
              setError('An error occurred during login');
            }
          }
          
    };


    return (
        <div className='loginMain'>
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
                            <Button className="forget-password" variant="link">Forget Your Password</Button>
                        </Link>

                        <Button type="submit" variant="primary" className="primary-button">Sign In</Button>{' '}

                        <p className="inline">Don't have an account?
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
