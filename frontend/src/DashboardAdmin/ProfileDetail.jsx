import React, { useEffect, useState } from 'react';
import "./donorProfile.css";
import { useParams, useNavigate } from 'react-router-dom';
import logo from "../Image/Logo.png";
import { CgCloseO } from "react-icons/cg";
import img from "../Image/Profile.jpg";
import { toast } from 'react-toastify';

const ProfileDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          toast.error('User is not authenticated.');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/users/get-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleClose = () => {
    navigate('/adminProfile');
  };

  
  

  if (!user) {
    return <p className="error-message">User details not found.</p>;
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
            <img
              src={user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : img}
              alt={user.fname && user.lname ? `${user.fname} ${user.lname}` : "User"}
              className="donor-profile-image"
            />
            <h2 className="donorName">
              {user.fname && user.lname ? `${user.fname} ${user.lname}` : `${user.name}`}
            </h2>
            <p className="donor-blood-group">
              Blood Group : <span className="donor-blood-type">{user.bloodgroup || "Not User Complete"}</span>
            </p>
            <p className="donor-email">Email : {user.email || "Not User Complete"}</p>
            <p className="donor-mobile">Mobile : {user.tnumber || "Not User Complete"}</p>
          </div>
          <div className="donor-profile-right">
            <h3 className="donor-details-heading">Donor Details</h3>
            <table className="donor-details-table">
              <tbody>
                <tr>
                  <td className="details-label">Donor Name</td>
                  <td className="details-value">
                    {user.fname && user.lname ? `${user.fname} ${user.lname}` : "Not User Complete"}
                  </td>
                </tr>
                <tr>
                  <td className="details-label">NIC Number</td>
                  <td className="details-value">{user.nic || "Not User Complete"}</td>
                </tr>
                <tr>
                  <td className="details-label">Province</td>
                  <td className="details-value">{user.province || "Not User Complete"}</td>
                </tr>
                <tr>
                  <td className="details-label">District</td>
                  <td className="details-value">{user.district || "Not User Complete"}</td>
                </tr>
                <tr>
                  <td className="details-label">City</td>
                  <td className="details-value">{user.city || "Not User Complete"}</td>
                </tr>
                <tr>
                  <td className="details-label">Postal Code</td>
                  <td className="details-value">{user.pcode || "Not User Complete"}</td>
                </tr>
                <tr>
                  <td className="details-label">Address</td>
                  <td className="details-value">{user.address || "Not User Complete"}</td>
                </tr>
                <tr>
                  <td className="details-label">Gender</td>
                  <td className="details-value">{user.gender || "Not User Complete"}</td>
                </tr>
                <tr>
                  <td className="details-label">Civil Status</td>
                  <td className="details-value">{user.civilStatus || "Not User Complete"}</td>
                </tr>
                <tr>
                  <td className="details-label">Date of Birth</td>
                  <td className="details-value">
                    {user.dob ? new Date(user.dob).toISOString().split('T')[0] : "Not User Complete"}
                  </td>
                </tr>
                <tr>
                  <td className="details-label">Weight</td>
                  <td className="details-value">{user.weight ? `${user.weight} Kg` : "Not User Complete"}</td>
                </tr>
                <tr>
                  <td className="details-label">Last Donate Date</td>
                  <td className="details-value">
                    {user.lastDonationDate && !isNaN(new Date(user.lastDonationDate).getTime())
                      ? new Date(user.lastDonationDate).toISOString().split('T')[0]
                      : "Not User Donate"}
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
