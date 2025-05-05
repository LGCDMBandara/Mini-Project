import React, { useEffect, useState } from 'react';
import './hospitalDashboard.css';
import HospitalMainNav from '../Component/HospitalMainNav';
import HospitalNav from '../Component/HospitalNav';
import { toast, ToastContainer } from 'react-toastify';

const HospitalDashboard = () => {
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
        <div className='MainHospital'>
            <ToastContainer />
            <HospitalNav />
            <HospitalMainNav />

            <div className='hospital-card'>
                <div className='hospital-main'>
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
                                        <td colSpan="5" className="no-data">No Blood Bank is found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HospitalDashboard;
