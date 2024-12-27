import React from 'react';
import './userprofile.css';
import UserNav from '../Component/UserNav';
import UserMainNav from '../Component/UserMainNav';

const UserProfile = () => {
    return (
        <div className='mainUser'>
            <UserNav />
            <UserMainNav />
        </div>
    );
}

export default UserProfile;
