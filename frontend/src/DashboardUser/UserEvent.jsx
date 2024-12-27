import React from 'react';
import UserNav from '../Component/UserNav';
import './userEvent.css';
import UserMainNav from '../Component/UserMainNav';

const UserEvent = () => {
    return (
        <div className='mainUser'>
            <UserNav />
            <UserMainNav />
        </div>
    );
}

export default UserEvent;
