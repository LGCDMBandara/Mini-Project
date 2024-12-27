import React from 'react';
import UserNav from '../Component/UserNav';
import './userContact.css';
import UserMainNav from '../Component/UserMainNav';

const UserContact = () => {
    return (
        <div className='mainUser'>
            <UserNav />
            <UserMainNav />
        </div>
    );
}

export default UserContact;
