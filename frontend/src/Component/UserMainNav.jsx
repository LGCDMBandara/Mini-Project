import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './userMainNav.css';

const UserMainNav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const pageNames = {
    '/userblood': 'Request Blood',
    '/userprofile': 'Profile',
    '/userdashboard': 'Dashboard',
    '/userevent': 'Donation Events',
    '/userhealth': 'Health Tips',
    '/usercontact': 'Contact Support',
    '/userlogout': 'Log out',
  };

  const currentPath = location.pathname.toLowerCase();
  const translationKey = pageNames[currentPath] || 'Dashboard';
  const pageName = t(translationKey);

  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const [currentLang, setCurrentLang] = useState(i18n.language || 'si');

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

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <div>
      <div className="navbar-user">
        <div className="container-user">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb-user-ol">
              <li className="breadcrumb-item">{t('pages')}</li>
              <li className="breadcrumb-item active" aria-current="page">
                {pageName}
              </li>
            </ol>
            <h6 className="pageName-user">{pageName}</h6>
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
              <div className="language-toggle">
                <select value={currentLang} onChange={handleLanguageChange}>
                  <option value="en">ENG</option>
                  <option value="si">සිංහල</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMainNav;