import React, { useEffect, useState } from 'react';
import './userprofile.css';
import UserNav from '../Component/UserNav';
import UserMainNav from '../Component/UserMainNav';
import { FaRegEdit } from "react-icons/fa";
import img from "../Image/Profile.jpg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UserProfile = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        fname: "",
        lname: "",
        tnumber: "",
        nic: "",
        province: "",
        district: "",
        city: "",
        pcode: "",
        address: "",
        gender: "",
        occupation: "",
        dob: "",
        weight: "",
        bloodgroup: "",
        donate: "",
        lastDonationDate: "",
        healthInfo: [],
        diseaseInfo: [],
        medications: [],
        surgeryHistory: [],
        profilePicture: "",
    });


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    toast.error('User is not authenticated.');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/users/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const userData = response.data.user;

                    setAvailableDistricts(districtsByProvince[userData.province] || []);

                    setFormData((prevState) => ({
                        ...prevState,
                        name: userData.name || "",
                        email: userData.email || "",
                        fname: userData.fname || "",
                        lname: userData.lname || "",
                        tnumber: userData.tnumber || "",
                        province: userData.province || "",
                        district: userData.district || "",
                        city: userData.city || "",
                        pcode: userData.pcode || "",
                        address: userData.address || "",
                        gender: userData.gender || "",
                        occupation: userData.occupation || "",
                        nic: userData.nic || "",
                        dob: userData.dob ? userData.dob.split('T')[0] : "",
                        weight: userData.weight || "",
                        bloodgroup: userData.bloodgroup || "",
                        donate: userData.donate || "",
                        lastDonationDate: userData.lastDonationDate ? userData.lastDonationDate.split('T')[0] : "",
                        healthInfo: userData.healthInfo || [],
                        diseaseInfo: userData.diseaseInfo || [],
                        medications: userData.medications || [],
                        surgeryHistory: userData.surgeryHistory || [],
                        profilePicture: userData.profilePicture
                            ? `http://localhost:5000/${userData.profilePicture}`
                            : img,

                    }));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to load user data.');
            }
        };

        fetchUserData();
    }, []);

    const [selectedImage, setSelectedImage] = useState(null);
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const healthOptions = [
        "Tattooing", "Ear piercing", "Dental extraction", "No"
    ];

    const diseaseOptions = [
        "Heart Disease", "Cancer/Malignant Disease", "Diabetes", "Hepatitis B/C",
        "Sexually Transmitted Diseases", "Typhoid (last one year)", "Lung Disease",
        "Tuberculosis", "Allergic Disease", "Kidney Disease", "Epilepsy",
        "Abnormal Bleeding Tendency", "Jaundice (last one year)", "Malaria (six months)", "Fainting spells", "No Disease"
    ];

    const medicationOptions = [
        "Antibiotics", "Steroids", "Aspirin", "Vaccinations", "Alcohol", "Dog bite Rabies vaccine (1 year)", "Not Taken"
    ];

    const surgeryOptions = [
        "Major", "Minor", "Blood Transfusion", "No"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "province") {
            setAvailableDistricts(districtsByProvince[value] || []);
            setFormData((prevState) => ({ ...prevState, province: value, district: "" }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleCheckboxChange = (e, field) => {
        const { value, checked } = e.target;
        setFormData((prevState) => {
            const updatedField = checked
                ? [...prevState[field], value]
                : prevState[field].filter((item) => item !== value);
            return { ...prevState, [field]: updatedField };
        });
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            const response = await axios.post('http://localhost:5000/api/users/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Profile picture uploaded successfully!');
            console.log('File uploaded:', response.data.filePath);
        } catch (error) {
            console.error('Error uploading file:', error.response || error.message);
            toast.error('Failed to upload profile picture');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('authToken');
        try {
            const formDataToSend = new FormData();

            // Append form fields
            Object.keys(formData).forEach((key) => {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach((item) => formDataToSend.append(key, item));
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Append the selected image
            const fileInput = document.getElementById('file-input');
            if (fileInput && fileInput.files[0]) {
                formDataToSend.append('profilePicture', fileInput.files[0]);
            }

            // Debugging log
            formDataToSend.forEach((value, key) => {
                console.log(`${key}:`, value);
            });

            const response = await fetch('http://localhost:5000/api/users/update-profile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            toast.success('User profile updated successfully!', { position: 'top-right' });
        } catch (error) {
            console.error(error);
            toast.error(`Failed to update profile: ${error.message}`, { position: 'top-right' });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='mainUser'>
            <UserNav />
            <UserMainNav />
            <ToastContainer />

            <div className='profile-card'>
                <div className='profile-main'>
                    <div className="profile-container">
                        <div className="profile">
                            <form onSubmit={handleSubmit}>
                                <div className="profile-picture-container">
                                    <div className="profile-picture">
                                        {selectedImage ? (
                                            <img src={selectedImage} alt="Profile" />
                                        ) : (
                                            <img src={formData.profilePicture} alt="Profile" />
                                        )}
                                        <label htmlFor="file-input" className="upload-icon">
                                            <i className="fa fa-upload"><FaRegEdit /></i>
                                        </label>
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="image-upload-input"
                                            name='profilePicture'
                                        />
                                    </div>
                                </div>
                                <div className="profile-form-card">
                                    <div className="profile-form-container">
                                        <div className="profile-form-group">
                                            <label>Username</label>
                                            <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Email</label>
                                            <input type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>First Name</label>
                                            <input type="text" name="fname" className="input-field" value={formData.fname} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Last Name</label>
                                            <input type="text" name="lname" className="input-field" value={formData.lname} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Telephone Number</label>
                                            <input type="text" name="tnumber" className="input-field" value={formData.tnumber} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>NIC</label>
                                            <input type="text" name="nic" className="input-field" value={formData.nic} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Province</label>
                                            <select name="province" className="input-field" value={formData.province} onChange={handleChange}>
                                                <option value="">--Select Province--</option>
                                                {provinces.map((province) => (
                                                    <option key={province} value={province}>{province}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="profile-form-group">
                                            <label>District</label>
                                            <select name="district" className="input-field" value={formData.district} onChange={handleChange}>
                                                <option value="">--Select District--</option>
                                                {availableDistricts.map((district) => (
                                                    <option key={district} value={district}>{district}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="profile-form-group">
                                            <label>City</label>
                                            <input type="text" name="city" className="input-field" value={formData.city} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Postal Code</label>
                                            <input type="text" name="pcode" className="input-field" value={formData.pcode} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Address</label>
                                            <input type="text" name="address" className="input-field" value={formData.address} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Gender</label>
                                            <select name="gender" className="input-field" value={formData.gender} onChange={handleChange}>
                                                <option value="">--Select Gender--</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Civil Status</label>
                                            <select name="occupation" className="input-field" value={formData.occupation} onChange={handleChange}>
                                                <option value="">--Select Status--</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                            </select>
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Date of Birth</label>
                                            <input type="date" name="dob" className="input-field" value={formData.dob} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Weight (Kg)</label>
                                            <input type="number" name="weight" className="input-field" value={formData.weight} onChange={handleChange} />
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Blood Group</label>
                                            <select name="bloodgroup" className="input-field" value={formData.bloodgroup} onChange={handleChange}>
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
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Have You Donated Blood Previously?</label>
                                            <select name="donate" className="input-field" value={formData.donate} onChange={handleChange}>
                                                <option value="">--Select One--</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        <div className="profile-form-group">
                                            <label>Last Time Donated Blood</label>
                                            <input type="date" name="lastDonationDate" className="input-field" value={formData.lastDonationDate} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                
                                <hr></hr>
                                {/* Health Info */}
                                <div className="form-section">
                                    <h3 className="section-title">In the last six months have you had any of the following?</h3>
                                    <div className="checkbox-group">
                                        {healthOptions.map((option) => (
                                            <label className="checkbox-label" key={option}>
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    checked={formData.healthInfo.includes(option)}
                                                    onChange={(e) => handleCheckboxChange(e, 'healthInfo')}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Diseases */}
                                <div className="form-section">
                                    <h3 className="section-title">Do you suffer from or have suffered from any of the following diseases?</h3>
                                    <div className="checkbox-grid">
                                        {diseaseOptions.map((option) => (
                                            <label className="checkbox-label" key={option}>
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    checked={formData.healthInfo.includes(option)}
                                                    onChange={(e) => handleCheckboxChange(e, 'healthInfo')}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Medications */}
                                <div className="form-section">
                                    <h3 className="section-title">Are you taking or have you taken any of these in the past 72 hours?</h3>
                                    <div className="checkbox-group">
                                        {medicationOptions.map((option) => (
                                            <label className="checkbox-label" key={option}>
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    checked={formData.medications.includes(option)}
                                                    onChange={(e) => handleCheckboxChange(e, 'medications')}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Surgery History */}
                                <div className="form-section">
                                    <h3 className="section-title">Is there any history of surgery or blood transfusion in the past six months?</h3>
                                    <div className="checkbox-group">
                                        {surgeryOptions.map((option) => (
                                            <label className="checkbox-label" key={option}>
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    checked={formData.surgeryHistory.includes(option)}
                                                    onChange={(e) => handleCheckboxChange(e, 'surgeryHistory')}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="form-submit-section">
                                    <button type="submit" className="form-submit-button" disabled={loading}>
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
