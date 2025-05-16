import React, { useEffect, useState } from 'react';
import './bloodDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../Image/Logo.png';
import { CgCloseO } from 'react-icons/cg';
import img from '../Image/BloodAd.jpg';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BloodDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequest = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    toast.error('User is not authenticated. Please log in.');
                    navigate('/login');
                    return;
                }

                // Validate token
                try {
                    const decoded = jwtDecode(token);
                    if (!decoded.id || decoded.role.toLowerCase() !== 'admin') {
                        toast.error('Unauthorized access. Admin role required.');
                        localStorage.removeItem('token');
                        navigate('/login');
                        return;
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    toast.error('Invalid token. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`http://localhost:5000/api/blood-requests/get/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Handle response
                const requestData = response.data.request || response.data;
                if (requestData && typeof requestData === 'object') {
                    setRequest(requestData);
                } else {
                    toast.error('Blood request not found.');
                    setRequest(null);
                }
            } catch (error) {
                console.error('Error fetching blood request details:', error);
                if (error.response?.status === 400) {
                    toast.error('Invalid request ID.');
                    setRequest(null);
                } else if (error.response?.status === 401) {
                    toast.error('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/login');
                } else if (error.response?.status === 403) {
                    toast.error('Unauthorized access. Admin role required.');
                    localStorage.removeItem('token');
                    navigate('/login');
                } else if (error.response?.status === 404) {
                    toast.error('Blood request not found.');
                    setRequest(null);
                } else {
                    toast.error('Failed to fetch blood request details. Please try again later.');
                    setRequest(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRequest();
    }, [id, navigate]);

    const formatDate = (date) => {
        if (!date || isNaN(new Date(date).getTime())) return 'Not Available';
        return new Date(date).toLocaleDateString();
    };

    const handleClose = () => {
        navigate('/adminmail');
    };

    if (loading) {
        return <div className="loading-message">Loading blood request details...</div>;
    }

    if (!request) {
        return (
            <div className="error-container">
                <p className="error-message">Blood request not found.</p>
                <button className="adminProfile-button" onClick={() => navigate('/adminmail')}>
                    Back to Blood Requests
                </button>
            </div>
        );
    }

    return (
        <div>
            <ToastContainer />
            <div className="donor-profile-header">
                <img src={logo} alt="Logo" className="donor-profile-logo" />
                <button onClick={handleClose} className="profileClose-button">
                    <CgCloseO />
                </button>
            </div>

            <div className="donor-blood-container">
                <div className="donor-blood-card">
                    <div className="donor-blood-left">
                        <img
                            src={img}
                            alt={request.patientName || 'Blood Request'}
                            className="donor-blood-image"
                        />
                        <p className="donor-blood-group">
                            Blood Group: <span className="donor-blood-type">{request.bloodGroup || 'Not Available'}</span>
                        </p>
                        <p className="donor-email">Email: {request.email || 'Not Available'}</p>
                        <p className="donor-mobile">Mobile: {request.mobileNumber || 'Not Available'}</p>
                    </div>
                    <div className="donor-blood-right">
                        <h3 className="donor-details-heading">Patient Details</h3>
                        <table className="donor-details-table">
                            <tbody>
                                <tr>
                                    <td className="details-label">Guardian Name</td>
                                    <td className="details-value">{request.gname || 'Not Available'}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Purpose</td>
                                    <td className="details-value">{request.purpose || 'Not Available'}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Blood Units</td>
                                    <td className="details-value">{request.bloodUnits || 'Not Available'}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Patient Name</td>
                                    <td className="details-value">{request.patientName || 'Not Available'}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Age</td>
                                    <td className="details-value">{request.patientAge || 'Not Available'}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Province</td>
                                    <td className="details-value">{request.province || 'Not Available'}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">District</td>
                                    <td className="details-value">{request.district || 'Not Available'}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">City</td>
                                    <td className="details-value">{request.city || 'Not Available'}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Address</td>
                                    <td className="details-value">{request.address || 'Not Available'}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Hospital Name</td>
                                    <td className="details-value">{request.hospitalName || 'Not Available'}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Need Date</td>
                                    <td className="details-value">{formatDate(request.needDate)}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Details</td>
                                    <td className="details-value">{request.details || 'Not Available'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BloodDetails;