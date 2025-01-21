import React from 'react';
import UserNav from '../Component/UserNav';
import './userHealth.css';
import UserMainNav from '../Component/UserMainNav';

const UserHealth = () => {
    return (
        <div className='mainUser'>
            <UserNav />
            <UserMainNav />
            <div className='health-card'>
                <div className='health-main'>
                <h3 className='question'>Who can donate blood?</h3>
                <p>The person must fulfill several criteria to be accepted as a blood donor. These criteria are set forth to ensure the safety 
                    of the donor as well as the quality of donated blood.</p>

                <h3 className='question'>Donor Selection Criteria</h3>
                <ul>
                    <li>Age above 18 years and below 60 years.</li>
                    <li>If previously donated, at least 4 months should be elapsed since the date of previous donation.</li>
                    <li>Hemoglobin level should be more than 12g/dL. (this blood test is done prior to each blood donation)</li>
                    <li>Free from any serious disease condition or pregnancy.</li>
                    <li>Should have a valid identity card or any other document to prove the identity.</li>
                    <li>Free from “Risk Behaviors”.</li>
                </ul>

                <h3 className='question'>Risk Behaviors</h3>
                <ul>
                    <li>Homosexuals.</li>
                    <li>Sex workers and their clients.</li>
                    <li>Drug addicts.</li>
                    <li>Engaging in sex with any of the above.</li>
                    <li>Having more than one sexual partner</li>
                </ul>
                
                <h3 className='question'>Types of Donors</h3>
                <ul>
                    <li>Voluntary non remunerated donors. (donate for the sake of others and do not expect any benefit. their blood 
                        is considered safe and healthy)</li>
                    <li>Replacement donors. (donate to replace the units used for their friends or family members)</li>
                    <li>Paid donors. (receive payment for donation</li>
                    <li>Directed donors. (donate only for a specific patient’s requirement)</li>
                </ul>
                </div>
            </div>
        </div>
    );
}

export default UserHealth;
