import React from 'react';
import img1 from '../Image/Blood Bank Logo.png';
import img2 from '../Image/Emble of SL.png';
import "./frontFooter.css";

const FrontFooter = () => {
    return (
        <div className='footer'>
            <img src={img1} alt="Blood Bank Logo" />
            <h1>Give A Gift of Life and Be Hero</h1>
            <img src={img2} alt="Emblem of SL" />
        </div>
    );
}

export default FrontFooter;
