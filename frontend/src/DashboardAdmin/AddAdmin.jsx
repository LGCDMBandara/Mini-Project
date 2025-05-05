import React, { useState } from 'react';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import AdminAddNav from '../Component/AdminAddNav';
import './addAdmin.css';
import { toast, ToastContainer } from 'react-toastify';

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

const AddAdmin = () => {
    const [role, setRole] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        province: '',
        district: '',
        phone: '',
    });

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setFormData({
            username: '',
            email: '',
            password: '',
            province: '',
            district: '',
            phone: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "province" ? { district: "" } : {})
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const res = await fetch("http://localhost:5000/api/admins/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                role,
                ...formData
            })
        });
    
        const data = await res.json();
        if (res.ok) {
            toast.success(`${formData.username} added successfully!`);
            setRole('');
            setFormData({
                username: '',
                email: '',
                password: '',
                province: '',
                district: '',
                phone: '',
            });
        } else {
            toast.error(data.message || "Something went wrong.");
        }
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
                        <div className="form-section">
                            <h1 className="adminProfile-title">Add Admin</h1>

                            <label>Select Role</label>
                            <select value={role} onChange={handleRoleChange}>
                                <option value="">-- Select Role --</option>
                                <option value="BloodBank">Blood Bank</option>
                                <option value="Hospital">Hospital</option>
                            </select>

                            {role && (
                                <form onSubmit={handleSubmit}>
                                    <label>Username</label>
                                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />

                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />

                                    <label>Password</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />

                                    {role === "BloodBank" && (
                                        <>
                                            <label>Province</label>
                                            <select name="province" value={formData.province} onChange={handleInputChange} required>
                                                <option value="">-- Select Province --</option>
                                                {provinces.map((prov) => (
                                                    <option key={prov} value={prov}>{prov}</option>
                                                ))}
                                            </select>

                                            <label>District</label>
                                            <select name="district" value={formData.district} onChange={handleInputChange} required>
                                                <option value="">-- Select District --</option>
                                                {(districtsByProvince[formData.province] || []).map((dist) => (
                                                    <option key={dist} value={dist}>{dist}</option>
                                                ))}
                                            </select>

                                            <label>Phone Number</label>
                                            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                        </>
                                    )}

                                    <button type="submit">Add Admin</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;
