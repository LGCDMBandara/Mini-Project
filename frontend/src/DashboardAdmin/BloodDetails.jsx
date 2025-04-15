import React, { useEffect, useState } from 'react';
import './bloodDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import logo from "../Image/Logo.png";
import { CgCloseO } from "react-icons/cg";
import img from "../Image/BloodAd.jpg";
import { toast } from 'react-toastify';

const BloodDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('authToken');

                if (!token) {
                    toast.error('User is not authenticated.');
                    return;
                }

                const response = await fetch(`http://localhost:5000/api/blood-requests/get-all/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleClose = () => {
        navigate('/adminMail');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
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
                            alt={user.patientName}
                            className="donor-blood-image"
                        />
                        <p className="donor-blood-group">
                            Blood Group : <span className="donor-blood-type">{user.bloodGroup || "Not Available"}</span>
                        </p>
                        <p className="donor-email">Email : {user.email || "Not Available"}</p>
                        <p className="donor-mobile">Mobile : {user.mobileNumber || "Not Available"}</p>
                    </div>
                    <div className="donor-blood-right">
                        <h3 className="donor-details-heading">Patient Details</h3>
                        <table className="donor-details-table">
                            <tbody>
                                <tr>
                                    <td className="details-label">Patient Name</td>
                                    <td className="details-value">{user.patientName || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Age</td>
                                    <td className="details-value">{user.patientAge || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Province</td>
                                    <td className="details-value">{user.province || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">District</td>
                                    <td className="details-value">{user.district || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">City</td>
                                    <td className="details-value">{user.city || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Address</td>
                                    <td className="details-value">{user.address || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Hospital Name</td>
                                    <td className="details-value">{user.hospitalName || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td className="details-label">Need Date</td>
                                    <td className="details-value">
                                        {user.needDate ? new Date(user.needDate).toISOString().split('T')[0] : "Not Available"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="details-label">Details</td>
                                    <td className="details-value">{user.details || "Not Available"}</td>
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
