import React, { useRef, useEffect, useState } from 'react';
import './adminAnalaytic.css';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import Chart from 'chart.js/auto';

const AdminAnalaytic = () => {

    const chartRefAPlus = useRef(null);
    const [donateDataAPlus, setDonateDataAPlus] = useState([]);
    const [requestDataAPlus, setRequestDataAPlus] = useState([]);
    const chartInstanceRefAPlus = useRef(null);

    const chartRefAMinus = useRef(null);
    const [donateDataAMinus, setDonateDataAMinus] = useState([]);
    const [requestDataAMinus, setRequestDataAMinus] = useState([]);
    const chartInstanceRefAMinus = useRef(null);

    const chartRefOPlus = useRef(null); 
    const [donateDataOPlus, setDonateDataOPlus] = useState([]);
    const [requestDataOPlus, setRequestDataOPlus] = useState([]);
    const chartInstanceRefOPlus = useRef(null);

    const chartRefOMinus = useRef(null);
    const [donateDataOMinus, setDonateDataOMinus] = useState([]);
    const [requestDataOMinus, setRequestDataOMinus] = useState([]);
    const chartInstanceRefOMinus = useRef(null);

    const chartRefABPlus = useRef(null);
    const [donateDataABPlus, setDonateDataABPlus] = useState([]);
    const [requestDataABPlus, setRequestDataABPlus] = useState([]);
    const chartInstanceRefABPlus = useRef(null);

    const chartRefABMinus = useRef(null);
    const [donateDataABMinus, setDonateDataABMinus] = useState([]);
    const [requestDataABMinus, setRequestDataABMinus] = useState([]);
    const chartInstanceRefABMinus = useRef(null);

    const chartRefBPlus = useRef(null);
    const [donateDataBPlus, setDonateDataBPlus] = useState([]);
    const [requestDataBPlus, setRequestDataBPlus] = useState([]);
    const chartInstanceRefBPlus = useRef(null);

    const chartRefBMinus = useRef(null);
    const [donateDataBMinus, setDonateDataBMinus] = useState([]);
    const [requestDataBMinus, setRequestDataBMinus] = useState([]);
    const chartInstanceRefBMinus = useRef(null);

    const fetchBloodEntries = async (bloodType, setDonateData, setRequestData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/blood/${bloodType}/last-week`);
            const data = await response.json();

            const donations = data.filter(entry => entry.status === 'donate');
            const requests = data.filter(entry => entry.status === 'request');
            
            setDonateData(donations);
            setRequestData(requests);
        } catch (error) {
            console.error(`Error fetching ${bloodType} blood entries:`, error);
        }
    };

    useEffect(() => {
        fetchBloodEntries('a-positive', setDonateDataAPlus, setRequestDataAPlus);
        fetchBloodEntries('a-negative', setDonateDataAMinus, setRequestDataAMinus);
        fetchBloodEntries('o-positive', setDonateDataOPlus, setRequestDataOPlus);
        fetchBloodEntries('o-negative', setDonateDataOMinus, setRequestDataOMinus);
        fetchBloodEntries('ab-positive', setDonateDataABPlus, setRequestDataABPlus);
        fetchBloodEntries('ab-negative', setDonateDataABMinus, setRequestDataABMinus);
        fetchBloodEntries('b-positive', setDonateDataBPlus, setRequestDataBPlus);
        fetchBloodEntries('b-negative', setDonateDataBMinus, setRequestDataBMinus);
    }, []);

    const initializeChart = (chartRef, donateData, requestData, chartInstanceRef, label) => {
        const ctx = chartRef.current.getContext('2d');
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${month}/${day}`;
        });

        const donateQuantities = last7Days.map(date => {
            const entry = donateData.find(d => {
                const entryDate = new Date(d.date).toISOString().split('T')[0];
                const formattedEntryDate = `${String(new Date(entryDate).getMonth() + 1).padStart(2, '0')}/${String(new Date(entryDate).getDate()).padStart(2, '0')}`;
                return formattedEntryDate === date;
            });
            return entry ? entry.quantity : 0;
        });

        const requestQuantities = last7Days.map(date => {
            const entry = requestData.find(r => {
                const entryDate = new Date(r.date).toISOString().split('T')[0];
                const formattedEntryDate = `${String(new Date(entryDate).getMonth() + 1).padStart(2, '0')}/${String(new Date(entryDate).getDate()).padStart(2, '0')}`;
                return formattedEntryDate === date;
            });
            return entry ? entry.quantity : 0;
        });

        chartInstanceRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [
                    {
                        label: "Donate",
                        data: donateQuantities,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                    },
                    {
                        label: "Request",
                        data: requestQuantities,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { ticks: { color: 'white' } },
                    y: { ticks: { color: 'white' } },
                },
                plugins: { legend: { labels: { color: 'white' } } }
            },
        });
    };

    useEffect(() => {
        if (donateDataAPlus.length > 0 || requestDataAPlus.length > 0) {
            initializeChart(chartRefAPlus, donateDataAPlus, requestDataAPlus, chartInstanceRefAPlus, 'A+');
        }
        if (donateDataAMinus.length > 0 || requestDataAMinus.length > 0) {
            initializeChart(chartRefAMinus, donateDataAMinus, requestDataAMinus, chartInstanceRefAMinus, 'A-');
        }
        if (donateDataOPlus.length > 0 || requestDataOPlus.length > 0) {
            initializeChart(chartRefOPlus, donateDataOPlus, requestDataOPlus, chartInstanceRefOPlus, 'O+');
        }
        if (donateDataOMinus.length > 0 || requestDataOMinus.length > 0) {
            initializeChart(chartRefOMinus, donateDataOMinus, requestDataOMinus, chartInstanceRefOMinus, 'O-');
        }
        if (donateDataABPlus.length > 0 || requestDataABPlus.length > 0) {
            initializeChart(chartRefABPlus, donateDataABPlus, requestDataABPlus, chartInstanceRefABPlus, 'AB+');
        }
        if (donateDataABMinus.length > 0 || requestDataABMinus.length > 0) {
            initializeChart(chartRefABMinus, donateDataABMinus, requestDataABMinus, chartInstanceRefABMinus, 'AB-');
        }
        if (donateDataBPlus.length > 0 || requestDataBPlus.length > 0) {
            initializeChart(chartRefBPlus, donateDataBPlus, requestDataBPlus, chartInstanceRefBPlus, 'B+');
        }
        if (donateDataBMinus.length > 0 || requestDataBMinus.length > 0) {
            initializeChart(chartRefBMinus, donateDataBMinus, requestDataBMinus, chartInstanceRefBMinus, 'B-');
        }

        return () => {
            if (chartInstanceRefAPlus.current) {
                chartInstanceRefAPlus.current.destroy();
            }
            if (chartInstanceRefAMinus.current) {
                chartInstanceRefAMinus.current.destroy();
            }
            if (chartInstanceRefOPlus.current) {
                chartInstanceRefOPlus.current.destroy();
            }
            if (chartInstanceRefOMinus.current) {
                chartInstanceRefOMinus.current.destroy();
            }
            if (chartInstanceRefABPlus.current) {
                chartInstanceRefABPlus.current.destroy();
            }
            if (chartInstanceRefABMinus.current) {
                chartInstanceRefABMinus.current.destroy();
            }
            if (chartInstanceRefBPlus.current) {
                chartInstanceRefBPlus.current.destroy();
            }
            if (chartInstanceRefBMinus.current) {
                chartInstanceRefBMinus.current.destroy();
            }
        };
    }, [donateDataAPlus, requestDataAPlus, donateDataAMinus, requestDataAMinus, donateDataOPlus, requestDataOPlus, donateDataOMinus, requestDataOMinus,
        donateDataABPlus, requestDataABPlus, donateDataABMinus, requestDataABMinus, donateDataBPlus, requestDataBPlus, donateDataBMinus, requestDataBMinus]);

    return (
        <div className='mainAdmin'>
            <AdminNav />
            <AdminMainNav />

            <div className="analytic-card">
                <div className="analytic-main">
                    <div className='analytic-col'>
                        <div className="analytic-chartmain">
                            <div className="analytic-chart">
                                <div className="card-header">
                                    <h6 className="text-capitalize">Blood Type [ A+ ] Analysis</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart">
                                        <canvas ref={chartRefAPlus} className="analytic-canvas" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="analytic-chartmain">
                            <div className="analytic-chart">
                                <div className="card-header">
                                    <h6 className="text-capitalize">Blood Type [ A- ] Analysis</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart">
                                        <canvas ref={chartRefAMinus} className="analytic-canvas" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="analytic-chartmain">
                            <div className="analytic-chart">
                                <div className="card-header">
                                    <h6 className="text-capitalize">Blood Type [ O+ ] Analysis</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart">
                                        <canvas ref={chartRefOPlus} className="analytic-canvas" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="analytic-chartmain">
                            <div className="analytic-chart">
                                <div className="card-header">
                                    <h6 className="text-capitalize">Blood Type [ O- ] Analysis</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart">
                                        <canvas ref={chartRefOMinus} className="analytic-canvas" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="analytic-chartmain">
                            <div className="analytic-chart">
                                <div className="card-header">
                                    <h6 className="text-capitalize">Blood Type [ AB+ ] Analysis</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart">
                                        <canvas ref={chartRefABPlus} className="analytic-canvas" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="analytic-chartmain">
                            <div className="analytic-chart">
                                <div className="card-header">
                                    <h6 className="text-capitalize">Blood Type [ AB- ] Analysis</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart">
                                        <canvas ref={chartRefABMinus} className="analytic-canvas" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="analytic-chartmain">
                            <div className="analytic-chart">
                                <div className="card-header">
                                    <h6 className="text-capitalize">Blood Type [ B+ ] Analysis</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart">
                                        <canvas ref={chartRefBPlus} className="analytic-canvas" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="analytic-chartmain">
                            <div className="analytic-chart">
                                <div className="card-header">
                                    <h6 className="text-capitalize">Blood Type [ B- ] Analysis</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart">
                                        <canvas ref={chartRefBMinus} className="analytic-canvas" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalaytic;
