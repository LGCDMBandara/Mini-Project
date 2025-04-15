import React, { useState } from 'react';
import UserNav from '../Component/UserNav';
import './userContact.css';
import UserMainNav from '../Component/UserMainNav';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserContact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

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
               toast.success('Email Sent Successfully!')
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            })
            .catch((error) => {
                toast.error('Failed to submit request')
            });
    };

    return (
        <div className='mainUser'>
            <ToastContainer />
            <UserNav />
            <UserMainNav />

            <div className='contact-card'>
                <div className='contact-main'>
                    <div className="contact-form">
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
                            <div className="contact-btn">
                                <button type="submit" className='send'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserContact;
