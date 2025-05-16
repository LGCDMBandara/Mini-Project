import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminMail.css';
import img from '../Image/BloodAd.jpg';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const AdminMail = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const provinces = [
        'Western Province',
        'Central Province',
        'Southern Province',
        'Northern Province',
        'Eastern Province',
        'North Western Province', // Corrected entry
        'North Central Province',
        'Uva Province',
        'Sabaragamuwa Province',
    ];

    const districtsByProvince = {
        'Western Province': ['Colombo District', 'Gampaha District', 'Kalutara District'],
        'Central Province': ['Kandy District', 'Matale District', 'NuwaraEliya District'],
        'Southern Province': ['Galle District', 'Matara District', 'Hambantota District'], // Fixed typo: Hambanthota -> Hambantota
        'Northern Province': ['Jaffna District', 'Kilinochchi District', 'Mannar District', 'Vavuniya District', 'Mullaitivu District'],
        'Eastern Province': ['Trincomalee District', 'Batticaloa District', 'Ampara District'],
        'North Western Province': ['Kurunegala District', 'Puttalam District'],
        'North Central Province': ['Anuradhapura District', 'Polonnaruwa District'],
        'Uva Province': ['Badulla District', 'Monaragala District'],
        'Sabaragamuwa Province': ['Ratnapura District', 'Kegalle District'],
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
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

                const response = await axios.get('http://localhost:5000/api/blood-requests/getall', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Handle different API response structures
                const requests = response.data.requests || response.data || [];
                if (!Array.isArray(requests)) {
                    console.error('Unexpected API response format:', response.data);
                    toast.error('Invalid data format from server.');
                    setUsers([]);
                } else {
                    setUsers(requests);
                }
            } catch (error) {
                console.error('Error fetching blood requests:', error);
                if (error.response?.status === 401) {
                    toast.error('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    toast.error('Failed to fetch blood requests. Please try again later.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

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
        const needDate = user.needDate ? new Date(user.needDate).toISOString().slice(0, 10) : '';
        const matchesSearch = !search || needDate.includes(search);
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
            <ToastContainer />
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
                            {isLoading ? (
                                <p>Loading blood requests...</p>
                            ) : sortedUsers.length === 0 ? (
                                <p>No blood requests found matching the criteria.</p>
                            ) : (
                                sortedUsers.map((user, index) => (
                                    <div key={user._id || index} className="donor-card">
                                        <img
                                            src={img}
                                            alt={user.patientName || 'Blood Request'}
                                            className="donor-image"
                                        />
                                        <h2 className="donor-name">
                                            Patient Name: {user.patientName || 'Not Provided'}
                                        </h2>
                                        <p className="donor-blood">
                                            Blood Group: {user.bloodGroup || 'Not Available'}
                                        </p>
                                        <p className="donor-location">
                                            Province: {user.province || 'Not Available'}
                                        </p>
                                        <p className="donor-location">
                                            District: {user.district || 'Not Available'}
                                        </p>
                                        <p className="donor-location">
                                            Need Date: {user.needDate 
                                                ? new Date(user.needDate).toLocaleDateString()
                                                : 'Not Available'}
                                        </p>
                                        <button
                                            className="adminProfile-button"
                                            onClick={() => handleViewDetails(user._id)}
                                        >
                                            View Details
                                        </button>
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

export default AdminMail;