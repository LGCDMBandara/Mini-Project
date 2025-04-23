import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./change.css";
import img from '../Image/Logo.png';
import FrontFooter from '../Component/FrontFooter';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Change = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const sendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/send-otp', { email });
            if (response.status === 200) {
                setOtpSent(true);
                toast.success('OTP sent to your email');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Error sending OTP');
        }
    };
    

    const verifyOtpAndChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.warning('Passwords do not match');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/users/changePassword', { email, otp, newPassword });
    
            if (response.status === 200) {
                toast.success('Password changed successfully');
                setEmail('');
                setOtp('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error('Error changing password:', error);
    
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error); 
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };
    
    return (
        <div className='changeMain'>
            <div className="image">
                <img src={img} alt="Logo" />
            </div>
            <div className="wrapper">
                <div className="main">
                    <h1>Change Your Password</h1>

                    <Form.Floating className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email address</label>
                    </Form.Floating>

                    {otpSent && (
                        <>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <label>OTP</label>
                            </Form.Floating>

                            <Form.Floating className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <label>New Password</label>
                            </Form.Floating>

                            <Form.Floating className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <label>Confirm Password</label>
                            </Form.Floating>

                            <div className="change-button">
                                <Button variant="primary" className='sub-button' onClick={verifyOtpAndChangePassword}>Submit</Button>
                                <Link className='can-btn' to='/login'>
                                    <Button className='can-btn' variant="outline-danger">Cancel</Button>
                                </Link>
                            </div>
                        </>
                    )}

                    {!otpSent && <Button variant="primary" className='primary-button' onClick={sendOtp}>Send OTP</Button>}
                </div>
            </div>
            <div className="footer">
                <FrontFooter />
            </div>
            <ToastContainer />
        </div>
    );
}

export default Change;
