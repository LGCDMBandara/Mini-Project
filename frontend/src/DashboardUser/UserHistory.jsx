import React from 'react';
import UserNav from '../Component/UserNav';
import './userHistory.css';
import UserMainNav from '../Component/UserMainNav';

const UserHistory = () => {
    return (
        <div className='mainUser'>
            <UserNav />
            <UserMainNav />
        </div>
    );
}

export default UserHistory;
