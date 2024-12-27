import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FrontFooter from "../Component/FrontFooter";
import PopupDone from '../Component/PopupDone';
import PopupWrong from '../Component/PopupWrong';
import PopupWarning from '../Component/PopupWarning';
import img from '../Image/Logo.png';
import './signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    nic: '',
    password: '',
    sex: '',
    province: '',
    district: '',
    email: '',
    dob: '',
    bloodType: '',
    weight: '',
    phoneNumber: '',
  });

  const [showPopupDone, setShowPopupDone] = useState(false);
  const [showPopupWrong, setShowPopupWrong] = useState(false);
  const [showPopupWarning, setShowPopupWarning] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), 
    });

    if (response.status === 201) {
      setShowPopupDone(true);
    } else if (response.status === 400) {
      const data = await response.json();
      setErrorMessage(data.error); 
      setShowPopupWarning(true); 
    } else {
      setShowPopupWrong(true);
    }
  } catch (error) {
    console.error('Error:', error); 
    setShowPopupWrong(true); 
  }
};

  const handlePopupClose = () => {
    setShowPopupDone(false);
    setShowPopupWrong(false);
    setShowPopupWarning(false); 
    setErrorMessage(''); 

    setFormData({
      name: '',
      address: '',
      nic: '',
      password: '',
      sex: '',
      province: '',
      district: '',
      email: '',
      dob: '',
      bloodType: '',
      weight: '',
      phoneNumber: '',
    });
  };

  return (
    <div className='signupMain'>
      <div className="image">
        <img src={img} alt="Logo" />
      </div>
      <div className="wrapper">
        <div className="signup-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-columns">
              <div className="one">
                <label>
                  Full Name
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder='Full Name' 
                    required 
                  />
                </label>
                <label>
                  Address
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    placeholder='Address' 
                    required 
                  />
                </label>
                <label>
                  NIC (include “V” using capital letter)
                  <input 
                    type="text" 
                    name="nic" 
                    value={formData.nic} 
                    onChange={handleChange} 
                    placeholder='NIC' 
                    required 
                  />
                </label>
                <label>
                  Telephone Number
                  <input 
                    type="tel" 
                    name="phoneNumber" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    placeholder='Telephone Number' 
                    required 
                  />
                </label>
              </div>

              <div className="two">
                <label>
                  Email
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder='Email' 
                    required 
                  />
                </label>
                <label>
                  Password
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder='Password' 
                    required 
                  />
                </label>
                <label>
                  Date of Birth
                  <input 
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={handleChange} 
                    required 
                  />
                </label>
                <label>
                  Weight (Kg)
                  <input 
                    type="number" 
                    name="weight" 
                    value={formData.weight} 
                    onChange={handleChange} 
                    placeholder='Weight' 
                    min={0} 
                    required 
                  />
                </label>
              </div>

              <div className="three">
                <label>
                  Province
                  <select 
                    name="province" 
                    value={formData.province} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select Province</option>
                    <option value="Central">Central Province</option>
                    <option value="Eastern">Eastern Province</option>
                    <option value="Northern">Northern Province</option>
                    <option value="Western">Western Province</option>
                    <option value="Southern">Southern Province</option>
                    <option value="North Western">North Western Province</option>
                    <option value="North Central">North Central Province</option>
                    <option value="Uva">Uva Province</option>
                    <option value="Sabaragamuwa">Sabaragamuwa Province</option>
                  </select>
                </label>
                <label>
                  District
                  <select 
                    name="district" 
                    value={formData.district} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select District</option>
                    <option value="Colombo">Colombo District</option>
                    <option value="Gampaha">Gampaha District</option>
                    <option value="Kaluthara">Kaluthara District</option>
                    <option value="Kandy">Kandy District</option>
                    <option value="Matale">Matale District</option>
                    <option value="NuwaraEliya">NuwaraEliya District</option>
                    <option value="Galle">Galle District</option>
                    <option value="Matara">Matara District</option>
                    <option value="Hambanthota">Hambanthota District</option>
                    <option value="Jaffna">Jaffna District</option>
                    <option value="Kilinochchi">Kilinochchi District</option>
                    <option value="Mannar">Mannar District</option>
                    <option value="Vavuniya">Vavuniya District</option>
                    <option value="Mullaitivu">Mullaitivu District</option>
                    <option value="Trincomalee">Trincomalee District</option>
                    <option value="Batticaloa">Batticaloa District</option>
                    <option value="Ampara">Ampara District</option>
                    <option value="Kurunegala">Kurunegala District</option>
                    <option value="Puttalam">Puttalam District</option>
                    <option value="Anuradhapura">Anuradhapura District</option>
                    <option value="Polonnaruwa">Polonnaruwa District</option>
                    <option value="Badulla">Badulla District</option>
                    <option value="Monaragala">Monaragala District</option>
                    <option value="Ratnapura">Ratnapura District</option>
                    <option value="Kegalle">Kegalle District</option>
                  </select>
                </label>
                <label>
                  Gender
                  <select 
                    name="sex" 
                    value={formData.sex} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>
                <label>
                  Blood Type
                  <select 
                    name="bloodType" 
                    value={formData.bloodType} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className='sub'>Submit</button>
              <Link className='can' to="/login">
                <button type="button" className='can'>Cancel</button>
              </Link>
            </div>
          </form>
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>

      {showPopupDone && <PopupDone onClose={handlePopupClose} />}
      {showPopupWrong && <PopupWrong onClose={handlePopupClose} />}
      {showPopupWarning && <PopupWarning message={errorMessage} onClose={handlePopupClose} />}

      <div className="footer">
        <FrontFooter />
      </div>
    </div>
  );
};

export default SignUp;
