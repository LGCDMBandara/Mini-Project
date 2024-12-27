import React from 'react';
import "./userDashboard.css";
import UserNav from '../Component/UserNav';
import UserMainNav from '../Component/UserMainNav';

const UserDashboard = () => {
    return (
        <div className='mainUser'>
            <UserNav />
            <UserMainNav />
        </div>
    );
}

export default UserDashboard;
