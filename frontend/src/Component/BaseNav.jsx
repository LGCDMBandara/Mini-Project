import React from 'react';
import { FaTv, FaGlobe, FaSignInAlt } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { Link, useLocation, useParams } from 'react-router-dom';
import './adminNav.css';
import img1 from '../Image/Logo.png';

const AdminNav = () => {
    const { id: adminId } = useParams(); 
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="mainAdmin">
            <aside className="sidenav">
                <div className="sidenav-header">
                    <img src={img1} alt="Logo" />
                </div>
                <hr style={{marginTop: '-5%'}} />
                <div className="navbar-collapse">
                    <ul className="navbar-nav">
                        <li
                            className={`nav-item ${
                                isActive(`/basedashboard/${adminId}`) ? 'active' : ''
                            }`}
                        >
                            <Link
                                to={`/basedashboard/${adminId}`}
                                className={`nav-link ${
                                    isActive(`/basedashboard/${adminId}`) ? 'active' : ''
                                }`}
                            >
                                <div className="icon-container">
                                    <FaTv className="text-primary" />
                                </div>
                                <span className="nav-link-text ms-1">Blood Quantities</span>
                            </Link>
                        </li>
                        <li
                            className={`nav-item ${
                                isActive(`/viewbloodrequest/${adminId}`) ? 'active' : ''
                            }`}
                        >
                            <Link
                                to={`/viewbloodrequest/${adminId}`}
                                className={`nav-link ${
                                    isActive(`/viewbloodrequest/${adminId}`) ? 'active' : ''
                                }`}
                            >
                                <div className="icon-container">
                                    <FaGlobe className="text-danger" />
                                </div>
                                <span className="nav-link-text ms-1">Request Blood List</span>
                            </Link>
                        </li>
                        <li
                            className={`nav-item ${
                                isActive(`/basebloodmanagement/${adminId}`) ? 'active' : ''
                            }`}
                        >
                            <Link
                                to={`/basebloodmanagement/${adminId}`}
                                className={`nav-link ${
                                    isActive(`/basebloodmanagement/${adminId}`) ? 'active' : ''
                                }`}
                            >
                                <div className="icon-container">
                                    <MdBloodtype className="text-warning" />
                                </div>
                                <span className="nav-link-text ms-1">Blood Management</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <hr style={{marginTop: '105%'}} />
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminlogout">
                                <div className="icon-container">
                                    <FaSignInAlt className="text-warning" />
                                </div>
                                <span className="nav-link-text ms-1">Log out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default AdminNav;