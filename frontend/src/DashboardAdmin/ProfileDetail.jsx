import React, { useEffect, useState } from 'react';
import "./donorProfile.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from "../Image/Logo.png";
import { CgCloseO } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const ProfileDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          toast.error('User is not authenticated.');
          return;
        }
  
        const response = await axios.get(`http://localhost:5000/api/users/get-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null); 
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchUser();
  }, [id]);
  
  

  const handleClose = () => {
    navigate('/adminProfile');
  };

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      <div className="donor-profile-header">
        <img src={logo} alt="Logo" className="donor-profile-logo" />
        <button onClick={handleClose} className="profileClose-button">
          <CgCloseO />
        </button>
      </div>
      <div className="donor-profile-container">
        <div className="donor-profile-card">
          <div className="donor-profile-left">
            {user.profilePicture && (
              <img
                src={`http://localhost:5000/${user.profilePicture}`}
                alt={`${user.name}`}
                className="donor-profile-image"
              />
            )}
            <h2 className="donorName">{user.fname} {user.lname}</h2>
            <p className="donor-blood-group">Blood Group : <span className="donor-blood-type">{user.bloodgroup}</span></p>
            <p className="donor-email">Email : {user.email}</p>
            <p className="donor-mobile">Mobile : {user.tnumber}</p>
          </div>

          <div className="donor-profile-right">
            <h3 className="donor-details-heading">Donor Details</h3>
            <table className="donor-details-table">
              <tbody>
                <tr>
                  <td className="details-label">Donor Name</td>
                  <td className="details-value">{user.fname} {user.lname}</td>
                </tr>
                <tr>
                  <td className="details-label">NIC Number</td>
                  <td className="details-value">{user.nic}</td>
                </tr>
                <tr>
                  <td className="details-label">Province</td>
                  <td className="details-value">{user.province}</td>
                </tr>
                <tr>
                  <td className="details-label">District</td>
                  <td className="details-value">{user.district}</td>
                </tr>
                <tr>
                  <td className="details-label">City</td>
                  <td className="details-value">{user.city}</td>
                </tr>
                <tr>
                  <td className="details-label">Postal Code</td>
                  <td className="details-value">{user.pcode}</td>
                </tr>
                <tr>
                  <td className="details-label">Address</td>
                  <td className="details-value">{user.address}</td>
                </tr>
                <tr>
                  <td className="details-label">Gender</td>
                  <td className="details-value">{user.gender}</td>
                </tr>
                <tr>
                  <td className="details-label">Civil Status</td>
                  <td className="details-value">{user.occupation}</td>
                </tr>
                <tr>
                  <td className="details-label">Date of Birth</td>
                  <td className="details-value">{new Date(user.dob).toISOString().split('T')[0]}</td>
                </tr>
                <tr>
                  <td className="details-label">Weight</td>
                  <td className="details-value">{user.weight} Kg</td>
                </tr>
                <tr>
                  <td className="details-label">Last Donate Date</td>
                  <td className="details-value">
                    {user.lastDonationDate && !isNaN(new Date(user.lastDonationDate).getTime())
                      ? new Date(user.lastDonationDate).toISOString().split('T')[0]
                      : "Not Yet Donate"}
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
