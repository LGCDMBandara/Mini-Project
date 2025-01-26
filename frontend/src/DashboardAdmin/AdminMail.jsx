import React from 'react';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminMail.css';

const AdminMail = () => {
    return (
        <div className='MainAdmin'>
            <AdminNav />
            <AdminMainNav />

            <div className="mail-card">
                <div className="mail-main">
                    
                </div>
            </div>
        </div>
    );
}

export default AdminMail;
