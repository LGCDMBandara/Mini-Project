import React, { useState } from 'react';
import './userBlood.css';
import UserNav from '../Component/UserNav';
import UserMainNav from '../Component/UserMainNav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserBlood = () => {
    const [formData, setFormData] = useState({
        gname: '',
        purpose: '',
        bloodUnits: '',
        bloodGroup: '',
        needDate: '',
        hospitalName: '',
        patientName: '',
        patientAge: '',
        mobileNumber: '',
        email: '',
        city: '',
        address: '',
        province: '',
        district: '',
        details: '',
    });

    const [availableDistricts, setAvailableDistricts] = useState([]);

    const provinces = [
        "Western Province", "Central Province", "Southern Province", "Northern Province", "Eastern Province",
        "North Western Province", "North Central Province", "Uva Province", "Sabaragamuwa Province"
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

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'province') {
            setAvailableDistricts(districtsByProvince[value] || []);
            setFormData((prevState) => ({ ...prevState, province: value, district: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage(null);

        try {
            const response = await fetch('http://localhost:5000/api/blood-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            toast.success('Blood request submitted successfully!', {
                position: "top-right",
                autoClose: 2000,
                onClose: () => window.location.reload(),
            });
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
            console.error(error);

            toast.error(`Failed to submit request: ${error.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mainUser">
            <UserNav />
            <UserMainNav />
            <ToastContainer />
            <div className="request-card">
                <div className="request-main">
                    <div className="container-req">
                        <h2 className="head-req">Submit Your Request</h2>
                        <p>Please fill the following information to post your blood request.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Gaudient Name</label>
                                    <input
                                        type="text"
                                        name="gname"
                                        className="form-control"
                                        value={formData.gname}
                                        onChange={handleChange}
                                        placeholder="Gaudient Name"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Purpose</label>
                                    <input
                                        type="text"
                                        name="purpose"
                                        className="form-control"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        placeholder="Purpose"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Blood Units</label>
                                    <input
                                        type="number"
                                        name="bloodUnits"
                                        className="form-control"
                                        value={formData.bloodUnits}
                                        onChange={handleChange}
                                        placeholder="Blood Units"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Blood Group</label>
                                    <select
                                        name="bloodGroup"
                                        className="form-control"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">--Select Blood Group--</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>When Need Blood?</label>
                                    <input
                                        type="date"
                                        name="needDate"
                                        className="form-control"
                                        value={formData.needDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Hospital Name</label>
                                    <input
                                        type="text"
                                        name="hospitalName"
                                        className="form-control"
                                        value={formData.hospitalName}
                                        onChange={handleChange}
                                        placeholder="Hospital Name"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Patient Name</label>
                                    <input
                                        type="text"
                                        name="patientName"
                                        className="form-control"
                                        value={formData.patientName}
                                        onChange={handleChange}
                                        placeholder="Patient Name"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Patient Age</label>
                                    <input
                                        type="number"
                                        name="patientAge"
                                        className="form-control"
                                        value={formData.patientAge}
                                        onChange={handleChange}
                                        placeholder="Patient Age"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        className="form-control"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder="Mobile Number"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Province</label>
                                    <select
                                        name="province"
                                        className="form-control"
                                        value={formData.province}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">--Select Province--</option>
                                        {provinces.map((province) => (
                                            <option key={province} value={province}>{province}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>District</label>
                                    <select
                                        name="district"
                                        className="form-control"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                        disabled={!formData.province}
                                    >
                                        <option value="">--Select District--</option>
                                        {availableDistricts.map((district) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Address</label>
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Address"
                                        rows="1"
                                        required
                                    />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label>Details</label>
                                    <textarea
                                        name="details"
                                        className="form-control"
                                        value={formData.details}
                                        onChange={handleChange}
                                        placeholder="Additional details"
                                        rows="4"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </form>
                        {responseMessage && <div className="mt-3 alert alert-danger">{responseMessage}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBlood;
