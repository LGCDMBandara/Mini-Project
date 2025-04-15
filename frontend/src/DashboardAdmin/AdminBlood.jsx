import React, { useState } from 'react';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminBlood.css';
import { toast, ToastContainer } from 'react-toastify';

const AdminBlood = () => {
    const [donateData, setDonateData] = useState({
        teamName: '',
        date: '',
        bloodType: '',
        quantity: ''
    });

    const [requestData, setRequestData] = useState({
        teamName: '',
        date: '',
        bloodType: '',
        quantity: ''
    });

    const handleDonateChange = (e) => {
        const { name, value } = e.target;
        setDonateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRequestChange = (e) => {
        const { name, value } = e.target;
        setRequestData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDonateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/blood/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(donateData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to donate blood');
            }
    
            // Reset state after successful submission
            setDonateData({
                teamName: '',
                date: '',
                bloodType: '',
                quantity: ''
            });
            toast.success('Donation recorded successfully!', { position: 'top-right' });
        } catch (error) {
            toast.error(`Error: ${error.message}`, { position: 'top-right' });
        }
    };
    

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/blood/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to request blood');
            }

            setRequestData({
                teamName: '',
                date: '',
                bloodType: '',
                quantity: ''
            });
            toast.success('Request recorded successfully!', { position: 'top-right' });
        } catch (error) {
            toast.error(`Error: ${error.message}`, { position: 'top-right' });
        }
    };
    

    return (
        <div className='MainAdmin'>
            <AdminNav />
            <AdminMainNav />
            <ToastContainer />

            <div className="blood-card">
                <div className="blood-main">
                    <h1>Donate Blood</h1>
                    <form className='blood-form' onSubmit={handleDonateSubmit}>
                        <div className="bloodform-group">
                            <label>Organizing Team Name</label>
                            <input
                                type="text"
                                name="teamName"
                                value={donateData.teamName}
                                onChange={handleDonateChange}
                                required
                            />
                        </div>
                        <div className="bloodform-group">
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={donateData.date}
                                onChange={handleDonateChange}
                                required
                            />
                        </div>
                        <div className="bloodform-group">
                            <label>Blood Type</label>
                            <select
                                name="bloodType"
                                value={donateData.bloodType}
                                onChange={handleDonateChange}
                                required
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div className="bloodform-group">
                            <label>Quantity [Unit/Bag(S)]</label>
                            <input
                                type="number"
                                name="quantity"
                                value={donateData.quantity}
                                onChange={handleDonateChange}
                                required
                            />
                        </div>
                        <button className='blood-button1' type="submit">Donate</button>
                    </form>
                </div>

                <div className="blood-main">
                    <h1>Request Blood</h1>
                    <form className='blood-form' onSubmit={handleRequestSubmit}>
                        <div className="bloodform-group">
                            <label>Request Team Name</label>
                            <input
                                type="text"
                                name="teamName"
                                value={requestData.teamName}
                                onChange={handleRequestChange}
                                required
                            />
                        </div>
                        <div className="bloodform-group">
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={requestData.date}
                                onChange={handleRequestChange}
                                required
                            />
                        </div>
                        <div className="bloodform-group">
                            <label>Blood Type</label>
                            <select
                                name="bloodType"
                                value={requestData.bloodType}
                                onChange={handleRequestChange}
                                required
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div className="bloodform-group">
                            <label>Quantity [Unit/Bag(S)]</label>
                            <input
                                type="number"
                                name="quantity"
                                value={requestData.quantity}
                                onChange={handleRequestChange}
                                required
                            />
                        </div>
                        <button className='blood-button2' type="submit">Request</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminBlood;
