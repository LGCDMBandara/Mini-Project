import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './adminMainNav.css';

const AdminMainNav = () => {
    const { id: adminId } = useParams(); 
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminId) {
            navigate('/login');
        }
    }, [adminId, navigate]);

    const pageNames = adminId
        ? {
              [`/basebloodmanagement/${adminId}`]: 'Blood Management',
              [`/viewbloodrequest/${adminId}`]: 'Request Blood List',
              [`/basedashboard/${adminId}`]: 'Blood Quantities',
          }
        : {};

    const currentPath = location.pathname.toLowerCase();
    const pageName = pageNames[currentPath] || 'Blood Quantities';

    const [time, setTime] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            setTime({
                hours: currentTime.getHours().toString().padStart(2, '0'),
                minutes: currentTime.getMinutes().toString().padStart(2, '0'),
                seconds: currentTime.getSeconds().toString().padStart(2, '0'),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!adminId) {
        return null; 
    }

    return (
        <div>
            <nav className="navbar-main">
                <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb-ol">
                            <li className="breadcrumb-item">Pages</li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {pageName}
                            </li>
                        </ol>
                        <h6 className="pageName">{pageName}</h6>
                    </nav>

                    <div className="clock-part">
                        <div className="clock-main">
                            <div className="clock">
                                <span>{time.hours}</span>
                                <span>:</span>
                                <span>{time.minutes}</span>
                                <span>:</span>
                                <span>{time.seconds}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AdminMainNav;