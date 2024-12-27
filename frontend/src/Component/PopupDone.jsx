import React from 'react';
import './popupDone.css';
import { SiTicktick } from "react-icons/si";

const PopupDone = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <SiTicktick className='tick-done'/>
        <h2>Thank You!</h2>
        <p>Your request has been successfully submitted. Thanks!</p>
        <button type='button' onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default PopupDone;
