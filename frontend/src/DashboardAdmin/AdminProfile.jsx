import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import axios from 'axios';
import './adminProfile.css';
import img from "../Image/Profile.jpg";
import AdminAddNav from '../Component/AdminAddNav';


const Profile = () => {
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          toast.error('User is not authenticated.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/users/get-all-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.users) {
          setUsers(response.data.users);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users. Please try again later.');
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
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesBloodGroup = !selectedBloodGroup || user.bloodgroup === selectedBloodGroup;
    const matchesProvince = !selectedProvince || user.province === selectedProvince;
    const matchesDistrict = !selectedDistrict || user.district === selectedDistrict;
    return matchesSearch && matchesBloodGroup && matchesProvince && matchesDistrict;
  });

  const handleViewDetails = (userId) => {
    navigate(`/profiledetail/${userId}`);
  };

  return (
    <div className='MainAdmin'>
      <AdminNav />
      <AdminMainNav />

      <div className='adminProfile-card'>
        <div className='adminProfile-main'>
          <div className="adminProfile-container">
            <AdminAddNav />
            <h1 className="adminProfile-title">User Blood Directory</h1>
            <div className="adminProfile-filters">
              <input
                type="text"
                placeholder="Enter Donor Name"
                value={search}
                onChange={handleSearchChange}
                className="adminProfile-input"
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
              {filteredUsers.map((user, index) => (
                <div key={index} className="donor-card">
                  <img
                    src={user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : img}
                    alt={user.fname && user.lname ? `${user.fname} ${user.lname}` : "User"}
                    className="donor-image"
                  />
                  <h2 className="donor-name">Name : {user.fname && user.lname ? `${user.fname} ${user.lname}` : `${user.name}`}</h2>
                  <p className="donor-blood">Blood Group : {user.bloodgroup || "Not User Complete"}</p>
                  <p className="donor-location">Province : {user.province || "Not User Complete"}</p>
                  <p className="donor-location">District : {user.district || "Not User Complete"}</p>
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

export default Profile;
