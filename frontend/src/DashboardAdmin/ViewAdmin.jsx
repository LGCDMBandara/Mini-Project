import React, { useEffect, useState } from 'react';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import AdminAddNav from '../Component/AdminAddNav';
import './viewAdmin.css';
import { toast, ToastContainer } from 'react-toastify';

const ViewAdmin = () => {
    const [bloodBanks, setBloodBanks] = useState([]);

    useEffect(() => {
        const fetchBloodBanks = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/admins?role=BloodBank");
                const data = await res.json();
                if (res.ok) {
                    setBloodBanks(data);
                } else {
                    console.error(data.message || "Failed to fetch admins");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBloodBanks();
    }, []);

    const handleView = (admin) => {
        toast.success(`Viewing details for ${admin.username}`);
    };

    return (
        <div className='MainAdmin'>
            <ToastContainer />
            <AdminNav />
            <AdminMainNav />

            <div className='adminProfile-card'>
                <div className='adminProfile-main'>
                    <div className="adminProfile-container">
                        <AdminAddNav />

                        <div className="table-section">
                            <h1 className="adminProfile-title">Blood Bank Directory</h1>
                            <table className='viewBloodBank'>
                                <thead className='viewThead'>
                                    <tr>
                                        <th>Blood Bank Name</th>
                                        <th>Email</th>
                                        <th>Province</th>
                                        <th>District</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bloodBanks.map((admin, index) => (
                                        <tr key={index}>
                                            <td>{admin.username}</td>
                                            <td>{admin.email}</td>
                                            <td>{admin.province}</td>
                                            <td>{admin.district}</td>
                                            <td>
                                                <button className="adminView-button" onClick={() => handleView(admin)}>View More</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {bloodBanks.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="no-data">No Blood Bank admins found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAdmin;
