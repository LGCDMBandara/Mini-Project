import React from 'react';
import "./userDashboard.css";
import UserNav from '../Component/UserNav';
import UserMainNav from '../Component/UserMainNav';
import Header from '../Image/Header.jpg'
import About from '../Image/About.jpg'
import Vision from '../Image/Vision.avif'
import Logo from '../Image/Logo.png'
import { FaPhone, FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import Alert from '../Component/Alert';

const UserDashboard = () => {
    return (
        <div className='mainUser'>
            <Alert />
            <UserNav />
            <UserMainNav />

            <div className="userDashboard-card">
                <div className="userDashboard-main">
                    <nav className="user-nav">
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#vision">Vision</a></li>
                            <li><a href="#footer">Contact Us</a></li>
                        </ul>
                    </nav>
                    <hr />
                    <section id="home" className="home-section">
                        <div className="home-content">
                            <img
                                src={Header}
                                alt="Home Background"
                                className="home-image"
                            />
                            <div className="home-text">
                                <h2>Give A Gift of Life and Be Hero</h2>
                                <p>With just one donation, you can be the hero someone
                                    desperately needs. Step up, make a difference, and be remembered as someone who gave others a second chance at life.</p>
                            </div>
                        </div>
                    </section>

                    <section id="about" className="about-section">
                        <div className="about-content">
                            <div className="about-image-container">
                                <img
                                    src={About}
                                    alt="About Us"
                                    className="about-image"
                                />
                            </div>
                            <div className="about-text">
                                <h2>About Us</h2>
                                <p>
                                    Blood Connect is a life-saving platform dedicated to bridging the gap between blood donors
                                    and those in urgent need. Our mission is to make blood donation easier, faster,
                                    and more accessible through a real-time, user-friendly system. Whether you're looking
                                    to donate or request blood, our platform connects you with verified users nearby, ensuring
                                    timely support during critical moments. Together, we aim to build a stronger, healthier
                                    community — one drop at a time.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="vision" className="vision-section">
                        <div className="vision-content">
                            <div className="vision-text">
                                <h2>Our Vision</h2>
                                <p>
                                    Our vision is to create a society where safe blood is always within reach, no matter
                                    the time or place. By promoting awareness, encouraging regular donations, and fostering
                                    a network of everyday heroes, Blood Connect empowers people to give the ultimate gift —
                                    the gift of life.
                                </p>
                            </div>
                            <div className="vision-image-container">
                                <img
                                    src={Vision}
                                    alt="Vision"
                                    className="vision-image"
                                />
                            </div>
                        </div>
                    </section>

                    <footer id="footer" className="footer-section">
                        <div className="footer-content">
                            <div className="footer-logo">
                                <img
                                    src={Logo}
                                    alt="Company Logo"
                                    className="logo-image"
                                />
                                <p className="logo-description">
                                    Born out of the need for a more efficient and 
                                    accessible blood donor network, our system connects donors, recipients, and healthcare 
                                    providers in real-time, ensuring that no life is lost due to a lack of timely blood supply.
                                </p>
                                <div className="social-icons">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                        <FaFacebook/>
                                    </a>
                                    <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                                        <FaWhatsapp/>
                                    </a>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                        <FaYoutube/>
                                    </a>
                                </div>
                            </div>
                            <div className="footer-links">
                                <h3>Quick Links</h3>
                                <ul>
                                    <li><a href="#home">Home</a></li>
                                    <li><a href="#about">About Us</a></li>
                                    <li><a href="#vision">Vision</a></li>
                                </ul>
                            </div>
                            <div className="footer-contact">
                                <h3>Contact Us</h3>
                                <p><FaPhone /> 011-456-7890</p>
                                <p><MdEmail /> bloodconnectsl@gmail.com</p>
                                <p><IoLocation /> 555/5D, Elvitigala Mw, Narahenpita, Colombo, Sri Lanka.</p>
                            </div>
                        </div>
                        <hr />
                        <div className="footer-copyright">
                            <p>© 2025 Our Platform. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;