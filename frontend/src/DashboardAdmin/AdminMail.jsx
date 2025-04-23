import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminMail.css';
import img from '../Image/BloodAd.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminMail = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const navigate = useNavigate();

    const provinces = [
        'Western Province', 'Central Province', 'Southern Province',
        'Northern Province', 'Eastern Province',
        'North Western Province', 'North Central Province',
        'Uva Province', 'Sabaragamuwa Province',
    ];

    const districtsByProvince = {
        'Western Province': ['Colombo District', 'Gampaha District', 'Kalutara District'],
        'Central Province': ['Kandy District', 'Matale District', 'NuwaraEliya District'],
        'Southern Province': ['Galle District', 'Matara District', 'Hambanthota District'],
        'Northern Province': ['Jaffna District', 'Kilinochchi District', 'Mannar District', 'Vavuniya District', 'Mullaitivu District'],
        'Eastern Province': ['Trincomalee District', 'Batticaloa District', 'Ampara District'],
        'North Western Province': ['Kurunegala District', 'Puttalam District'],
        'North Central Province': ['Anuradhapura District', 'Polonnaruwa District'],
        'Uva Province': ['Badulla District', 'Monaragala District'],
        'Sabaragamuwa Province': ['Ratnapura District', 'Kegalle District'],
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('authToken');

                if (!token) {
                    toast.error('User is not authenticated.');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/blood-requests/getall', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching blood requests:', error);
                toast.error('Failed to fetch blood requests. Please try again later.');
            }
        };

        fetchUsers();
    }, []);

    const handleSearchChange = (e) => setSearch(e.target.value);
    const handleBloodGroupChange = (e) => setSelectedBloodGroup(e.target.value);

    const handleProvinceChange = (e) => {
        const selectedProvince = e.target.value;
        setSelectedProvince(selectedProvince);
        setAvailableDistricts(districtsByProvince[selectedProvince] || []);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (e) => setSelectedDistrict(e.target.value);

    const filteredUsers = users.filter((user) => {
        const matchesSearch = !search ||
            new Date(user.needDate).toISOString().slice(0, 10) === search;
        const matchesBloodGroup = !selectedBloodGroup || user.bloodGroup === selectedBloodGroup;
        const matchesProvince = !selectedProvince || user.province === selectedProvince;
        const matchesDistrict = !selectedDistrict || user.district === selectedDistrict;
        return matchesSearch && matchesBloodGroup && matchesProvince && matchesDistrict;
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => 
        new Date(a.needDate) - new Date(b.needDate)
    );

    const handleViewDetails = (bloodId) => {
        navigate(`/blooddetail/${bloodId}`);
    };

    return (
        <div className="MainAdmin">
            <AdminNav />
            <AdminMainNav />
            <div className="mail-card">
                <div className="mail-main">
                    <div className="adminProfile-container">
                        <h1 className="adminProfile-title">Blood Requests</h1>
                        <div className="adminProfile-filters">
                            <input
                                type="date"
                                placeholder="Select Need Date"
                                value={search}
                                onChange={handleSearchChange}
                                className="adminProfile-input"
                                style={{ color: 'white' }}
                            />
                            <select
                                value={selectedBloodGroup}
                                onChange={handleBloodGroupChange}
                                className="adminProfile-select"
                            >
                                <option value="">--Select Blood Group--</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                            <select
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                className="adminProfile-select"
                            >
                                <option value="">--Select Province--</option>
                                {provinces.map((province) => (
                                    <option key={province} value={province}>{province}</option>
                                ))}
                            </select>
                            <select
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                className="adminProfile-select"
                                disabled={!availableDistricts.length}
                            >
                                <option value="">--Select District--</option>
                                {availableDistricts.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                        <div className="donor-list">
                            {sortedUsers.map((user, index) => (
                                <div key={index} className="donor-card">
                                    <img
                                        src={img}
                                        alt={user.gname}
                                        className="donor-image"
                                    />
                                    <h2 className="donor-name">Patient Name: {user.patientName}</h2>
                                    <p className="donor-blood">Blood Group: {user.bloodGroup}</p>
                                    <p className="donor-location">Province: {user.province}</p>
                                    <p className="donor-location">District: {user.district}</p>
                                    <p className="donor-location">Need Date: {new Date(user.needDate).toLocaleDateString()}</p>
                                    <button
                                        className="adminProfile-button"
                                        onClick={() => handleViewDetails(user._id)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMail;