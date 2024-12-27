import React, { useState } from 'react';
import FrontFooter from '../Component/FrontFooter';
import img from '../Image/Logo.png';
import './contact.css';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import PopupDone from '../Component/PopupDone';
import PopupWrong from '../Component/PopupWrong';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isPopupDoneVisible, setPopupDoneVisible] = useState(false);
    const [isPopupWrongVisible, setPopupWrongVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceID = 'service_olzahho';
        const templateID = 'template_4ny3izd';
        const userID = 'BJZeET0aHYtwgMZcZ';

        emailjs.send(serviceID, templateID, formData, userID)
            .then((response) => {
                setPopupDoneVisible(true);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            })
            .catch((error) => {
                setPopupWrongVisible(true);
            });
    };

    return (
        <div className='contactMain'>
            <div className="contact-page">
                <div className="image">
                    <img src={img} alt="Logo" />
                </div>
                <div className="wrapper">
                    <div className="email-form">
                        <h2>Contact Us</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-column">
                                <div className="column1">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='Name'
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder='Email'
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder='Phone Number'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="column2">
                                    <div className="form-group">
                                        <label>Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder='Subject'
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder='Write your Message....'
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="email-btn">
                                <button type="submit" className='send'>Send</button>
                                <Link className='cancel' to="/">
                                    <button type="button" className='cancel'>Cancel</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="footer">
                    <FrontFooter />
                </div>

                {/* Popups for success and error */}
                {isPopupDoneVisible && <PopupDone onClose={() => setPopupDoneVisible(false)} />}
                {isPopupWrongVisible && <PopupWrong onClose={() => setPopupWrongVisible(false)} />}
            </div>
        </div>
    );
}

export default Contact;
