import React, { useEffect, useState } from 'react';
import './donorProfile.css';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../Image/Logo.png';
import { CgCloseO } from 'react-icons/cg';
import img from '../Image/Profile.jpg';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProfileDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); // Changed from 'authToken' to 'token'

        if (!token) {
          toast.error('User is not authenticated. Please log in.');
          navigate('/login');
          return;
        }

        // Validate token
        try {
          const decoded = jwtDecode(token);
          if (!decoded.id || decoded.role.toLowerCase() !== 'admin') {
            toast.error('Unauthorized access. Admin role required.');
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          toast.error('Invalid token. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/users/get-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.user) {
          setUser(response.data.user);
        } else {
          toast.error('User not found.');
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        if (error.response?.status === 401) {
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else if (error.response?.status === 404) {
          toast.error('User not found.');
          setUser(null);
        } else {
          toast.error('Failed to fetch user details. Please try again later.');
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleClose = () => {
    navigate('/adminprofile'); // Updated to lowercase to match route
  };

  const sendEmail = async () => {
    if (!user?.email) {
      toast.error('No email address available for this user.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User is not authenticated. Please log in.');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/users/sendEmail',
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Email sent successfully.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email. Please try again later.');
    }
  };

  if (loading) {
    return <p className="loading-message">Loading user details...</p>;
  }

  if (!user) {
    return <p className="error-message">User details not found.</p>;
  }

  return (
    <div>
      <ToastContainer />
      <div className="donor-profile-header">
        <img src={logo} alt="Logo" className="donor-profile-logo" />
        <button onClick={handleClose} className="profileClose-button">
          <CgCloseO />
        </button>
      </div>

      <div className="donor-profile-container">
        <div className="donor-profile-card">
          <div className="donor-profile-left">
            <img
              src={user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : img}
              alt={user.fname && user.lname ? `${user.fname} ${user.lname}` : 'User'}
              className="donor-profile-image"
            />
            <h2 className="donorName">
              {user.fname && user.lname ? `${user.fname} ${user.lname}` : user.name || 'Not Provided'}
            </h2>
            <p className="donor-blood-group">
              Blood Group: <span className="donor-blood-type">{user.bloodgroup || 'Not Available'}</span>
            </p>
            <p className="donor-email">Email: {user.email || 'Not Available'}</p>
            <p className="donor-mobile">Mobile: {user.tnumber || 'Not Available'}</p>
            <button className="adminProfile-button" onClick={sendEmail}>
              Send Email
            </button>
          </div>
          <div className="donor-profile-right">
            <h3 className="donor-details-heading">Donor Details</h3>
            <table className="donor-details-table">
              <tbody>
                <tr>
                  <td className="details-label">Donor Name</td>
                  <td className="details-value">
                    {user.fname && user.lname ? `${user.fname} ${user.lname}` : user.name || 'Not Available'}
                  </td>
                </tr>
                <tr>
                  <td className="details-label">NIC Number</td>
                  <td className="details-value">{user.nic || 'Not Available'}</td>
                </tr>
                <tr>
                  <td className="details-label">Province</td>
                  <td className="details-value">{user.province || 'Not Available'}</td>
                </tr>
                <tr>
                  <td className="details-label">District</td>
                  <td className="details-value">{user.district || 'Not Available'}</td>
                </tr>
                <tr>
                  <td className="details-label">City</td>
                  <td className="details-value">{user.city || 'Not Available'}</td>
                </tr>
                <tr>
                  <td className="details-label">Postal Code</td>
                  <td className="details-value">{user.pcode || 'Not Available'}</td>
                </tr>
                <tr>
                  <td className="details-label">Address</td>
                  <td className="details-value">{user.address || 'Not Available'}</td>
                </tr>
                <tr>
                  <td className="details-label">Gender</td>
                  <td className="details-value">{user.gender || 'Not Available'}</td>
                </tr>
                <tr>
                  <td className="details-label">Civil Status</td>
                  <td className="details-value">{user.occupation || 'Not Available'}</td>
                </tr>
                <tr>
                  <td className="details-label">Date of Birth</td>
                  <td className="details-value">
                    {user.dob ? new Date(user.dob).toLocaleDateString() : 'Not Available'}
                  </td>
                </tr>
                <tr>
                  <td className="details-label">Weight</td>
                  <td className="details-value">{user.weight ? `${user.weight} Kg` : 'Not Available'}</td>
                </tr>
                <tr>
                  <td className="details-label">Last Donation Date</td>
                  <td className="details-value">
                    {user.lastDonationDate && !isNaN(new Date(user.lastDonationDate).getTime())
                      ? new Date(user.lastDonationDate).toLocaleDateString()
                      : 'Not Donated'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;