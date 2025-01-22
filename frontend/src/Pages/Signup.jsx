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
        password: '',
        email: '',
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
      password: '',
      email: '',
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
              <div className="one">
                <label>
                  User Name
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder='User Name' 
                    required 
                  />
                </label>
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
