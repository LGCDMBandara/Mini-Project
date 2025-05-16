import React, { useEffect, useState } from 'react';
import './hospitalDashboard.css';
import HospitalMainNav from '../Component/HospitalMainNav';
import HospitalNav from '../Component/HospitalNav';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const HospitalDashboard = () => {
    const [bloodBanks, setBloodBanks] = useState([]);
    const navigate = useNavigate();
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [availableDistricts, setAvailableDistricts] = useState([]);

    const provinces = [
        'Western Province', 'Central Province', 'Southern Province',
        'Northern Province', 'Eastern Province',
        'North Western Province', 'North Central Province',
        'Uva Province', 'Sabaragamuwa Province',
    ];

    const districtsByProvince = {
        "Western Province": ["Colombo District", "Gampaha District", "Kalutara District"],
        "Central Province": ["Kandy District", "Matale District", "NuwaraEliya District"],
        "Southern Province": ["Galle District", "Matara District", "Hambanthota District"],
        "Northern Province": ["Jaffna District", "Kilinochchi District", "Mannar District", "Vavuniya District", "Mullaitivu District"],
        "Eastern Province": ["Trincomalee District", "Batticaloa District", "Ampara District"],
        "North Western Province": ["Kurunegala District", "Puttalam District"],
        "North Central Province": ["Anuradhapura District", "Polonnaruwa District"],
        "Uva Province": ["Badulla District", "Monaragala District"],
        "Sabaragamuwa Province": ["Ratnapura District", "Kegalle District"]
    };

    const handleProvinceChange = (e) => {
        const selectedProvince = e.target.value;
        setSelectedProvince(selectedProvince);
        setAvailableDistricts(districtsByProvince[selectedProvince] || []);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (e) => setSelectedDistrict(e.target.value);

    useEffect(() => {
        const fetchBloodBanks = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/admins?role=BloodBank");
                const data = await res.json();
                if (res.ok) {
                    setBloodBanks(data);
                } else {
                    toast.error(data.message || "Failed to fetch blood banks");
                }
            } catch (error) {
                toast.error("Error fetching data: " + error.message);
            }
        };

        fetchBloodBanks();
    }, []);

    const filteredBloodBanks = bloodBanks.filter((bank) => {
        const matchesProvince = !selectedProvince || bank.province === selectedProvince;
        const matchesDistrict = !selectedDistrict || bank.district === selectedDistrict;
        return matchesProvince && matchesDistrict;
    });

    const handleView = (admin) => {
        if (!admin._id || admin._id === 'undefined') {
            toast.error('Cannot view details: Invalid admin ID');
            return;
        }
        navigate(`/viewblooddashboard/${admin._id}`);
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
                        <div className="adminProfile-filters">
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
                                {filteredBloodBanks.map((admin) => (
                                    <tr key={admin._id}>
                                        <td>{admin.username}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.province}</td>
                                        <td>{admin.district}</td>
                                        <td>
                                            <button
                                                className="adminView-button"
                                                onClick={() => handleView(admin)}
                                            >
                                                View More
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredBloodBanks.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="no-data">No Blood Bank found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalDashboard;