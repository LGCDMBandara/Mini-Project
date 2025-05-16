import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './hospitalRequest.css';
import HospitalMainNav from '../Component/HospitalMainNav';
import HospitalNav from '../Component/HospitalNav';

const HospitalRequest = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        purpose: '',
        bloodUnits: '',
        bloodGroup: '',
        needDate: '',
        hospital: '',
        bloodBank: '',
        province: '',
        district: '',
        details: ''
    });
    const [hospitals, setHospitals] = useState([]);
    const [bloodBanks, setBloodBanks] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingToastId, setLoadingToastId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('No authentication token found. Please log in.');
                setLoading(false);
                return;
            }
            try {
                const toastId = toast.info('Loading data...', { autoClose: false });
                setLoadingToastId(toastId);
                const [hospitalRes, bloodBankRes, locationRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/hospital-requests/hospitals', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:5000/api/hospital-requests/blood-banks', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:5000/api/hospital-requests/locations', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                setHospitals(Array.isArray(hospitalRes.data.data) ? hospitalRes.data.data : []);
                setBloodBanks(Array.isArray(bloodBankRes.data.data) ? bloodBankRes.data.data : []);
                setProvinces(Array.isArray(locationRes.data.data.provinces) ? locationRes.data.data.provinces : []);
            } catch (err) {
                console.error('Fetch Error:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status
                });
                toast.error(err.response?.data?.message || 'Failed to load data. Please try again.');
                setHospitals([]);
                setBloodBanks([]);
                setProvinces([]);
            } finally {
                setLoading(false);
                if (loadingToastId) {
                    toast.dismiss(loadingToastId);
                    setLoadingToastId(null);
                }
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (formData.province) {
            const fetchDistricts = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`http://localhost:5000/api/hospital-requests/locations?province=${formData.province}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setAvailableDistricts(Array.isArray(res.data.data.districts) ? res.data.data.districts : []);
                } catch (err) {
                    console.error('Fetch Districts Error:', err.response?.data);
                    toast.error(err.response?.data?.message || 'Failed to load districts');
                    setAvailableDistricts([]);
                }
            };
            fetchDistricts();
        } else {
            setAvailableDistricts([]);
        }
    }, [formData.province]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.info('Submitting request...', { autoClose: false });
        setLoadingToastId(toastId);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/hospital-requests', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Blood request submitted successfully');
            setFormData({
                patientName: '',
                purpose: '',
                bloodUnits: '',
                bloodGroup: '',
                needDate: '',
                hospital: '',
                bloodBank: '',
                province: '',
                district: '',
                details: ''
            });
        } catch (err) {
            console.error('Submit Error:', err.response?.data);
            toast.error(err.response?.data?.message || 'Failed to submit request');
        } finally {
            setLoading(false);
            toast.dismiss(toastId);
            setLoadingToastId(null);
        }
    };

    return (
        <div className='MainHospitalRequest'>
            <ToastContainer />
            <HospitalNav />
            <HospitalMainNav />
            
            <div className='hospitalRequest-card'>
                <div className='hospitalRequest-main'>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Patient Name</label>
                                <input
                                    type="text"
                                    name="patientName"
                                    className="form-control"
                                    value={formData.patientName}
                                    onChange={handleChange}
                                    placeholder="Patient Name"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Purpose</label>
                                <input
                                    type="text"
                                    name="purpose"
                                    className="form-control"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    placeholder="Purpose"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Blood Units</label>
                                <input
                                    type="number"
                                    name="bloodUnits"
                                    className="form-control"
                                    value={formData.bloodUnits}
                                    onChange={handleChange}
                                    placeholder="Blood Units"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Blood Group</label>
                                <select
                                    name="bloodGroup"
                                    className="form-control"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">--Select Blood Group--</option>
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
                            <div className="col-md-6 mb-3">
                                <label>When Need Blood?</label>
                                <input
                                    type="date"
                                    name="needDate"
                                    className="form-control"
                                    value={formData.needDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Hospital Name</label>
                                <select
                                    name="hospital"
                                    className="form-control"
                                    value={formData.hospital}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">--Select Hospital--</option>
                                    {hospitals.length > 0 ? (
                                        hospitals.map((hospital) => (
                                            <option key={hospital.id} value={hospital.id}>
                                                {hospital.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No hospitals available</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Blood Bank Name</label>
                                <select
                                    name="bloodBank"
                                    className="form-control"
                                    value={formData.bloodBank}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">--Select Blood Bank--</option>
                                    {bloodBanks.length > 0 ? (
                                        bloodBanks.map((bloodBank) => (
                                            <option key={bloodBank.id} value={bloodBank.id}>
                                                {bloodBank.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No blood banks available</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Province</label>
                                <select
                                    name="province"
                                    className="form-control"
                                    value={formData.province}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">--Select Province--</option>
                                    {provinces.length > 0 ? (
                                        provinces.map((province) => (
                                            <option key={province} value={province}>
                                                {province}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No provinces available</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>District</label>
                                <select
                                    name="district"
                                    className="form-control"
                                    value={formData.district}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.province}
                                >
                                    <option value="">--Select District--</option>
                                    {availableDistricts.length > 0 ? (
                                        availableDistricts.map((district) => (
                                            <option key={district} value={district}>
                                                {district}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No districts available</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Description</label>
                                <textarea
                                    name="details"
                                    className="form-control"
                                    value={formData.details}
                                    onChange={handleChange}
                                    placeholder="Additional details"
                                    rows="4"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{width: '100%'}}
                        >
                            {loading ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HospitalRequest;