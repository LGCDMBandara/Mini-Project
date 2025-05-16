import React, { useEffect } from 'react';
import './userDashboard.css';
import UserNav from '../Component/UserNav';
import UserMainNav from '../Component/UserMainNav';
import Header from '../Image/Header.jpg'; 
import About from '../Image/About.jpg';
import Vision from '../Image/Vision.avif';
import Logo from '../Image/Logo.png';
import { FaPhone, FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { IoLocation } from 'react-icons/io5';
import Alert from '../Component/Alert';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong in UserDashboard.</h1>;
    }
    return this.props.children;
  }
}

const UserDashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    console.log('UserDashboard: Component mounted');
    console.log('UserDashboard: Token present:', !!localStorage.getItem('token'));

    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <ErrorBoundary>
      <div className="mainUser">
        {console.log('UserDashboard: Rendering Alert')}
        <Alert />
        {console.log('UserDashboard: Rendering UserNav')}
        <UserNav />
        {console.log('UserDashboard: Rendering UserMainNav')}
        <UserMainNav />

        <div className="userDashboard-card">
          <div className="userDashboard-main">
            <nav className="user-nav">
              <ul>
                <li><Link to="#home">{t('Home')}</Link></li>
                <li><Link to="#about">{t('About Us')}</Link></li>
                <li><Link to="#vision">{t('Our Vision')}</Link></li>
                <li><Link to="#footer">{t('Contact Us')}</Link></li>
              </ul>
            </nav>
            <hr />
            <section id="home" className="home-section">
              <div className="home-content">
                <img src={Header} alt="Home Background" className="home-image" />
                <div className="home-text">
                  <h2>{t('title')}</h2>
                  <p>{t('sub_title')}</p>
                </div>
              </div>
            </section>

            <section id="about" className="about-section">
              <div className="about-content">
                <div className="about-image-container">
                  <img src={About} alt="About Us" className="about-image" />
                </div>
                <div className="about-text">
                  <h2>{t('About Us')}</h2>
                  <p>{t('about')}</p>
                </div>
              </div>
            </section>

            <section id="vision" className="vision-section">
              <div className="vision-content">
                <div className="vision-text">
                  <h2>{t('Our Vision')}</h2>
                  <p>{t('vision')}</p>
                </div>
                <div className="vision-image-container">
                  <img src={Vision} alt="Vision" className="vision-image" />
                </div>
              </div>
            </section>

            <footer id="footer" className="footer-section">
              <div className="footer-content">
                <div className="footer-logo">
                  <img src={Logo} alt="Company Logo" className="logo-image" />
                  <p className="logo-description">{t('description')}</p>
                  <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <FaFacebook />
                    </a>
                    <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                      <FaYoutube />
                    </a>
                  </div>
                </div>
                <div className="footer-links">
                  <h3>{t('link')}</h3>
                  <ul>
                    <li><Link to="#home">{t('Home')}</Link></li>
                    <li><Link to="#about">{t('About Us')}</Link></li>
                    <li><Link to="#vision">{t('Our Vision')}</Link></li>
                  </ul>
                </div>
                <div className="footer-contact">
                  <h3>{t('Contact Us')}</h3>
                  <p>
                    <FaPhone /> 011-456-7890
                  </p>
                  <p>
                    <MdEmail /> bloodconnectsl@gmail.com
                  </p>
                  <p>
                    <IoLocation /> {t('address_bank')}
                  </p>
                </div>
              </div>
              <hr />
              <div className="footer-copyright">
                <p>© 2025 Blood Connect. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default UserDashboard;