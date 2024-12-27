import React, { useState, useEffect } from 'react';
import { FaBell, FaClock } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'; 
import './adminMainNav.css';
import img1 from '../Image/Man.jpg';
import img2 from '../Image/Women.jpg';

const AdminMainNav = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const location = useLocation(); 
    
    const pageNames = {
        '/adminBlood': 'Blood Management',
        '/adminProfile': 'User Management',
        '/adminDashboard': 'Dashboard',
        '/adminMail': 'Request Mails',
        '/adminEvent': 'Event Management',
        '/adminAnalaytic': 'Analaytics',
        '/adminReport': 'Reports',
    };

    const currentPath = location.pathname;
    const pageName = pageNames[currentPath] || 'Dashboard';

    const notifications = [
        { id: 1, message: "New message from Laur", time: "13 minutes ago", img: img1 },
        { id: 2, message: "New message from Shima", time: "30 minutes ago", img: img2 },
    ];

    const handleBellClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

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
                        <h6 className='pageName'>{pageName}</h6>
                    </nav>
                    <div className="navbar-collapse2">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="navTop-link" onClick={handleBellClick}>
                                    <FaBell className="icon cursor-pointer" />
                                </a>
                                {isDropdownVisible && (
                                    <ul className="dropdown-menu">
                                        {notifications.map(notification => (
                                            <li key={notification.id} className="mb-2">
                                                <a className="dropdown-item">
                                                    <div className="d-flex py-1">
                                                        <div className="my-auto">
                                                            <img src={notification.img} alt="profile" className="profile-img" />
                                                        </div>
                                                        <div className="notification">
                                                            <h6 className="text-sm">
                                                                <span>{notification.message}</span>
                                                            </h6>
                                                            <p className="text-xs">
                                                                <FaClock className="me-1" />
                                                                {notification.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AdminMainNav;
