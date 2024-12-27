import React from 'react';
import './popupWrong.css';
import { LuShieldClose } from "react-icons/lu";

const PopupWrong = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <LuShieldClose className='tick-wrong'/>
        <h2>Error!</h2>
        <p>Your request has not been submitted. Please try again!</p>
        <button type='button' onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default PopupWrong;
