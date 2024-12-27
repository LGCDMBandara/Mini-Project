import React from 'react';
import { FaTv, FaTable, FaGlobe, FaUser, FaSignInAlt } from 'react-icons/fa';
import { MdBloodtype, MdEvent } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import './adminNav.css';
import img1 from '../Image/Logo.png';

const AdminNav = () => {
    const location = useLocation(); 

    const isActive = (path) => location.pathname === path;

    return (
        <div className='mainAdmin'>
            <aside className="sidenav">
                <div className="sidenav-header">
                    <img src={img1} alt="Logo" />
                </div>
                <hr />
                <div className="navbar-collapse">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${isActive('/admindashboard') ? 'active' : ''}`}>
                            <Link to='/admindashboard' className={`nav-link ${isActive('/admindashboard') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaTv className="text-primary" />
                                </div>
                                <span className="nav-link-text ms-1">Dashboard</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminProfile') ? 'active' : ''}`}>
                            <Link to='/adminProfile' className={`nav-link ${isActive('/adminProfile') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaUser className="text-white" />
                                </div>
                                <span className="nav-link-text ms-1">User Management</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminMail') ? 'active' : ''}`}>
                            <Link to='/adminMail' className={`nav-link ${isActive('/adminMail') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaGlobe className="text-danger" />
                                </div>
                                <span className="nav-link-text ms-1">Request Mails</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminBlood') ? 'active' : ''}`}>
                            <Link to='/adminBlood' className={`nav-link ${isActive('/adminBlood') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <MdBloodtype className="text-warning" />
                                </div>
                                <span className="nav-link-text ms-1">Blood Management</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminEvent') ? 'active' : ''}`}>
                            <Link to='/adminEvent' className={`nav-link ${isActive('/adminEvent') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <MdEvent className="text-success" />
                                </div>
                                <span className="nav-link-text ms-1">Event Management</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminAnalaytic') ? 'active' : ''}`}>
                            <Link to='/adminAnalaytic' className={`nav-link ${isActive('/adminAnalaytic') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <IoMdAnalytics className="text-orange" />
                                </div>
                                <span className="nav-link-text ms-1">Analytics</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminReport') ? 'active' : ''}`}>
                            <Link to='/adminReport' className={`nav-link ${isActive('/adminReport') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaTable className="text-info" />
                                </div>
                                <span className="nav-link-text ms-1">Reports</span>
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

export default AdminNav;
