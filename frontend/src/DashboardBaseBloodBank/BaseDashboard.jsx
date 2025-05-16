import React, { useEffect, useState, useRef } from 'react';
import BaseNav from '../Component/BaseNav';
import BaseMainNav from '../Component/BaseMainNav';
import './baseDashboard.css';
import { Chart } from 'chart.js/auto';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';

const BaseDashboard = () => {
  const chartRef = useRef(null);
  const [bloodData, setBloodData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <div className='MainBase'>
      <BaseNav />
      <BaseMainNav />
      <div className='adminProfile-card'>
        <div className='adminProfile-main'>
          <div className='card-body'>
            <div className='chart'>
              <canvas ref={chartRef} className='blood-canvas' height='500px'></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseDashboard;