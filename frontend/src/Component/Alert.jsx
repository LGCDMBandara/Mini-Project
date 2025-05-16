import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './Alert.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function MyVerticallyCenteredModal(props) {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'si');
  const navigate = useNavigate();

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{t('profile')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          {t('ptitle')} {props.completionPercentage}%
        </h4>
        <p>{t('pdes')}</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="alert-toggle">
          <select value={currentLang} onChange={handleLanguageChange}>
            <option value="en">ENG</option>
            <option value="si">සිංහල</option>
          </select>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            props.onHide();
            navigate('/userprofile');
          }}
        >
          {t('pbtn')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Alert = () => {
  const [modalShow, setModalShow] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('Alert: No token found in localStorage');
          setError('Please log in to view your profile');
          return;
        }

        console.log('Alert: Fetching user data with token:', token);
        const response = await axios.get('http://localhost:5000/api/users/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Alert: User data response:', response.data);
        const user = response.data.user;

        const requiredFields = [
          'name',
          'email',
          'password',
          'fname',
          'lname',
          'tnumber',
          'nic',
          'province',
          'district',
          'city',
          'pcode',
          'address',
          'gender',
          'occupation',
          'dob',
          'weight',
          'bloodgroup',
          'donate',
        ];

        let filledFields = 0;
        requiredFields.forEach((field) => {
          if (user[field] && user[field] !== '' && user[field] !== null) {
            filledFields += 1;
          }
        });

        const totalFields = requiredFields.length;
        const percentage = Math.round((filledFields / totalFields) * 100);
        setCompletionPercentage(percentage);

        if (percentage < 100) {
          setModalShow(true);
        }
      } catch (error) {
        console.error('Alert: Error fetching user data:', error);
        console.log('Alert: Error response:', error.response?.data);
        setError('Failed to fetch user data. Please try again.');
        if (error.response?.status === 401) {
          console.warn('Alert: Unauthorized. Clearing token.');
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  if (error) {
    return <div className="alert-error">{error}</div>;
  }

  return (
    <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      completionPercentage={completionPercentage}
    />
  );
};

export default Alert;