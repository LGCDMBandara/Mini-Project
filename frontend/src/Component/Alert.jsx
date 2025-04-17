import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './Alert.css'; // Import custom CSS

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="custom-modal" // Apply custom modal class
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Incomplete Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Your profile is only {props.completionPercentage}% complete</h4>
                <p>
                    Please update your information to improve your experience and unlock all features of the platform.
                    A complete profile helps us serve you better!
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => {
                        props.onHide();
                        window.location.href = '/userProfile';
                    }}
                >
                    Go to Profile
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const Alert = () => {
    const [modalShow, setModalShow] = useState(false);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken');

                if (!token) {
                    console.warn('No token found in localStorage. Redirecting to login.');
                    window.location.href = '/login';
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/users/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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
                console.error('Error fetching user data:', error);
                console.log('Error response:', error.response?.data); 
                if (error.response?.status === 401) {
                    console.warn('Unauthorized. Redirecting to login.');
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            completionPercentage={completionPercentage}
        />
    );
};

export default Alert;