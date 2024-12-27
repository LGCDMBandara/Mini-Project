import React from 'react';
import './popupWarning.css';
import { IoWarningOutline } from "react-icons/io5";;

const PopupWarning = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <IoWarningOutline className='tick-warning'/>
        <h2>Warning!</h2>
        <p>Email Adreess is already registered. Use a different email to create an account.</p>
        <button type='button' onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default PopupWarning;
