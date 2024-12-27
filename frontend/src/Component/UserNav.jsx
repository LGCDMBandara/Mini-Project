import React from 'react';
import { FaTv, FaTable, FaGlobe, FaUser, FaSignInAlt } from 'react-icons/fa';
import { MdBloodtype, MdEvent } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import './adminNav.css';
import img1 from '../Image/Logo.png';

const UserNav = () => {
    const location = useLocation(); 

    const isActive = (path) => location.pathname === path;

    return (
        <div className='mainUser'>
            <aside className="sidenav">
                <div className="sidenav-header">
                    <img src={img1} alt="Logo" />
                </div>
                <hr />
                <div className="navbar-collapse">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${isActive('/userdashboard') ? 'active' : ''}`}>
                            <Link to='/userdashboard' className={`nav-link ${isActive('/userdashboard') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaTv className="text-primary" />
                                </div>
                                <span className="nav-link-text ms-1">Dashboard</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/userProfile') ? 'active' : ''}`}>
                            <Link to='/userProfile' className={`nav-link ${isActive('/userProfile') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaUser className="text-white" />
                                </div>
                                <span className="nav-link-text ms-1">Profile</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/userBlood') ? 'active' : ''}`}>
                            <Link to='/userBlood' className={`nav-link ${isActive('/userBlood') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaGlobe className="text-danger" />
                                </div>
                                <span className="nav-link-text ms-1">Request Blood</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/userHistory') ? 'active' : ''}`}>
                            <Link to='/userHistory' className={`nav-link ${isActive('/userHistory') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <MdBloodtype className="text-warning" />
                                </div>
                                <span className="nav-link-text ms-1">Donation History</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/userEvent') ? 'active' : ''}`}>
                            <Link to='/userEvent' className={`nav-link ${isActive('/userEvent') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <MdEvent className="text-success" />
                                </div>
                                <span className="nav-link-text ms-1">Donation Events</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/userHealth') ? 'active' : ''}`}>
                            <Link to='/userHealth' className={`nav-link ${isActive('/userHealth') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <IoMdAnalytics className="text-orange" />
                                </div>
                                <span className="nav-link-text ms-1">Health Tips</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/userContact') ? 'active' : ''}`}>
                            <Link to='/userContact' className={`nav-link ${isActive('/userContact') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaTable className="text-info" />
                                </div>
                                <span className="nav-link-text ms-1">Contact Support</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <hr />
                        <li className="nav-item">
                            <a className="nav-link" href="../pages/sign-in.html">
                                <div className="icon-container">
                                    <FaSignInAlt className="text-warning" />
                                </div>
                                <span className="nav-link-text ms-1">Log out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default UserNav;
