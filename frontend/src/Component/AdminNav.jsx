import React from 'react';
import { FaTv, FaTable, FaGlobe, FaUser, FaSignInAlt } from 'react-icons/fa';
import { MdBloodtype, MdEvent } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import './adminNav.css';
import img1 from '../Image/Logo.png';

const AdminNav = () => {
    const location = useLocation();

    const isActive = (path) => {
        const userManagementPaths = ['/adminprofile', '/addadmin', '/viewadmin'];
        if (path === '/adminprofile') {
            return userManagementPaths.includes(location.pathname.toLowerCase());
        }
        return location.pathname.toLowerCase() === path.toLowerCase();
    };

    return (
        <div className='mainAdmin'>
            <aside className="sidenav">
                <div className="sidenav-header">
                    <img src={img1} alt="Logo" />
                </div>
                <hr style={{marginTop: "-5%"}} />
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
                        <li className={`nav-item ${isActive('/adminprofile') ? 'active' : ''}`}>
                            <Link to='/adminprofile' className={`nav-link ${isActive('/adminprofile') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaUser className="text-white" />
                                </div>
                                <span className="nav-link-text ms-1">User Management</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminmail') ? 'active' : ''}`}>
                            <Link to='/adminmail' className={`nav-link ${isActive('/adminmail') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaGlobe className="text-danger" />
                                </div>
                                <span className="nav-link-text ms-1">Request Mails</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminblood') ? 'active' : ''}`}>
                            <Link to='/adminblood' className={`nav-link ${isActive('/adminblood') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <MdBloodtype className="text-warning" />
                                </div>
                                <span className="nav-link-text ms-1">Blood Management</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminevent') ? 'active' : ''}`}>
                            <Link to='/adminevent' className={`nav-link ${isActive('/adminevent') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <MdEvent className="text-success" />
                                </div>
                                <span className="nav-link-text ms-1">Event Management</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminanalytic') ? 'active' : ''}`}>
                            <Link to='/adminanalytic' className={`nav-link ${isActive('/adminanalytic') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <IoMdAnalytics className="text-orange" />
                                </div>
                                <span className="nav-link-text ms-1">Analytics</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/adminreport') ? 'active' : ''}`}>
                            <Link to='/adminreport' className={`nav-link ${isActive('/adminreport') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaTable className="text-info" />
                                </div>
                                <span className="nav-link-text ms-1">Reports</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <hr style={{marginTop: "15%" , marginBottom: "5%"}} />
                        <li className="nav-item">
                            <Link className="nav-link" to={'/adminlogout'}>
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
