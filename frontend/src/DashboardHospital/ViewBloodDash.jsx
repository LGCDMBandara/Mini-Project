import React, { useEffect, useRef, useState } from 'react';
import '../DashboardAdmin/bloodDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import logo from "../Image/Logo.png";
import { CgCloseO } from "react-icons/cg";
import img from "../Image/BloodAd.jpg";
import { toast } from 'react-toastify';
import '../DashboardBaseBloodBank/baseDashboard.css';
import { Chart } from 'chart.js/auto';
import { jwtDecode } from 'jwt-decode';

const ViewAdminDash = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const chartRef = useRef(null);
    const [bloodData, setBloodData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (!id || id === 'undefined') {
            setError('Invalid admin ID in URL');
            toast.error('Invalid admin ID. Redirecting to admin list.');
            navigate('/viewadmin');
            return;
        }

        const fetchBloodInventory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                let adminId;
                try {
                    const decoded = jwtDecode(token);
                    adminId = decoded.id;
                    if (!adminId) {
                        throw new Error('No admin ID found in token');
                    }
                } catch (decodeError) {
                    console.error('Token decode error:', decodeError);
                    throw new Error('Invalid token format');
                }

                const response = await fetch(`http://localhost:5000/api/admins/bloodAnalize/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error: ${response.statusText} (${response.status}) - ${errorText}`);
                }

                const data = await response.json();
                setBloodData(data.data || []);
            } catch (err) {
                console.error('Error fetching blood quantities:', err.message);
                setError(err.message);
            }
        };

        fetchBloodInventory();
    }, [id, navigate]);

    useEffect(() => {
        if (bloodData.length === 0 || !chartRef.current) {
            return;
        }

        try {
            const ctx = chartRef.current.getContext('2d');
            if (!ctx) {
                throw new Error('Failed to get canvas context');
            }

            if (chartInstance) {
                chartInstance.destroy();
            }

            const labels = bloodData.map(item => item.bloodType);
            const totalBlood = bloodData.map(item => {
                const donation = item.quantities.find(q => q.status === 'donation')?.totalQuantity || 0;
                const request = item.quantities.find(q => q.status === 'request')?.totalQuantity || 0;
                return donation - request;
            });

            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Total Blood Available',
                            data: totalBlood,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { ticks: { color: 'white' } },
                        y: {
                            ticks: { color: 'white' },
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: { labels: { color: 'white' } },
                    },
                },
            });

            setChartInstance(newChartInstance);
        } catch (err) {
            console.error('Error creating chart:', err.message);
            setError('Failed to render blood quantity chart');
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [bloodData]);

    useEffect(() => {
        if (!id || id === 'undefined') {
            setError('Invalid admin ID in URL');
            toast.error('Invalid admin ID. Redirecting to admin list.');
            navigate('/viewadmin');
            return;
        }

        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await fetch(`http://localhost:5000/api/admins/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error fetching user: ${response.statusText} (${response.status}) - ${errorText}`);
                }

                const data = await response.json();

                if (data.user) {
                    setUser(data.user);
                } else {
                    throw new Error('No user data found');
                }
            } catch (err) {
                console.error('Error fetching user details:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, navigate]);

    const handleClose = () => {
        navigate('/hospitaldashboard');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const requestBlood = () => {
        navigate('/hospitalrequest')
    };

    if (error) {
        return (
            <div>
                <div className="donor-profile-header">
                    <img src={logo} alt="Logo" className="donor-profile-logo" />
                    <button onClick={handleClose} className="profileClose-button">
                        <CgCloseO />
                    </button>
                </div>
                <div>Error: {error}</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <div className="donor-profile-header">
                    <img src={logo} alt="Logo" className="donor-profile-logo" />
                    <button onClick={handleClose} className="profileClose-button">
                        <CgCloseO />
                    </button>
                </div>
                <div>No user data available.</div>
            </div>
        );
    }

    return (
        <div>
            <div className="donor-profile-header">
                <img src={logo} alt="Logo" className="donor-profile-logo" />
                <button onClick={handleClose} className="profileClose-button">
                    <CgCloseO />
                </button>
            </div>

            <div className="donor-blood-container">
                <div className="donor-blood-card">
                    <div className="donor-blood-left">
                        <img
                            src={img}
                            alt={user.username || 'Blood Bank'}
                            className="donor-blood-image"
                        />
                        <p className="donor-blood-group">
                            Bank Name : <span className="donor-blood-type">{user.username}</span>
                        </p>
                        <p className="donor-email">Email : {user.email}</p>
                        <p className="donor-mobile">Mobile : {user.phone || 'N/A'}</p>
                        <p className="donor-email">Province : {user.province || 'N/A'}</p>
                        <p className="donor-mobile">District : {user.district || 'N/A'}</p>
                    </div>
                    <div className="donor-blood-right">
                        <h3 className="donor-details-heading">Blood Quantity</h3>
                        <div className="card-body">
                            <div className="chart">
                                <canvas ref={chartRef} className="blood-canvas" height="500px"></canvas>
                            </div>
                        </div>
                        <button style={{width: '60%', marginLeft : '20%'}} className="adminProfile-button" onClick={requestBlood}>Request Blood</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAdminDash;