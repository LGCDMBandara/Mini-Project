import React, { useState } from 'react';
import './userBlood.css';
import UserNav from '../Component/UserNav';
import UserMainNav from '../Component/UserMainNav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '../Component/Alert';
import { useTranslation } from 'react-i18next';

const UserBlood = () => {
    const { t } = useTranslation();
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
        "Western Province (බස්නාහිර පළාත)",
        "Central Province (මධ්‍යම පළාත)",
        "Southern Province (දකුණු පළාත)",
        "Northern Province (උතුරු පළාත)",
        "Eastern Province (නැගෙනහිර පළාත)",
        "North Western Province (වයඹ පළාත)",
        "North Central Province (උතුරු මැද පළාත)",
        "Uva Province (ඌව පළාත)",
        "Sabaragamuwa Province (සබරගමුව පළාත)"
    ];

    const districtsByProvince = {
        "Western Province (බස්නාහිර පළාත)": [
            "Colombo District (කොළඹ දිස්ත්‍රික්කය)",
            "Gampaha District (ගම්පහ දිස්ත්‍රික්කය)",
            "Kalutara District (කළුතර දිස්ත්‍රික්කය)"
        ],
        "Central Province (මධ්‍යම පළාත)": [
            "Kandy District (මහනුවර දිස්ත්‍රික්කය)",
            "Matale District (මාතලේ දිස්ත්‍රික්කය)",
            "Nuwara Eliya District (නුවරඑළිය දිස්ත්‍රික්කය)"
        ],
        "Southern Province (දකුණු පළාත)": [
            "Galle District (ගාල්ල දිස්ත්‍රික්කය)",
            "Matara District (මාතර දිස්ත්‍රික්කය)",
            "Hambantota District (හම්බන්තොට දිස්ත්‍රික්කය)"
        ],
        "Northern Province (උතුරු පළාත)": [
            "Jaffna District (යාපනය දිස්ත්‍රික්කය)",
            "Kilinochchi District (කිලිනොච්චි දිස්ත්‍රික්කය)",
            "Mannar District (මන්නාරම දිස්ත්‍රික්කය)",
            "Vavuniya District (වවුනියා දිස්ත්‍රික්කය)",
            "Mullaitivu District (මුලතිවු දිස්ත්‍රික්කය)"
        ],
        "Eastern Province (නැගෙනහිර පළාත)": [
            "Trincomalee District (ත්‍රිකුණාමලය දිස්ත්‍රික්කය)",
            "Batticaloa District (මඩකලපුව දිස්ත්‍රික්කය)",
            "Ampara District (අම්පාර දිස්ත්‍රික්කය)"
        ],
        "North Western Province (වයඹ පළාත)": [
            "Kurunegala District (කුරුණෑගල දිස්ත්‍රික්කය)",
            "Puttalam District (පුත්තලම දිස්ත්‍රික්කය)"
        ],
        "North Central Province (උතුරු මැද පළාත)": [
            "Anuradhapura District (අනුරාධපුර දිස්ත්‍රික්කය)",
            "Polonnaruwa District (පොළොන්නරුව දිස්ත්‍රික්කය)"
        ],
        "Uva Province (ඌව පළාත)": [
            "Badulla District (බදුල්ල දිස්ත්‍රික්කය)",
            "Monaragala District (මොනරාගල දිස්ත්‍රික්කය)"
        ],
        "Sabaragamuwa Province (සබරගමුව පළාත)": [
            "Ratnapura District (රත්නපුර දිස්ත්‍රික්කය)",
            "Kegalle District (කෑගල්ල දිස්ත්‍රික්කය)"
        ]
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
        // Validate province and district
        if (!formData.province || !formData.district) {
            toast.error('Please select a province and district.', {
                position: "top-right",
                autoClose: 3000,
            });
            setLoading(false);
            return;
        }

        const cleanedFormData = {
            ...formData,
            province: formData.province.split(' (')[0],
            district: formData.district.split(' (')[0],
        };

        // Retrieve and debug token
        const token = localStorage.getItem('token');
        console.log('Retrieved token in UserBlood:', token);
        if (!token) {
            toast.error('Please log in to submit the request.', {
                position: "top-right",
                autoClose: 3000,
            });
            setLoading(false);
            return;
        }

        console.log('Sending request with Authorization:', `Bearer ${token}`);
        const response = await fetch('http://localhost:5000/api/blood-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(cleanedFormData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('Server error response:', errorData);
            if (response.status === 401) {
                toast.error(errorData.message || 'Session expired. Please log in again.', {
                    position: "top-right",
                    autoClose: 3000,
                });
                localStorage.removeItem('authToken'); 
                window.location.href = '/login'; 
            }
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
        console.error('Error details:', error);

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
            <Alert />
            <UserNav />
            <UserMainNav />
            <ToastContainer />
            <div className="request-card">
                <div className="request-main">
                    <div className="container-req">
                        <h2 className="head-req">{t('request')}</h2>
                        <b style={{ color: "rgba(75, 192, 192, 1)", fontSize: "20px" }}>Fill in the bllod request details using English only (ඉංග්‍රීසි පමණක් භාවිතා කරමින් රුධිර ලබාගැනීමේ විස්තර පුරවන්න)</b>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Gaudient Name (භාරකරුගේ නම)</label>
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
                                    <label>Purpose (අරමුණ)</label>
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
                                    <label>Blood Units (රුධිර ඒකක ප්‍රමාණය)</label>
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
                                    <label>Blood Group (රුධිර වර්ගය)</label>
                                    <select
                                        name="bloodGroup"
                                        className="form-control"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">----Select Blood Group (රුධිර වර්ගය තෝරන්න)----</option>
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
                                    <label>When Need Blood? (අවශ්‍ය දිනය)</label>
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
                                    <label>Hospital Name (රෝහලේ නම)</label>
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
                                    <label>Patient Name (ලෙඩාගේ නම)</label>
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
                                    <label>Patient Age (ලෙඩාගේ වයස)</label>
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
                                    <label>Mobile Number (දුරකථන අංකය)</label>
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
                                    <label>Email (විද්‍යුත් ලිපිනය)</label>
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
                                    <label>Province (පළාත)</label>
                                    <select
                                        name="province"
                                        className="form-control"
                                        value={formData.province}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">--Select Province (පළාත තෝරන්න)--</option>
                                        {provinces.map((province) => (
                                            <option key={province} value={province}>{province}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>District (දිස්ත්‍රික්කය)</label>
                                    <select
                                        name="district"
                                        className="form-control"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                        disabled={!formData.province}
                                    >
                                        <option value="">--Select District (දිස්ත්‍රික්කය තෝරන්න)--</option>
                                        {availableDistricts.map((district) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>City (නගරය)</label>
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
                                    <label>Address (ලිපිනය)</label>
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
                                    <label>Description (විස්තරය)</label>
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
