import React from 'react';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminProfile.css';

const Profile = () => {
    return (
        <div className='MainAdmin'>
            <AdminNav />
            <AdminMainNav />
        </div>
    );
}

export default Profile;
