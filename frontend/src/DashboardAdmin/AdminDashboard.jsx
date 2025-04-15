import React, { useEffect, useRef, useState } from 'react';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import { FaHospitalUser } from 'react-icons/fa';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdEventAvailable } from "react-icons/md";
import './adminDashboard.css';
import Chart from 'chart.js/auto';

const AdminDashboard = () => {
    const chartRef = useRef(null);
    const mapRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [eventCount, setEventCount] = useState(0);
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [bloodData, setBloodData] = useState([]);
    const [count, setCount] = useState(null);
    let chartInstance = null;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events/fetch');
                const data = await response.json();
                setEvents(data.events);
                setEventCount(data.eventCount || data.events.length);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/fetch');
                const data = await response.json();
                setUsers(data.users);
                setUserCount(data.userCount || data.users.length);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchBloodInventory = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/blood/bloodAnalize'); 
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetched Blood Quantities:', data); 
                console.log('Parsed Blood Quantities Data:', data.data); 
                setBloodData(data.data); 
            } catch (error) {
                console.error('Error fetching blood quantities:', error);
            }
        };

        fetchBloodInventory();
    }, []);

    useEffect(() => {
        const fetchUserCount = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/users/count');
            const data = await response.json();
            if (response.ok) {
              setCount(data.count);
            } else {
              throw new Error(data.error || 'Failed to fetch');
            }
          } catch (err) {
            console.log(err.message);
          }
        };
    
        fetchUserCount();
      }, []);

    useEffect(() => {
        const initializeChart = () => {
            const ctx = chartRef.current.getContext('2d');
            if (chartInstance) chartInstance.destroy();
    
            const labels = bloodData.map(item => item.bloodType);
            const differences = bloodData.map(item => {
                const donation = item.quantities.find(q => q.status === "donate")?.totalQuantity || 0;
                const request = item.quantities.find(q => q.status === "request")?.totalQuantity || 0;
                return donation - request;
            });
    
            chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Net Blood Quantity",
                            data: differences,
                            backgroundColor: 'rgb(54, 163, 235)',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { ticks: { color: 'white' }},
                        y: { 
                            ticks: { color: 'white' },
                            beginAtZero: true,
                        },
                    },
                    plugins: { 
                        legend: { labels: { color: 'white' }},
                    },
                },
            });
        };
    
        if (bloodData.length > 0) {
            initializeChart();
        }
    
        return () => {
            if (chartInstance) chartInstance.destroy();
        };
    }, [bloodData]);
    
    

    useEffect(() => {
        if (events.length > 0) {
            const initializeMap = () => {
                const map = new window.google.maps.Map(mapRef.current, {
                    center: { lat: 7.8731, lng: 80.7718 },
                    zoom: 7,
                });

                events.forEach(event => {
                    console.log('Event data:', event);

                    let lat, lng;

                    if (event.location && typeof event.location === 'object') {
                        lat = event.location.lat;
                        lng = event.location.lng;
                    }
                    else if (Array.isArray(event.location) && event.location.length === 2) {
                        lat = event.location[0];
                        lng = event.location[1];
                    }
                    else if (typeof event.location === 'string') {
                        const coords = event.location.split(',');
                        lat = parseFloat(coords[0]);
                        lng = parseFloat(coords[1]);
                    }

                    if (lat !== undefined && lng !== undefined && !isNaN(lat) && !isNaN(lng) &&
                        lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                        
                        const marker = new window.google.maps.Marker({
                            position: { lat: lat, lng: lng },
                            map, 
                            title: event.teamName,
                        });

                        const infoWindow = new window.google.maps.InfoWindow({
                            content: `
                                <div padding: 8px; max-width: 200px; text-align: center;">
                                    <h5 style="font-size: 16px; font-weight: bold; margin: 0; color: #333;"><strong>Organizer :</strong><br> ${event.teamName}</h5>
                                    <p style="font-size: 12px; margin: 5px 0; color: #555;">
                                        <strong>Date :</strong> ${event.date}
                                    </p>
                                    <p style="font-size: 12px; margin: 5px 0; color: #555;">
                                        <strong>Time :</strong> ${event.fromTime} - ${event.toTime}
                                    </p>
                                    <p style="font-size: 12px; margin: 5px 0; color: #555;">
                                        <strong>Urgent Blood Type :</strong> ${event.bloodgroup}
                                    </p>
                                </div>
                            `,
                        });
                        

                        marker.addListener("click", () => {
                            infoWindow.open(map, marker);
                        });
                    } else {
                        console.error("Event location is missing or has an incorrect format:", event.location);
                    }                    
                });
            };

            if (!window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAsfuQQDAhqljnQkU-FIABl15DWBSHGvnw&callback=initializeMap`;
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
                script.onload = initializeMap;
            } else {
                initializeMap();
            }
        }
    }, [events]);    

    return (
        <div className="mainAdmin">
            <AdminNav />
            <AdminMainNav />

            <div className="container-fluid-1">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">All Users</p>
                                            <h5 className="font-weight-bolder">
                                                {userCount <= 9 ? `0${userCount}` : userCount}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-center">
                                        <FaHospitalUser className="icon-style" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">Incomplete Users</p>
                                            <h5 className="font-weight-bolder">
                                                {count <= 9 ? `0${count}` : count}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-center">
                                        <AiOutlineUsergroupAdd className="icon-style bg-gradient-success shadow-success rounded-circle" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">All Events</p>
                                            <h5 className="font-weight-bolder">
                                                {eventCount <= 9 ? `0${eventCount}` : eventCount}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-4 text-center">
                                        <MdEventAvailable className="icon-style bg-gradient-warning shadow-warning rounded-circle" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-7">
                        <div className="card-chart">
                            <div className="card-header">
                                <h6 className="text-capitalize">Blood Inventory Analysis</h6>
                            </div>
                            <div className="card-body">
                                <div className="chart">
                                    <canvas ref={chartRef} className="chart-canvas" height="300"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card-map">
                            <div className="card-header">
                                <h6 className="text-capitalize">Event Locations</h6>
                            </div>
                            <div className="card-body">
                                <div ref={mapRef} style={{ width: '100%', height: '365px', borderRadius: '15px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
