import React from 'react';
import './adminLogout.css';
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'; 

const logoutDone = () => {
  const navigate = useNavigate(); 

  const handleYesClick = () => {
    navigate('/');
  };

  const handleNoClick = () => {
    navigate('/adminDashboard');
  };

  return (
    <div className="logout-overlay">
      <div className="logout-content">
        <FiLogOut className='tick-done'/>
        <h2>System Logout</h2>
        <p>Any unsaved changes will be lost. Please confirm your decision before proceeding.</p>
        <p>Are you absolutely sure you want to log out? </p>
        <div className="logout-button">
            <button type='button' onClick={handleYesClick}>Yes</button>
            <button type='button' onClick={handleNoClick}>No</button>
        </div>
      </div>
    </div>
  );
};

export default logoutDone;

