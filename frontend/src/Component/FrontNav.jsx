import React from 'react';
import img from '../Image/Logo.png';
import Button from 'react-bootstrap/Button';
import "./frontNav.css";
import { Link } from 'react-router-dom';

const FrontNav = () => {
    return (
        <div className='nav'>
            <div className="logo">
                <img src={img} alt="Logo" />
            </div>
            <div className="nav-right">
                <Link to="/login">
                    <Button className='btn' variant="outline-danger">Login</Button>
                </Link>
                <Link to="/signup">
                    <Button className='btn' variant="outline-danger">Signup</Button>
                </Link>
            </div>
        </div>
    );
}

export default FrontNav;
