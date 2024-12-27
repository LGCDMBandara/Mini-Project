import React from 'react';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminReport.css';

const AdminReport = () => {
    return (
        <div className='MainAdmin'>
            <AdminNav />
            <AdminMainNav />
        </div>
    );
}

export default AdminReport;
