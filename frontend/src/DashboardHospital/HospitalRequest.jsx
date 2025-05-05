import React from 'react';
import './hospitalRequest.css';
import HospitalMainNav from '../Component/HospitalMainNav';
import HospitalNav from '../Component/HospitalNav';

const HospitalRequest = () => {
    return (
        <div className='MainHospitalRequest'>
            <HospitalNav />
            <HospitalMainNav />
            
            <div className='hospitalRequest-card'>
                <div className='hospitalRequest-main'>

                </div>
            </div>
        </div>
    );
}

export default HospitalRequest;
