import React from 'react';
import { FaTv, FaGlobe, FaSignInAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './adminNav.css';
import img1 from '../Image/Logo.png';

const HospitalNav = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className='mainAdmin'>
            <aside className="sidenav">
                <div className="sidenav-header">
                    <img src={img1} alt="Logo" />
                </div>
                <hr style={{marginTop: '-5%'}} />
                <div className="navbar-collapse">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${isActive('/hospitaldashboard') ? 'active' : ''}`}>
                            <Link to='/hospitaldashboard' className={`nav-link ${isActive('/hospitaldashboard') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaTv className="text-primary" />
                                </div>
                                <span className="nav-link-text ms-1">View Blood Bank</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive('/hospitalrequest') ? 'active' : ''}`}>
                            <Link to='/hospitalrequest' className={`nav-link ${isActive('/hospitalrequest') ? 'active' : ''}`}>
                                <div className="icon-container">
                                    <FaGlobe className="text-danger" />
                                </div>
                                <span className="nav-link-text ms-1">Request Blood</span>
                            </Link>
                        </li>
                        <hr style={{marginTop: '130%'}} />
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
}

export default HospitalNav;
