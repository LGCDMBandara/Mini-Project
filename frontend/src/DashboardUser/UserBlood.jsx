import React from 'react';
import './userBlood.css';
import UserNav from '../Component/UserNav';
import UserMainNav from '../Component/UserMainNav';

const UserBlood = () => {
    return (
        <div className='mainUser'>
            <UserNav />
            <UserMainNav />
        </div>
    );
}

export default UserBlood;
