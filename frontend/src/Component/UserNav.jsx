import React from 'react';
import { FaTv, FaTable, FaGlobe, FaUser, FaSignInAlt } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import './adminNav.css';
import img1 from '../Image/Logo.png';
import { useTranslation } from 'react-i18next';

const UserNav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path) => location.pathname.toLowerCase() === path.toLowerCase();

  return (
    <div className="mainUser">
      <aside className="sidenav">
        <div className="sidenav-header">
          <img src={img1} alt="Logo" />
        </div>
        <hr style={{marginTop: '-5%'}} />
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <li className={`nav-item ${isActive('/userdashboard') ? 'active' : ''}`}>
              <Link to="/userdashboard" className={`nav-link ${isActive('/userdashboard') ? 'active' : ''}`}>
                <div className="icon-container">
                  <FaTv className="text-primary" />
                </div>
                <span className="nav-link-text ms-1">{t('Dashboard')}</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/userprofile') ? 'active' : ''}`}>
              <Link to="/userprofile" className={`nav-link ${isActive('/userprofile') ? 'active' : ''}`}>
                <div className="icon-container">
                  <FaUser className="text-white" />
                </div>
                <span className="nav-link-text ms-1">{t('Profile')}</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/userblood') ? 'active' : ''}`}>
              <Link to="/userblood" className={`nav-link ${isActive('/userblood') ? 'active' : ''}`}>
                <div className="icon-container">
                  <FaGlobe className="text-danger" />
                </div>
                <span className="nav-link-text ms-1">{t('Request Blood')}</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/userevent') ? 'active' : ''}`}>
              <Link to="/userevent" className={`nav-link ${isActive('/userevent') ? 'active' : ''}`}>
                <div className="icon-container">
                  <MdEvent className="text-success" />
                </div>
                <span className="nav-link-text ms-1">{t('Donation Events')}</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/userhealth') ? 'active' : ''}`}>
              <Link to="/userhealth" className={`nav-link ${isActive('/userhealth') ? 'active' : ''}`}>
                <div className="icon-container">
                  <IoMdAnalytics className="text-orange" />
                </div>
                <span className="nav-link-text ms-1">{t('Health Tips')}</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/usercontact') ? 'active' : ''}`}>
              <Link to="/usercontact" className={`nav-link ${isActive('/usercontact') ? 'active' : ''}`}>
                <div className="icon-container">
                  <FaTable className="text-info" />
                </div>
                <span className="nav-link-text ms-1">{t('Contact Support')}</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <hr style={{marginTop: '35%'}} />
            <li className={`nav-item ${isActive('/userlogout') ? 'active' : ''}`}>
              <Link className="nav-link" to="/userlogout">
                <div className="icon-container">
                  <FaSignInAlt className="text-warning" />
                </div>
                <span className="nav-link-text ms-1">{t('Log out')}</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default UserNav;