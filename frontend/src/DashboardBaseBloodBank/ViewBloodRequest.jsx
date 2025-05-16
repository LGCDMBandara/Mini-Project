// src/pages/ViewBloodRequest.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BaseNav from '../Component/BaseNav';
import BaseMainNav from '../Component/BaseMainNav';
import './baseDashboard.css';
import img from '../Image/BloodAd.jpg';

const ViewBloodRequest = () => {
    const [bloodRequests, setBloodRequests] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchBloodRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/hospital-requests/blood-bank-requests', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setBloodRequests(response.data.data);
            } else {
                toast.error('No blood requests found');
            }
        } catch (error) {
            console.error('Error fetching blood requests:', error);
            toast.error('Error fetching blood requests');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredRequests = bloodRequests.filter((request) => {
        if (!search) return true;
        const needDate = new Date(request.needDate).toISOString().split('T')[0];
        return needDate === search;
    });

    const sendEmail = async (bloodRequestId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/hospital-requests/send-email',
                { bloodRequestId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.success) {
                toast.success('Email sent successfully');
                setBloodRequests((prev) =>
                    prev.map((req) =>
                        req._id === bloodRequestId ? { ...req, status: 'Approved' } : req
                    )
                );
            } else {
                toast.error('Error sending email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Error sending email');
        }
    };

    useEffect(() => {
        fetchBloodRequests();
    }, []);

    return (
        <div className="MainBase">
            <BaseNav />
            <BaseMainNav />
            <div className="mail-card">
                <div className="mail-main">
                    <div className="adminProfile-container">
                        <h1 className="adminProfile-title">Blood Bank Requests</h1>
                        <div className="adminProfile-filters">
                            <input
                                type="date"
                                placeholder="Select Need Date"
                                value={search}
                                onChange={handleSearchChange}
                                className="adminProfile-input"
                                style={{ color: 'white' }}
                            />
                        </div>
                        <div className="donor-list">
                            {loading ? (
                                <p>Loading...</p>
                            ) : filteredRequests.length === 0 ? (
                                <p>No blood requests found</p>
                            ) : (
                                filteredRequests.map((request) => (
                                    <div key={request._id} className="donor-card">
                                        <img
                                            src={img}
                                            alt={request.patientName}
                                            className="donor-image"
                                        />
                                        <h2 className="donor-name">Patient Name : {request.patientName}</h2>
                                        <p className="donor-location">Hospital Name : {request.hospital}</p>
                                        <p className="donor-blood">Blood Group : {request.bloodGroup}</p>
                                        <p className="donor-location">Quantity : {request.bloodUnits}</p>
                                        <p className="donor-location">
                                            Need Date: {new Date(request.needDate).toLocaleDateString()}
                                        </p>
                                        <p className="donor-location">Status: {request.status}</p>
                                        {request.status === 'Pending' && (
                                            <button
                                                className="adminProfile-button"
                                                onClick={() => sendEmail(request._id)}
                                            >
                                                Confirm Request
                                            </button>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBloodRequest;